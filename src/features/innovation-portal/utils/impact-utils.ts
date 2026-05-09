import { ImpactUnit } from '../enums/portfolio-enums';
import type { ImpactMetric } from '../types/portfolio-types';

/**
 * Render an impact metric value with its appropriate symbol and short
 * suffix. Uses K/M abbreviations for currency to keep cards compact.
 */
export function formatImpactValue(metric: ImpactMetric): string {
  const value = metric.value;
  switch (metric.unit) {
    case ImpactUnit.USD_PER_YEAR:
      return `$${formatCompactNumber(value)} / yr`;
    case ImpactUnit.HOURS_PER_MONTH:
      return `${formatCompactNumber(value)} hrs / mo`;
    case ImpactUnit.USERS:
      return `${formatCompactNumber(value)} users`;
    case ImpactUnit.PERCENT:
      return `${value}%`;
    case ImpactUnit.DAYS_REDUCED:
      return `${formatCompactNumber(value)} days`;
    case ImpactUnit.COUNT:
      return formatCompactNumber(value);
    default:
      return String(value);
  }
}

/**
 * Total annual financial impact across the entire portfolio. Skips
 * non-currency metrics so the hero KPI stays meaningful.
 */
export function sumAnnualUsdImpact(metrics: ImpactMetric[]): number {
  return metrics
    .filter((m) => m.unit === ImpactUnit.USD_PER_YEAR)
    .reduce((sum, m) => sum + m.value, 0);
}

/**
 * Total recurring time saved per month across the portfolio.
 */
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
  return value
    .toFixed(1)
    .replace(/\.0$/, '');
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
