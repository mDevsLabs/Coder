import type { AppLocale, TFunction, TParams } from './types';
import { messagesFr } from './messages.fr';
import { messagesEn } from './messages.en';
import { messagesZhCN } from './messages.zh-CN';

export function interpolate(template: string, params?: TParams): string {
	if (!params) {
		return template;
	}
	return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
		const v = params[key];
		return v === undefined || v === null ? '' : String(v);
	});
}

export function createTranslate(locale: AppLocale): TFunction {
	const primary = locale === 'fr' ? messagesFr : locale === 'en' ? messagesEn : messagesZhCN;
	const secondary = locale === 'fr' ? messagesEn : locale === 'en' ? messagesFr : messagesEn;
	return (key: string, params?: TParams): string => {
		const raw = primary[key] ?? secondary[key] ?? messagesEn[key] ?? messagesZhCN[key] ?? key;
		return interpolate(raw, params);
	};
}

/** Fallback sans Context : Français par défaut */
export const defaultT = createTranslate('fr');

export function normalizeLocale(raw: unknown): AppLocale {
	if (raw === 'zh-CN' || raw === 'zh') {
		return 'zh-CN';
	}
	if (raw === 'en') {
		return 'en';
	}
	return 'fr';
}
