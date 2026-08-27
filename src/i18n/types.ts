/** Langue de l'interface : Français uniquement */
export type AppLocale = 'fr';

export type TParams = Record<string, string | number | boolean | undefined>;

export type TFunction = (key: string, params?: TParams) => string;
