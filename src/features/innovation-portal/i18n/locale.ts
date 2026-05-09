export enum Locale {
  EN = 'en',
  ES = 'es',
}

export const SUPPORTED_LOCALES: Locale[] = [Locale.EN, Locale.ES];

export const DEFAULT_LOCALE: Locale = Locale.EN;

export const LOCALE_LABELS: Record<Locale, string> = {
  [Locale.EN]: 'English',
  [Locale.ES]: 'Español',
};

export const LOCALE_SHORT: Record<Locale, string> = {
  [Locale.EN]: 'EN',
  [Locale.ES]: 'ES',
};

/**
 * BCP-47 tags used by every Intl.* formatter in the portal.
 */
export const LOCALE_BCP47: Record<Locale, string> = {
  [Locale.EN]: 'en-US',
  [Locale.ES]: 'es-MX',
};
