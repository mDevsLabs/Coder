import type { Hono } from "npm:hono@4";
import { extractToken, getDb, getWeekData, TIER_LIMITS, verifyToken } from "./config.ts";

// Helper : enregistre les tokens totaux après chaque requête (Q7)
async function recordTotalTokens(userId: string, weekStartStr: string, total: number) {
  if (!userId || total <= 0) return;
  try {
    const sql = getDb();
    await sql`
      INSERT INTO weekly_usage (user_id, week_start, tokens_used)
      VALUES (${userId}::text, ${weekStartStr}, ${total})
      ON CONFLICT (user_id, week_start)
      DO UPDATE SET tokens_used = weekly_usage.tokens_used + ${total}
    `;
  } catch (_) {}
}

// Helper : proxy vers OpenRouter en capturant l'usage pour le comptage (stream + non-stream)
async function proxyOpenRouterWithUsage(
  openRouterRes: Response,
  userId: string,
  weekStartStr: string
): Promise<Response> {
  const contentType = openRouterRes.headers.get("Content-Type") || "application/json";
  const isStream = contentType.includes("text/event-stream");

  if (!isStream) {
    // Non-stream : lire le JSON corps pour extraire usage
    const clone = openRouterRes.clone();
    let usageTotal = 0;
    try {
      const json: any = await clone.json();
      const u = json.usage || json.usage_metadata || {};
      const prompt = u.prompt_tokens ?? u.promptTokens ?? u.input_tokens ?? 0;
      const completion = u.completion_tokens ?? u.completionTokens ?? u.output_tokens ?? 0;
      const total = (typeof json.usage?.total_tokens === "number") ? json.usage.total_tokens : (Number(prompt) + Number(completion));
      if (total > 0) usageTotal = total;
      // Certains providers renvoient usage directement
      if (!usageTotal && typeof u.totalTokens === "number") usageTotal = u.totalTokens;
    } catch (_) {}
    if (usageTotal > 0 && userId) {
      // fire-and-forget
      void recordTotalTokens(userId, weekStartStr, usageTotal);
    }
    return new Response(openRouterRes.body, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": contentType,
      },
      status: openRouterRes.status,
    });
  }

  // Stream : tee + parser SSE pour capter le dernier chunk usage
  const body = openRouterRes.body;
  if (!body) {
    return new Response(null, {
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": contentType },
      status: openRouterRes.status,
    });
  }
  let captInput = 0;
  let captOutput = 0;
  let captTotal = 0;
  const decoder = new TextDecoder();
  let buffer = "";
  const stream = new ReadableStream({
    async start(controller) {
      const reader = body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          // Parser léger pour usage sans bloquer
          try {
            const chunkText = decoder.decode(value, { stream: true });
            buffer += chunkText;
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (!data || data === "[DONE]") continue;
              try {
                const j: any = JSON.parse(data);
                if (j.usage) {
                  const u = j.usage;
                  const p = u.prompt_tokens ?? u.promptTokens ?? u.input_tokens ?? 0;
                  const c = u.completion_tokens ?? u.completionTokens ?? u.output_tokens ?? 0;
                  const t = u.total_tokens ?? (Number(p) + Number(c));
                  if (Number(p) > 0) captInput = Number(p);
                  if (Number(c) > 0) captOutput = Number(c);
                  if (Number(t) > 0) captTotal = Number(t);
                }
              } catch (_) {}
            }
          } catch (_) {}
          controller.enqueue(value);
        }
        // flush buffer restant
        if (buffer.trim().startsWith("data:")) {
          try {
            const data = buffer.trim().slice(5).trim();
            if (data && data !== "[DONE]") {
              const j: any = JSON.parse(data);
              if (j.usage) {
                const u = j.usage;
                const p = u.prompt_tokens ?? 0;
                const c = u.completion_tokens ?? 0;
                const t = u.total_tokens ?? (Number(p) + Number(c));
                if (Number(p) > 0) captInput = Number(p);
                if (Number(c) > 0) captOutput = Number(c);
                if (Number(t) > 0) captTotal = Number(t);
              }
            }
          } catch (_) {}
        }
      } finally {
        controller.close();
        const total = captTotal > 0 ? captTotal : (captInput + captOutput);
        if (total > 0 && userId) void recordTotalTokens(userId, weekStartStr, total);
      }
    },
    cancel() {
      // best effort: try to cancel upstream
      try { (body as any).cancel?.(); } catch (_) {}
    },
  });

  return new Response(stream, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
    status: openRouterRes.status,
  });
}

