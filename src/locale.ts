export const ALL_LOCALES = ["en"] as const;

export const ALLOWED_LOCALES = new Set(ALL_LOCALES as readonly string[]);
export type Locale = (typeof ALL_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
