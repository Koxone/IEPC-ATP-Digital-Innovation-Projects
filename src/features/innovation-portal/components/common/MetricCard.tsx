import type { ComponentType, SVGProps } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconColor: string;
  iconBg: string;
}

export function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  iconColor,
  iconBg,
}: MetricCardProps) {
  return (
    <div className="surface-card flex items-start justify-between gap-4 p-5 transition hover:border-ford-border-strong">
      <div className="flex flex-col gap-1">
        <p className="text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase">
          {label}
        </p>
        <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
        {hint ? <p className="mt-1 text-xs text-ford-text-dim">{hint}</p> : null}
      </div>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ring-1 ${iconBg} ${iconColor}`}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
    </div>
  );
}