export function registerModelRoutes(app: Hono) {
  // GET /usage
  app.get("/usage", async (c) => {
    try {
      const token = extractToken(c.req.raw);
      if (!token) {
        return c.json({ error: "Non authentifié." }, 401);
      }

      const payload = await verifyToken(token);
      const userId = payload.sub as string;
      const { weekStartStr, nextResetIso } = getWeekData();

      const sql = getDb();
      const [usageResult, userResult] = await Promise.all([
        sql`SELECT tokens_used FROM weekly_usage WHERE user_id = ${userId} AND week_start = ${weekStartStr}`,
        sql`SELECT tier, email, username, phone, avatar_url FROM users WHERE id = ${userId} LIMIT 1`,
      ]);

      const user = userResult[0];
      const tokensUsed = usageResult[0]?.tokens_used || 0;
      const limit = TIER_LIMITS[user?.tier] || TIER_LIMITS["Free"];

      return c.json({
        avatarUrl: user?.avatar_url,
        email: user?.email,
        limit,
        phone: user?.phone,
        resetAt: nextResetIso,
        tier: user?.tier || "Free",
        tokensUsed,
        username: user?.username,
        weekStart: weekStartStr,
      });
    } catch {
      return c.json({ error: "Erreur serveur." }, 500);
    }
  });

  // POST /log-usage
  app.post("/log-usage", async (c) => {
    try {
      const token = extractToken(c.req.raw);
      if (!token) {
        return c.json({ error: "Non authentifié." }, 401);
      }

      const payload = await verifyToken(token);
      const userId = payload.sub as string;

      const { tokensUsed = 0 } = await c.req.json();
      const { weekStartStr } = getWeekData();

      const sql = getDb();
      const userRes =
        await sql`SELECT tier FROM users WHERE id = ${userId} LIMIT 1`;
      const tier = userRes.length > 0 ? userRes[0].tier : "Free";
      const limit = TIER_LIMITS[tier] || TIER_LIMITS["Free"];

      const usageResult = await sql`
        SELECT tokens_used FROM weekly_usage
        WHERE user_id = ${userId} AND week_start = ${weekStartStr}
        LIMIT 1
      `;
      const currentUsage = usageResult[0]?.tokens_used || 0;

      if (currentUsage + tokensUsed > limit) {
        return c.json(
          { error: "Limite atteinte.", limit, used: currentUsage },
          429
        );
      }

      await sql`
        INSERT INTO weekly_usage (user_id, week_start, tokens_used)
        VALUES (${userId}, ${weekStartStr}, ${tokensUsed})
        ON CONFLICT (user_id, week_start)
        DO UPDATE SET tokens_used = weekly_usage.tokens_used + ${tokensUsed}
      `;

      return c.json({
        limit,
        success: true,
        weeklyUsed: currentUsage + tokensUsed,
      });
    } catch {
      return c.json({ error: "Erreur serveur." }, 500);
    }
  });

  // PROXY : CHAT COMPLETIONS (CLI) — corrigé : clé aléatoire + comptage réel
  app.post("/chat/completions", async (c) => {
    try {
      const token = extractToken(c.req.raw);
      if (!token) {
        return c.json({ error: "Non authentifié." }, 401);
      }

      const payload = await verifyToken(token);
      const userId = payload.sub as string;

      // Vérification des limites avant d'autoriser la requête (Q7)
      const sql = getDb();
      const userRes =
        await sql`SELECT tier FROM users WHERE id = ${userId} LIMIT 1`;
      const tier = userRes.length > 0 ? userRes[0].tier : "Free";
      const limit = TIER_LIMITS[tier] || TIER_LIMITS["Free"];

      const { weekStartStr } = getWeekData();
      const usageResult = await sql`
        SELECT tokens_used FROM weekly_usage
        WHERE user_id = ${userId} AND week_start = ${weekStartStr}
        LIMIT 1
      `;
      const currentUsage = usageResult[0]?.tokens_used || 0;

      if (currentUsage >= limit) {
        return c.json({ error: "Votre limite hebdomadaire est épuisée." }, 429);
      }

      // Le corps de la requête du CLI
      const body = await c.req.json();

      // Q1/Q2 : clé au hasard, même que pour /v1/models jusqu'à déconnexion
      const keyRows = await sql`
        SELECT api_key FROM mprojects_api_keys WHERE user_id = ${userId}::text ORDER BY RANDOM() LIMIT 1
      `;
      const apiKey = keyRows.length > 0 ? keyRows[0].api_key : Deno.env.get("OPENROUTER_API_KEY");

      if (!apiKey) {
        return c.json({ error: "Clé fournisseur manquante." }, 500);
      }

      // Redirection de la requête vers OpenRouter (sans +1 fictif)
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://mai.val.run",
            "X-Title": "mAI CLI",
          },
          method: "POST",
        }
      );

      if (!response.ok) {
        return new Response(response.body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": response.headers.get("Content-Type") || "application/json",
          },
          status: response.status,
        });
      }
      return await proxyOpenRouterWithUsage(response, userId, weekStartStr);
    } catch {
      return c.json({ error: "Erreur serveur proxy." }, 500);
    }
  });

  // GET /v1/models — utilise la clé aléatoire tirée pour l'utilisateur (Q1/Q2)
  app.get("/v1/models", async (c) => {
    const userPlan = c.get("userPlan");
    const apiKey = (c.get("matchedApiKey") as string | null) || c.get("apiKey");
    const planStr = String(userPlan || "Free").toLowerCase().trim();
    const isPaidPlan = ["plus", "pro", "max"].includes(planStr);
    const shouldFilterFreeOnly = !isPaidPlan || !apiKey;

    try {
      const headers: Record<string, string> = {};
      if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
      const res = await fetch("https://openrouter.ai/api/v1/models", {
        headers: Object.keys(headers).length ? headers : undefined,
      });
      if (!res.ok) {
        throw new Error("OpenRouter fetch error");
      }
      const json = await res.json();
      const rawModels: any[] = json.data || [];

      let filtered = rawModels
        .filter((m) => m && m.id && !m.id.startsWith("openrouter/"))
        .filter((m) => {
          const modality = m.architecture?.modality || "";
          const outputModalities = m.architecture?.output_modalities || [];
          return (
            outputModalities.includes("text") ||
            modality.endsWith("text") ||
            modality.includes("->text")
          );
        })
        .map((m) => ({
          created: m.created || Math.floor(Date.now() / 1000),
          description: m.description || "",
          id: m.id,
          maxContext: m.context_length || 128_000,
          maxOutput: m.top_provider?.max_completion_tokens || 4096,
          name: m.name || m.id,
          object: "model",
          owned_by: m.id.split("/")[0] || "openrouter",
          supported_parameters: m.supported_parameters || [
            "temperature",
            "top_p",
            "max_tokens",
            "stream",
            "stop",
            "tools",
            "response_format"
          ],
        }));

      if (shouldFilterFreeOnly) {
        filtered = filtered.filter((m) => m.id.toLowerCase().includes("free"));
      }

      return c.json({ data: filtered, object: "list" });
    } catch (_err) {
      let fallback = [
        {
          created: 0,
          description: "Modèle multimodal ultra-rapide de Google conçu pour des tâches à haut débit et de raisonnement avec un très grand contexte.",
          id: "google/gemini-2.5-flash:free",
          maxContext: 1_048_576,
          maxOutput: 65_535,
          name: "Google: Gemini 2.5 Flash",
          object: "model",
          owned_by: "google",
          supported_parameters: ["temperature", "top_p", "top_k", "max_tokens", "tools", "response_format", "seed"],
        },
        {
          created: 0,
          description: "Modèle phare de Meta Llama 3.3 70B offrant des compétences avancées de programmation, logique et résolution de problèmes complexes.",
          id: "meta-llama/llama-3.3-70b-instruct:free",
          maxContext: 131_072,
          maxOutput: 128_000,
          name: "Meta: Llama 3.3 70B Instruct",
          object: "model",
          owned_by: "meta-llama",
          supported_parameters: ["temperature", "top_p", "max_tokens", "tools", "response_format", "frequency_penalty"],
        },
        {
          created: 0,
          description: "Modèle de code spécialisé de haute précision par Alibaba Cloud, optimisé pour la synthèse de code, le refactoring et le debug.",
          id: "qwen/qwen-2.5-coder-32b-instruct:free",
          maxContext: 32_768,
          maxOutput: 8192,
          name: "Qwen: Qwen 2.5 Coder 32B Instruct",
          object: "model",
          owned_by: "qwen",
          supported_parameters: ["temperature", "top_p", "max_tokens", "stop", "tools"],
        },
        {
          created: 0,
          description: "Modèle de raisonnement logique étape par étape de premier ordre par DeepSeek pour les mathématiques et la logique complexe.",
          id: "deepseek/deepseek-r1:free",
          maxContext: 163_840,
          maxOutput: 16_000,
          name: "DeepSeek: DeepSeek R1",
          object: "model",
          owned_by: "deepseek",
          supported_parameters: ["temperature", "top_p", "max_tokens", "stream"],
        },
      ];

      if (shouldFilterFreeOnly) {
        fallback = fallback.filter((m) => m.id.toLowerCase().includes("free"));
      }

      return c.json({ data: fallback, object: "list" });
    }
  });

  // GET /v1/mai/models
  app.get("/v1/mai/models", async (c) => {
    const maiModelsList = [
      {
        created: Math.floor(Date.now() / 1000),
        description: "Assistant IA local 4B ultra-rapide et multimodal. Vision intégrée, thinking & tools pour une agilité quotidienne maximale.",
        id: "mDevsLabs/mAI-1.5-Light",
        maxContext: 262_144,
        maxOutput: 32_768,
        name: "mAI-1.5-Light",
        object: "model",
        owned_by: "mDevsLabs",
        supported_parameters: ["temperature", "top_p", "max_tokens", "stream", "tools", "thinking"],
      },
      {
        created: Math.floor(Date.now() / 1000),
        description: "Le haut de gamme absolu 9B de la famille mAI. Puissance maximale, vision multimodale, raisonnement complexe et tools.",
        id: "mDevsLabs/mAI-1.5-Apex",
        maxContext: 262_144,
        maxOutput: 32_768,
        name: "mAI-1.5-Apex",
        object: "model",
        owned_by: "mDevsLabs",
        supported_parameters: ["temperature", "top_p", "max_tokens", "stream", "tools", "thinking", "response_format"],
      },
      {
        created: Math.floor(Date.now() / 1000),
        description: "Le sweet spot parfait 27B entre vélocité et haute intelligence. Multimodal avec vision, thinking et tools 100% local.",
        id: "mDevsLabs/mAI-1.5-Opal",
        maxContext: 262_144,
        maxOutput: 32_768,
        name: "mAI-1.5-Opal",
        object: "model",
        owned_by: "mDevsLabs",
        supported_parameters: ["temperature", "top_p", "max_tokens", "stream", "tools", "thinking"],
      },
    ];
    return c.json({ data: maiModelsList, object: "list" });
  });

  // GET /v1/status
  app.get("/v1/status", async (c) => {
    try {
      const res = await fetch("https://mai.instatus.com/summary.json");
      const data = await res.json();
      return c.json(data);
    } catch {
      return c.json({ error: "Failed to fetch status" }, 500);
    }
  });

  // POST /v1/chat/completions
  app.post("/v1/chat/completions", async (c) => {
    try {
      const userPlan = c.get("userPlan");
      const body = await c.req.json();
      const modelRequested = body.model;

      const planStr = String(userPlan || "Free")
        .toLowerCase()
        .trim();
      const isPaidPlan = ["plus", "pro", "max"].includes(planStr);
      const isFreePlan = !isPaidPlan;

      const modelStr = String(modelRequested || "").toLowerCase();
      const isFreeModel = modelStr.includes("free");

      if (isFreePlan && !isFreeModel) {
        return c.json(
          {
            error: {
              code: "model_access_denied",
              message: `Le modèle '${modelRequested || "inconnu"}' nécessite un forfait payant (Plus, Pro ou Max). Votre forfait actuel (${userPlan}) autorise uniquement les modèles contenant 'free'.`,
              param: "model",
              type: "permission_error",
            },
          },
          403
        );
      }

      const userId = c.get("userId");
      if (!userId) {
        return c.json({ error: "Non authentifié." }, 401);
      }

      const sql = getDb();
      const { weekStartStr } = getWeekData();
      const usageResult = await sql`
        SELECT tokens_used FROM weekly_usage
        WHERE user_id = ${userId}::text AND week_start = ${weekStartStr}
        LIMIT 1
      `;
      const currentUsage = usageResult[0]?.tokens_used || 0;
      const limit = TIER_LIMITS[String(userPlan || "Free")] || TIER_LIMITS["Free"];

      if (currentUsage >= limit) {
        return c.json({ error: "Votre limite hebdomadaire est épuisée. Quota atteint." }, 429);
      }

      // Q1/Q2 : même clé que pour /v1/models (matchedApiKey du middleware sinon RANDOM)
      const matched = c.get("matchedApiKey") as string | null;
      let apiKey: string | null = matched || null;
      if (!apiKey) {
        const keyRows = await sql`
          SELECT api_key FROM mprojects_api_keys WHERE user_id = ${userId}::text ORDER BY RANDOM() LIMIT 1
        `;
        apiKey = keyRows.length > 0 ? keyRows[0].api_key : (Deno.env.get("OPENROUTER_API_KEY") || null);
      }

      if (!apiKey) {
        return c.json({ error: "Clé fournisseur manquante." }, 500);
      }

      const openRouterRes = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://mai.val.run",
            "X-Title": "mAI Public API",
          },
          method: "POST",
        }
      );

      if (!openRouterRes.ok) {
        return new Response(openRouterRes.body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": openRouterRes.headers.get("Content-Type") || "application/json",
          },
          status: openRouterRes.status,
        });
      }
      return await proxyOpenRouterWithUsage(openRouterRes, userId, weekStartStr);
    } catch {
      return c.json({ error: "Failed to process chat completion." }, 500);
    }
  });

  // POST /v1/messages (Proxy Anthropic SDK)
  app.post("/v1/messages", async (c) => {
    try {
      const userPlan = c.get("userPlan");
      const body = await c.req.json();
      const modelRequested = body.model;

      const planStr = String(userPlan || "Free")
        .toLowerCase()
        .trim();
      const isFreePlan = planStr === "free" || planStr === "gratuit";
      const isFreeModel = Boolean(
        modelRequested && modelRequested.includes(":free")
      );

      if (isFreePlan && !isFreeModel) {
        return c.json(
          {
            error: {
              code: "model_access_denied",
              message: `Le modèle '${modelRequested || "inconnu"}' nécessite un forfait payant (Plus, Pro ou Max). Votre forfait actuel (Free) autorise uniquement les modèles gratuits dont l'ID contient ':free' tel que 'poolside/laguna-xs-2.1:free'.`,
              param: "model",
              type: "permission_error",
            },
          },
          403
        );
      }

      const userId = c.get("userId");
      if (!userId) {
        return c.json({ error: "Non authentifié." }, 401);
      }

      const sql = getDb();
      const { weekStartStr } = getWeekData();
      const usageResult = await sql`
        SELECT tokens_used FROM weekly_usage
        WHERE user_id = ${userId}::text AND week_start = ${weekStartStr}
        LIMIT 1
      `;
      const currentUsage = usageResult[0]?.tokens_used || 0;
      const limit = TIER_LIMITS[String(userPlan || "Free")] || TIER_LIMITS["Free"];

      if (currentUsage >= limit) {
        return c.json({ error: "Votre limite hebdomadaire est épuisée. Quota atteint." }, 429);
      }

      // Q1/Q2 : même clé que pour /v1/models
      const matchedAnthropic = c.get("matchedApiKey") as string | null;
      let apiKey: string | null = matchedAnthropic || null;
      if (!apiKey) {
        const keyRows = await sql`
          SELECT api_key FROM mprojects_api_keys WHERE user_id = ${userId}::text ORDER BY RANDOM() LIMIT 1
        `;
        apiKey = keyRows.length > 0 ? keyRows[0].api_key : (Deno.env.get("OPENROUTER_API_KEY") || null);
      }

      if (!apiKey) {
        return c.json({ error: "Clé fournisseur manquante." }, 500);
      }

      const openRouterRes = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://mai.val.run",
            "X-Title": "mAI Public API",
          },
          method: "POST",
        }
      );

      if (!openRouterRes.ok) {
        return new Response(openRouterRes.body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": openRouterRes.headers.get("Content-Type") || "application/json",
          },
          status: openRouterRes.status,
        });
      }
      return await proxyOpenRouterWithUsage(openRouterRes, userId, weekStartStr);
    } catch {
      return c.json({ error: "Failed to process Anthropic request." }, 500);
    }
  });

  // POST /v1beta/models/:model:generateContent (Proxy Google SDK)
  app.post("/v1beta/models/:model:generateContent", async (c) => {
    try {
      const userPlan = c.get("userPlan");
      const body = await c.req.json().catch(() => ({}));
      const modelRequested = c.req.param("model");

      const planStr = String(userPlan || "Free")
        .toLowerCase()
        .trim();
      const isFreePlan = planStr === "free" || planStr === "gratuit";
      const isFreeModel = Boolean(
        modelRequested && modelRequested.includes(":free")
      );

      if (isFreePlan && !isFreeModel) {
        return c.json(
          {
            error: {
              code: "model_access_denied",
              message: `Le modèle '${modelRequested || "inconnu"}' nécessite un forfait payant (Plus, Pro ou Max). Votre forfait actuel (Free) autorise uniquement les modèles gratuits dont l'ID contient ':free' tel que 'poolside/laguna-xs-2.1:free'.`,
              param: "model",
              type: "permission_error",
            },
          },
          403
        );
      }

      const userId = c.get("userId");
      if (!userId) {
        return c.json({ error: "Non authentifié." }, 401);
      }

      const sql = getDb();
      const { weekStartStr } = getWeekData();
      const usageResult = await sql`
        SELECT tokens_used FROM weekly_usage
        WHERE user_id = ${userId}::text AND week_start = ${weekStartStr}
        LIMIT 1
      `;
      const currentUsage = usageResult[0]?.tokens_used || 0;
      const limit = TIER_LIMITS[String(userPlan || "Free")] || TIER_LIMITS["Free"];

      if (currentUsage >= limit) {
        return c.json({ error: "Votre limite hebdomadaire est épuisée. Quota atteint." }, 429);
      }

      // Q1/Q2 : même clé que pour /v1/models
      const matchedGoogle = c.get("matchedApiKey") as string | null;
      let apiKey: string | null = matchedGoogle || null;
      if (!apiKey) {
        const keyRows = await sql`
          SELECT api_key FROM mprojects_api_keys WHERE user_id = ${userId}::text ORDER BY RANDOM() LIMIT 1
        `;
        apiKey = keyRows.length > 0 ? keyRows[0].api_key : (Deno.env.get("OPENROUTER_API_KEY") || null);
      }

      if (!apiKey) {
        return c.json({ error: "Clé fournisseur manquante." }, 500);
      }

      // Google payload is different, we send it to OpenRouter's endpoint.
      const openRouterRes = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://mai.val.run",
            "X-Title": "mAI Public API",
          },
          method: "POST",
        }
      );

      if (!openRouterRes.ok) {
        return new Response(openRouterRes.body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": openRouterRes.headers.get("Content-Type") || "application/json",
          },
          status: openRouterRes.status,
        });
      }
      return await proxyOpenRouterWithUsage(openRouterRes, userId, weekStartStr);
    } catch {
      return c.json({ error: "Failed to process Google request." }, 500);
    }
  });
}
