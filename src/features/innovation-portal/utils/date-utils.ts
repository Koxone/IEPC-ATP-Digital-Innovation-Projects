import type { Dictionary } from '../i18n/dictionary';
import { DEFAULT_LOCALE, LOCALE_BCP47, Locale } from '../i18n/locale';

/**
 * Date helpers used across the portfolio portal. Locale-aware via
 * `Intl.DateTimeFormat` and the active dictionary for relative labels.
 */

const parse = (value: string): Date => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(locale: Locale, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = `${locale}|${JSON.stringify(options)}`;
  let formatter = formatterCache.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(LOCALE_BCP47[locale], options);
    formatterCache.set(key, formatter);
  }
  return formatter;
}

export function formatDate(value: string, locale: Locale = DEFAULT_LOCALE): string {
  return getFormatter(locale, { month: 'short', day: 'numeric', year: 'numeric' }).format(
    parse(value),
  );
}

export function formatMonth(value: string, locale: Locale = DEFAULT_LOCALE): string {
  return getFormatter(locale, { month: 'short', year: 'numeric' }).format(parse(value));
}

export function formatLongMonth(value: string, locale: Locale = DEFAULT_LOCALE): string {
  return getFormatter(locale, { month: 'long', year: 'numeric' }).format(parse(value));
}

export function getDaysUntilDate(value: string): number {
  const target = parse(value);
  const now = new Date();
  const startOfTarget = Date.UTC(
    target.getUTCFullYear(),
    target.getUTCMonth(),
    target.getUTCDate(),
  );
  const startOfNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((startOfTarget - startOfNow) / (1000 * 60 * 60 * 24));
}

/**
 * Returns a localized relative-time label such as "Today", "In 3 days"
 * or "2 weeks ago", falling back to the formatted month for distant
 * dates so the UI never reads "in 320 days".
 */
export function relativeDateLabel(
  value: string,
  t: Dictionary,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const days = getDaysUntilDate(value);
  if (days === 0) return t.dates.today;
  if (days === 1) return t.dates.tomorrow;
  if (days === -1) return t.dates.yesterday;
  if (days > 0 && days <= 14) return t.dates.inDays(days);
  if (days < 0 && days >= -14) return t.dates.daysAgo(Math.abs(days));
  if (days > 0 && days <= 60) return t.dates.inWeeks(Math.round(days / 7));
  if (days < 0 && days >= -60) return t.dates.weeksAgo(Math.round(Math.abs(days) / 7));
  return formatMonth(value, locale);
}
