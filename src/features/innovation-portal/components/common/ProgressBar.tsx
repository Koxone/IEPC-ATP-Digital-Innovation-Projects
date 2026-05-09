'use client';

import { useT } from '../../i18n/I18nProvider';
import { progressTone } from '../../utils/style-palettes';

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function ProgressBar({ value, showLabel = true, size = 'sm' }: ProgressBarProps) {
  const t = useT();
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));
  const heights = size === 'md' ? 'h-2.5' : 'h-2';
  return (
    <div className="flex flex-col gap-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-[11px] font-medium text-ford-text-muted">
          <span className="tracking-wider text-ford-text-dim uppercase">
            {t.progressBar.label}
          </span>
          <span className="font-semibold text-white tabular-nums">{safeValue}%</span>
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 ring-inset ${heights}`}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${progressTone(safeValue)}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
