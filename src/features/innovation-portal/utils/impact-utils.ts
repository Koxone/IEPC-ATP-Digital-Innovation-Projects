import { ImpactUnit } from '../enums/portfolio-enums';
import type { Dictionary } from '../i18n/dictionary';
import type { ImpactMetric } from '../types/portfolio-types';

/**
 * Render an impact metric value with its appropriate symbol and short
 * suffix. Suffixes are pulled from the dictionary so the same metric
 * reads "$240K / yr" or "$240K / año" depending on the active locale.
 */
export function formatImpactValue(metric: ImpactMetric, t: Dictionary): string {
  const value = metric.value;
  switch (metric.unit) {
    case ImpactUnit.USD_PER_YEAR:
      return `$${formatCompactNumber(value)} ${t.impact.perYearSuffix}`;
    case ImpactUnit.HOURS_PER_MONTH:
      return `${formatCompactNumber(value)} ${t.impact.perMonthHoursSuffix}`;
    case ImpactUnit.USERS:
      return `${formatCompactNumber(value)} ${t.impact.usersSuffix}`;
    case ImpactUnit.PERCENT:
      return `${value}%`;
    case ImpactUnit.DAYS_REDUCED:
      return `${formatCompactNumber(value)} ${t.impact.daysSuffix}`;
    case ImpactUnit.COUNT:
      return formatCompactNumber(value);
    default:
      return String(value);
  }
}

export function sumAnnualUsdImpact(metrics: ImpactMetric[]): number {
  return metrics
    .filter((m) => m.unit === ImpactUnit.USD_PER_YEAR)
    .reduce((sum, m) => sum + m.value, 0);
}

export function sumMonthlyHoursSaved(metrics: ImpactMetric[]): number {
  return metrics
    .filter((m) => m.unit === ImpactUnit.HOURS_PER_MONTH)
    .reduce((sum, m) => sum + m.value, 0);
}

export function formatCompactNumber(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${trimTrailingZero(value / 1_000_000)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${trimTrailingZero(value / 1_000)}K`;
  }
  return value.toLocaleString('en-US');
}

function trimTrailingZero(value: number): string {
  return value.toFixed(1).replace(/\.0$/, '');
}

export function formatUsd(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${trimTrailingZero(value / 1_000_000)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${trimTrailingZero(value / 1_000)}K`;
  }
  return `$${value.toLocaleString('en-US')}`;
}
