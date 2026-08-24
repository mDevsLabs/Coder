import { BrowserWindow } from 'electron';
import {
	getSettings,
	patchSettings,
	type MaiAccountState,
	type MaiAccountUsage,
	type MaiAccountProfile,
	type UserModelEntry,
} from './settingsStore.js';

export const MAI_API_BASE = 'https://mai.val.run';

export type MaiLoginResponse =
	| { ok: true; status: 'verification_required'; email: string }
	| { ok: false; message: string };

export type MaiVerifyResponse =
	| { ok: true; token: string; tier: string; account: MaiAccountState }
	| { ok: false; message: string };

export type MaiRegisterResponse =
	| { ok: true; status: 'verification_required'; email: string }
	| { ok: false; message: string };

export type MaiUsageResponse =
	| {
			ok: true;
			email?: string;
			username?: string;
			avatarUrl?: string;
			tier?: string;
			phone?: string;
			tokensUsed: number;
			limit: number;
			resetAt?: string;
			weekStart?: string;
	  }
	| { ok: false; message: string };

function broadcastMaiAccountUpdate(state: MaiAccountState): void {
	for (const win of BrowserWindow.getAllWindows()) {
		if (!win.isDestroyed()) {
			win.webContents.send('mai:accountUpdated', state);
		}
	}
}

/**
 * 1. Initialise la connexion mAI (envoi du code OTP à l'email)
 */
export async function maiLogin(identifier: string, password: string): Promise<MaiLoginResponse> {
	try {
		const res = await fetch(`${MAI_API_BASE}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ identifier: identifier.trim(), password }),
		});
		const json = await res.json().catch(() => ({}));
		if (!res.ok) {
			return { ok: false, message: json.error || 'Identifiants invalides.' };
		}
		return {
			ok: true,
			status: 'verification_required',
			email: json.email || identifier,
		};
	} catch (err: unknown) {
		return { ok: false, message: err instanceof Error ? err.message : 'Erreur de connexion au serveur mAI.' };
	}
}

/**
 * 2. Vérification du code OTP de connexion
 */
export async function maiVerifyLogin(email: string, code: string): Promise<MaiVerifyResponse> {
	try {
		const res = await fetch(`${MAI_API_BASE}/verify-login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email.trim(), code: code.trim() }),
		});
		const json = await res.json().catch(() => ({}));
		if (!res.ok || !json.token) {
			return { ok: false, message: json.error || 'Code invalide ou expiré.' };
		}

		const token = String(json.token);
		const account = await syncMaiAccountWithToken(token);
		return { ok: true, token, tier: json.tier || 'Free', account };
	} catch (err: unknown) {
		return { ok: false, message: err instanceof Error ? err.message : 'Erreur lors de la vérification.' };
	}
}

/**
 * 3. Inscription initiale (envoi du code OTP)
 */
export async function maiRegister(email: string, username: string, password: string): Promise<MaiRegisterResponse> {
	try {
		const res = await fetch(`${MAI_API_BASE}/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email.trim(), username: username.trim(), password }),
		});
		const json = await res.json().catch(() => ({}));
		if (!res.ok) {
			return { ok: false, message: json.error || 'Erreur lors de l\'inscription.' };
		}
		return {
			ok: true,
			status: 'verification_required',
			email: json.email || email,
		};
	} catch (err: unknown) {
		return { ok: false, message: err instanceof Error ? err.message : 'Erreur de connexion au serveur mAI.' };
	}
}

/**
 * 4. Validation du code OTP d'inscription
 */
export async function maiVerifyRegister(
	email: string,
	username: string,
	password: string,
	code: string
): Promise<MaiVerifyResponse> {
	try {
		const res = await fetch(`${MAI_API_BASE}/verify-register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email.trim(), username: username.trim(), password, code: code.trim() }),
		});
		const json = await res.json().catch(() => ({}));
		if (!res.ok || !json.token) {
			return { ok: false, message: json.error || 'Code invalide ou expiré.' };
		}

		const token = String(json.token);
		const account = await syncMaiAccountWithToken(token);
		return { ok: true, token, tier: json.tier || 'Free', account };
	} catch (err: unknown) {
		return { ok: false, message: err instanceof Error ? err.message : 'Erreur lors de la vérification.' };
	}
}

/**
 * 5. Renvoyer un code OTP
 */
export async function maiResendCode(email: string, action: 'login' | 'register'): Promise<{ ok: boolean; message?: string }> {
	try {
		const res = await fetch(`${MAI_API_BASE}/resend-code`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email.trim(), action }),
		});
		const json = await res.json().catch(() => ({}));
		if (!res.ok) {
			return { ok: false, message: json.error || 'Impossible de renvoyer le code.' };
		}
		return { ok: true };
	} catch (err: unknown) {
		return { ok: false, message: err instanceof Error ? err.message : 'Erreur réseau.' };
	}
}

/**
 * 6. Récupérer le profil et l'usage courant depuis /usage
 */
