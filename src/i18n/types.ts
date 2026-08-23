/** Langue de l'interface : Français par défaut, avec support en et zh-CN */
export type AppLocale = 'fr' | 'zh-CN' | 'en';

export type TParams = Record<string, string | number | boolean | undefined>;

export type TFunction = (key: string, params?: TParams) => string;
