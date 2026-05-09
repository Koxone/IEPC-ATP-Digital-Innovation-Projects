/**
 * Date helpers used across the portfolio portal. Kept dependency-free and
 * timezone-tolerant — the data file uses ISO strings (`2026-04-15`).
 */

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
});

const parse = (value: string): Date => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

export function formatDate(value: string): string {
  return DATE_FORMATTER.format(parse(value));
}

export function formatMonth(value: string): string {
  return SHORT_DATE_FORMATTER.format(parse(value));
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

export function relativeDateLabel(value: string): string {
  const days = getDaysUntilDate(value);
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  if (days > 0 && days <= 14) return `In ${days} days`;
  if (days < 0 && days >= -14) return `${Math.abs(days)} days ago`;
  if (days > 0 && days <= 60) return `In ${Math.round(days / 7)} weeks`;
  if (days < 0 && days >= -60) return `${Math.round(Math.abs(days) / 7)} weeks ago`;
  return formatMonth(value);
}
