import { ImpactUnit } from '../../enums/portfolio-enums';
import type { ImpactMetric } from '../../types/portfolio-types';
import { formatImpactValue } from '../../utils/impact-utils';

interface ImpactMetricRowProps {
  metric: ImpactMetric;
}

export function ImpactMetricRow({ metric }: ImpactMetricRowProps) {
  const accent = ACCENT_BY_UNIT[metric.unit];
  return (
    <div className="surface-card flex items-start gap-3 p-3">
      <span className={`mt-1 h-7 w-1 shrink-0 rounded-full ${accent}`} aria-hidden />
      <div className="flex flex-1 flex-col">
        <p className="text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase">
          {metric.label}
        </p>
        <p className="text-base font-semibold text-white tabular-nums">
          {formatImpactValue(metric)}
        </p>
        {metric.detail ? (
          <p className="mt-1 text-xs text-ford-text-muted">{metric.detail}</p>
        ) : null}
      </div>
    </div>
  );
}

const ACCENT_BY_UNIT: Record<ImpactUnit, string> = {
  [ImpactUnit.USD_PER_YEAR]: 'bg-[#10b981]',
  [ImpactUnit.HOURS_PER_MONTH]: 'bg-[#3b82f6]',
  [ImpactUnit.USERS]: 'bg-[#06b6d4]',
  [ImpactUnit.PERCENT]: 'bg-[#a855f7]',
  [ImpactUnit.DAYS_REDUCED]: 'bg-[#f59e0b]',
  [ImpactUnit.COUNT]: 'bg-[#7a8492]',
};