export async function maiFetchUsage(jwtToken: string): Promise<MaiUsageResponse> {
	try {
		const res = await fetch(`${MAI_API_BASE}/usage`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwtToken.trim()}`,
				'Content-Type': 'application/json',
			},
		});
		const json = await res.json().catch(() => ({}));
		const rawTokensUsed =
			json.tokensUsed ?? json.tokens_used ?? json.used ?? json.weeklyUsed ?? json.weekly_used;
		const parsedTokensUsed = typeof rawTokensUsed === 'number' ? rawTokensUsed : Number(rawTokensUsed);
		const tokensUsed = Number.isFinite(parsedTokensUsed) && parsedTokensUsed >= 0 ? parsedTokensUsed : 0;

		const rawLimit =
			json.limit ?? json.maxTokens ?? json.max_tokens ?? json.tokenLimit ?? json.token_limit;
		const parsedLimit = typeof rawLimit === 'number' ? rawLimit : Number(rawLimit);
		const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 5_000_000;

		return {
			ok: true,
			email: json.email,
			username: json.username,
			avatarUrl: json.avatarUrl || json.avatar_url,
			tier: json.tier || 'Free',
			phone: json.phone,
			tokensUsed,
			limit,
			resetAt: json.resetAt || json.reset_at,
			weekStart: json.weekStart || json.week_start,
		};
	} catch (err: unknown) {
		return { ok: false, message: err instanceof Error ? err.message : 'Erreur réseau.' };
	}
}

/**
 * 7. Récupérer les clés API liées au user_id dans mprojects_api_keys via /api-keys (Q1 : tirage au hasard)
 */
export async function maiFetchAllApiKeys(jwtToken: string): Promise<string[]> {
	try {
		const res = await fetch(`${MAI_API_BASE}/api-keys`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwtToken.trim()}`,
				'Content-Type': 'application/json',
			},
		});
		const json = await res.json().catch(() => ({}));
		if (res.ok && json.success && Array.isArray(json.keys) && json.keys.length > 0) {
			return json.keys
				.map((k: any) => (typeof k.api_key === 'string' ? k.api_key.trim() : ""))
				.filter((s: string) => s.length > 0);
		}
		return [];
	} catch {
		return [];
	}
}

export async function maiFetchApiKey(jwtToken: string): Promise<string | null> {
	const keys = await maiFetchAllApiKeys(jwtToken);
	if (keys.length === 0) return null;
	// Q1 : clé au hasard, réutilisable jusqu'à déconnexion (mise en cache via chosenApiKey)
	const current = getSettings().maiAccount?.chosenApiKey?.trim();
	if (current && keys.includes(current)) return current;
	const idx = Math.floor(Math.random() * keys.length);
	return keys[idx] ?? null;
}

/**
 * 8. Enregistrer les tokens consommés via POST /log-usage
 */
export async function maiLogUsage(jwtToken: string, tokensUsed: number): Promise<{ ok: boolean; weeklyUsed?: number; limit?: number }> {
	if (tokensUsed <= 0) {
		return { ok: true };
	}
	try {
		const res = await fetch(`${MAI_API_BASE}/log-usage`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${jwtToken.trim()}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ tokensUsed }),
		});
		const json = await res.json().catch(() => ({}));
		if (res.ok && json.success) {
			// Mettre à jour l'état local dans settingsStore
			const current = getSettings().maiAccount;
			if (current?.usage) {
				const nextUsage: MaiAccountUsage = {
					...current.usage,
					tokensUsed: typeof json.weeklyUsed === 'number' ? json.weeklyUsed : (current.usage.tokensUsed + tokensUsed),
					limit: typeof json.limit === 'number' ? json.limit : current.usage.limit,
				};
				const nextAccount: MaiAccountState = {
					...current,
					usage: nextUsage,
					lastSyncedAt: Date.now(),
				};
				patchSettings({ maiAccount: nextAccount });
				broadcastMaiAccountUpdate(nextAccount);
			}
			return { ok: true, weeklyUsed: json.weeklyUsed, limit: json.limit };
		}
		return { ok: false };
	} catch {
		return { ok: false };
	}
}

/**
 * Synchronise entièrement le compte mAI à partir du token JWT
 * Q1 : choisi une clé au hasard dans mprojects_api_keys et la conserve jusqu'à déconnexion
 * Q2 Option A : côté serveur le middleware accepte le JWT et tire aussi au hasard
 */
