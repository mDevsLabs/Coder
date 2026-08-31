import { BrowserWindow } from 'electron';
import {
	getSettings,
	patchSettings,
	type ShellSettings,
	type MaiAccountState,
	type MaiAccountUsage,
	type MaiAccountProfile,
	type UserModelEntry,
	DEFAULT_MAI_MODELS,
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
		if (res.ok && (json.success || json.ok !== false)) {
			const rawWeekly =
				json.weeklyUsed ?? json.weekly_used ?? json.tokensUsed ?? json.tokens_used ?? json.used;
			const parsedWeekly = typeof rawWeekly === 'number' ? rawWeekly : Number(rawWeekly);
			const weeklyUsed = Number.isFinite(parsedWeekly) && parsedWeekly >= 0 ? parsedWeekly : undefined;

			const rawLimit =
				json.limit ?? json.maxTokens ?? json.max_tokens ?? json.tokenLimit ?? json.token_limit;
			const parsedLimit = typeof rawLimit === 'number' ? rawLimit : Number(rawLimit);
			const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : undefined;

			// Mettre à jour l'état local dans settingsStore
			const current = getSettings().maiAccount;
			if (current) {
				const prevUsage = current.usage || { tokensUsed: 0, limit: 5_000_000 };
				const nextUsage: MaiAccountUsage = {
					...prevUsage,
					tokensUsed: weeklyUsed !== undefined ? weeklyUsed : (prevUsage.tokensUsed + tokensUsed),
					limit: limit !== undefined ? limit : prevUsage.limit,
				};
				const nextAccount: MaiAccountState = {
					...current,
					usage: nextUsage,
					lastSyncedAt: Date.now(),
				};
				patchSettings({ maiAccount: nextAccount });
				broadcastMaiAccountUpdate(nextAccount);
			}
			return { ok: true, weeklyUsed, limit };
		}
		return { ok: false };
	} catch {
		return { ok: false };
	}
}

export async function recordMaiTokenUsage(tokensUsed: number): Promise<void> {
	if (tokensUsed <= 0) return;
	try {
		const s = getSettings();
		const jwt = s.maiAccount?.jwtToken?.trim() || s.maiAccount?.apiKey?.trim();
		if (jwt) {
			await maiLogUsage(jwt, tokensUsed);
		}
	} catch (err) {
		console.warn('[maiAccount] recordMaiTokenUsage failed:', err);
	}
}

export function updateMaiAccountUsage(usage: MaiAccountUsage): void {
	const current = getSettings().maiAccount;
	if (current) {
		const nextAccount: MaiAccountState = {
			...current,
			usage: {
				...(current.usage || { tokensUsed: 0, limit: 5000000 }),
				...usage,
			},
			lastSyncedAt: Date.now(),
		};
		patchSettings({ maiAccount: nextAccount });
		broadcastMaiAccountUpdate(nextAccount);
	}
}

/**
 * 9. Vérifie si le quota mAI de l'utilisateur est disponible avant de lancer une requête d'IA.
 * Retourne { available: false, message: '...' } si le quota est épuisé.
 */
export async function checkMaiQuotaAvailable(
	settings: ShellSettings,
	forceFresh = false
): Promise<{ available: boolean; message?: string; usage?: MaiAccountUsage }> {
	const maiAccount = settings.maiAccount;
	const jwt = maiAccount?.jwtToken?.trim() || maiAccount?.apiKey?.trim();

	// Si aucun compte mAI n'est connecté ou pas de token, on ne bloque pas
	if (!jwt) {
		return { available: true };
	}

	// 1. Vérification rapide du cache local
	const localUsage = maiAccount?.usage;
	if (
		!forceFresh &&
		localUsage &&
		typeof localUsage.limit === 'number' &&
		localUsage.limit > 0 &&
		typeof localUsage.tokensUsed === 'number' &&
		localUsage.tokensUsed >= localUsage.limit
	) {
		const resetStr = localUsage.resetAt
			? new Date(localUsage.resetAt).toLocaleDateString('fr-FR', {
					weekday: 'long',
					day: 'numeric',
					month: 'long',
			  })
			: 'prochainement';
		return {
			available: false,
			message: `Votre quota hebdomadaire mAI est épuisé (${localUsage.tokensUsed.toLocaleString('fr-FR')} / ${localUsage.limit.toLocaleString('fr-FR')} tokens). Réinitialisation : ${resetStr}.`,
			usage: localUsage,
		};
	}

	// 2. Vérification fraîche auprès de l'API /usage
	try {
		const usageRes = await maiFetchUsage(jwt);
		if (usageRes.ok) {
			const nextUsage: MaiAccountUsage = {
				tokensUsed: usageRes.tokensUsed,
				limit: usageRes.limit,
				resetAt: usageRes.resetAt,
				weekStart: usageRes.weekStart,
			};
			updateMaiAccountUsage(nextUsage);

			if (usageRes.limit > 0 && usageRes.tokensUsed >= usageRes.limit) {
				const resetStr = usageRes.resetAt
					? new Date(usageRes.resetAt).toLocaleDateString('fr-FR', {
							weekday: 'long',
							day: 'numeric',
							month: 'long',
					  })
					: 'prochainement';
				return {
					available: false,
					message: `Votre quota hebdomadaire mAI est épuisé (${usageRes.tokensUsed.toLocaleString('fr-FR')} / ${usageRes.limit.toLocaleString('fr-FR')} tokens). Réinitialisation : ${resetStr}.`,
					usage: nextUsage,
				};
			}
			return { available: true, usage: nextUsage };
		}
	} catch (err) {
		console.warn('[maiAccount] checkMaiQuotaAvailable error:', err);
	}

	return { available: true, usage: localUsage };
}

/**
 * Synchronise entièrement le compte mAI à partir du token JWT
 */
export async function syncMaiAccountWithToken(jwtToken: string): Promise<MaiAccountState> {
	// Le jwtToken est directement utilisé comme clé API effective — plus de fetch BDD mprojects_api_keys
	const usageRes = await maiFetchUsage(jwtToken);
	const effectiveApiKey = jwtToken.trim();
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
		usage,
		lastSyncedAt: Date.now(),
	};

	// Mettre à jour le provider mAI dans settings.models.providers avec le jwtToken comme clé effective
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
