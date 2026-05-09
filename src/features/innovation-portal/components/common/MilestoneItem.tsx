import { AlertTriangle, CalendarClock, Check, Circle, CircleDot } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import {
  MILESTONE_STATUS_LABELS,
  MilestoneStatus,
} from '../../enums/portfolio-enums';
import type { Milestone } from '../../types/portfolio-types';
import { formatDate, relativeDateLabel } from '../../utils/date-utils';
import { MILESTONE_PALETTE } from '../../utils/style-palettes';

interface MilestoneItemProps {
  milestone: Milestone;
  isLast?: boolean;
}

const ICONS: Record<MilestoneStatus, ComponentType<SVGProps<SVGSVGElement>>> = {
  [MilestoneStatus.PENDING]: Circle,
  [MilestoneStatus.IN_PROGRESS]: CircleDot,
  [MilestoneStatus.COMPLETED]: Check,
  [MilestoneStatus.AT_RISK]: AlertTriangle,
};

export function MilestoneItem({ milestone, isLast = false }: MilestoneItemProps) {
  const palette = MILESTONE_PALETTE[milestone.status];
  const Icon = ICONS[milestone.status];
  const dateLabel = milestone.completedDate
    ? `Completed ${formatDate(milestone.completedDate)}`
    : `Target ${formatDate(milestone.targetDate)} · ${relativeDateLabel(milestone.targetDate)}`;

  return (
    <li className="relative flex gap-3 pb-5 last:pb-0">
      {!isLast && (
        <span className="absolute top-7 bottom-0 left-3 w-px bg-ford-border" aria-hidden />
      )}
      <span
        className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${palette.container}`}
      >
        <Icon className={`h-3 w-3 ${palette.iconColor}`} aria-hidden />
      </span>
      <div className="surface-card flex w-full flex-col gap-1 p-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <p className="text-sm font-semibold text-white">{milestone.title}</p>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${palette.container}`}
          >
            {MILESTONE_STATUS_LABELS[milestone.status]}
          </span>
        </div>
        <p className="text-xs text-ford-text-muted">{milestone.description}</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-ford-text-dim">
          <CalendarClock className="h-3 w-3" aria-hidden />
          {dateLabel}
        </p>
      </div>
    </li>
  );
}