export async function syncMaiAccountWithToken(jwtToken: string): Promise<MaiAccountState> {
	const [usageRes, allKeys] = await Promise.all([
		maiFetchUsage(jwtToken),
		maiFetchAllApiKeys(jwtToken),
	]);

	let chosenApiKey: string | null = null;
	const cachedChosen = getSettings().maiAccount?.chosenApiKey?.trim();
	if (cachedChosen && allKeys.includes(cachedChosen)) {
		chosenApiKey = cachedChosen;
	} else if (allKeys.length > 0) {
		const idx = Math.floor(Math.random() * allKeys.length);
		chosenApiKey = allKeys[idx] ?? null;
	}
	const effectiveApiKey = chosenApiKey || jwtToken;
	const userProfile: MaiAccountProfile | undefined = usageRes.ok
		? {
				id: usageRes.email || 'mai-user',
				username: usageRes.username || 'Utilisateur mAI',
				email: usageRes.email || '',
				avatarUrl: usageRes.avatarUrl,
				tier: usageRes.tier || 'Free',
				phone: usageRes.phone,
		  }
		: undefined;

	const usage: MaiAccountUsage | undefined = usageRes.ok
		? {
				tokensUsed: usageRes.tokensUsed,
				limit: usageRes.limit,
				resetAt: usageRes.resetAt,
				weekStart: usageRes.weekStart,
		  }
		: undefined;

	const nextState: MaiAccountState = {
		jwtToken,
		user: userProfile,
		apiKey: effectiveApiKey,
		chosenApiKey: chosenApiKey || undefined,
		usage,
		lastSyncedAt: Date.now(),
	};

	// Mettre à jour le provider mAI dans settings.models.providers avec la clé API
	const curSettings = getSettings();
	const curProviders = curSettings.models?.providers ?? [];
	const hasMai = curProviders.some((p) => p.id === 'mai');
	const nextProviders = hasMai
		? curProviders.map((p) => (p.id === 'mai' ? { ...p, apiKey: effectiveApiKey, baseURL: `${MAI_API_BASE}/v1` } : p))
		: [
				{
					id: 'mai',
					displayName: 'mAI',
					paradigm: 'openai-compatible' as const,
					baseURL: `${MAI_API_BASE}/v1`,
					apiKey: effectiveApiKey,
				},
				...curProviders,
		  ];

	let nextEntries = (curSettings.models?.entries ?? []).filter((e) => !e.id.startsWith('mDevsLabs/'));
	let nextEnabled = (curSettings.models?.enabledIds ?? []).filter((id) => !id.startsWith('mDevsLabs/'));
	let defaultModel = curSettings.defaultModel;
	if (defaultModel?.startsWith('mDevsLabs/')) {
		defaultModel = undefined;
	}

	// Récupération dynamique des modèles disponibles depuis https://mai.val.run/v1/models
	try {
		const modelsRes = await fetch(`${MAI_API_BASE}/v1/models`, {
			headers: {
				Authorization: `Bearer ${effectiveApiKey}`,
			},
		});
		if (modelsRes.ok) {
			const json = (await modelsRes.json().catch(() => ({}))) as any;
			if (Array.isArray(json.data) && json.data.length > 0) {
				const otherEntries = nextEntries.filter((e) => e.providerId !== 'mai');
				const maiEntries: UserModelEntry[] = json.data.map((m: any) => ({
					id: m.id,
					providerId: 'mai',
					displayName: typeof m.name === 'string' && m.name.trim() ? m.name.trim() : m.id,
					requestName: m.id,
					maxOutputTokens: m.maxOutput ?? m.max_output_tokens ?? 8192,
					contextWindowTokens: m.maxContext ?? m.max_context_tokens ?? m.context_window ?? 32768,
					temperatureMode: 'auto',
				}));

				nextEntries = [...maiEntries, ...otherEntries];
				const maiIds = maiEntries.map((m) => m.id);
				nextEnabled = Array.from(new Set([...maiIds, ...nextEnabled]));

				if (!defaultModel || !nextEntries.some((e) => e.id === defaultModel)) {
					defaultModel = maiEntries[0]?.id || 'google/gemini-2.5-flash:free';
				}
			}
		}
	} catch {
		/* ignore network errors when fetching models */
	}

	if (!nextEntries.some((e) => e.providerId === 'mai')) {
		nextEntries = [...DEFAULT_MAI_MODELS, ...nextEntries];
	}
	const allMaiIds = nextEntries.filter((e) => e.providerId === 'mai').map((e) => e.id);
	nextEnabled = Array.from(new Set([...allMaiIds, ...nextEnabled]));

	if (!defaultModel || !nextEntries.some((e) => e.id === defaultModel)) {
		defaultModel = nextEntries[0]?.id || 'google/gemini-2.5-flash:free';
	}

	patchSettings({
		maiAccount: nextState,
		defaultModel: defaultModel || 'google/gemini-2.5-flash:free',
		models: {
			...(curSettings.models ?? {}),
			providers: nextProviders,
			entries: nextEntries,
			enabledIds: nextEnabled,
		},
	});

	broadcastMaiAccountUpdate(nextState);
	return nextState;
}

/**
 * Déconnexion du compte mAI
 */
export function maiLogout(): MaiAccountState {
	const curSettings = getSettings();
	const curProviders = curSettings.models?.providers ?? [];
	const nextProviders = curProviders.map((p) => (p.id === 'mai' ? { ...p, apiKey: '' } : p));

	const nextState: MaiAccountState = {};
	patchSettings({
		maiAccount: nextState,
		models: {
			...(curSettings.models ?? {}),
			providers: nextProviders,
		},
	});

	broadcastMaiAccountUpdate(nextState);
	return nextState;
}
