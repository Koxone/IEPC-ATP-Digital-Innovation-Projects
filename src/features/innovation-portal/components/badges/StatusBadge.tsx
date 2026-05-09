import {
  Activity,
  CheckCheck,
  CircleDot,
  CirclePause,
  Lightbulb,
  Rocket,
  Workflow,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { PROJECT_STATUS_LABELS, ProjectStatus } from '../../enums/portfolio-enums';
import { STATUS_PALETTE } from '../../utils/style-palettes';

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md';
}

const STATUS_ICONS: Record<ProjectStatus, ComponentType<SVGProps<SVGSVGElement>>> = {
  [ProjectStatus.IDEATION]: Lightbulb,
  [ProjectStatus.PLANNING]: Workflow,
  [ProjectStatus.IN_PROGRESS]: Activity,
  [ProjectStatus.IN_PILOT]: CircleDot,
  [ProjectStatus.DEPLOYED]: Rocket,
  [ProjectStatus.PAUSED]: CirclePause,
  [ProjectStatus.COMPLETED]: CheckCheck,
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const palette = STATUS_PALETTE[status];
  const Icon = STATUS_ICONS[status];
  const sizing =
    size === 'md'
      ? 'px-3 py-1.5 text-xs gap-1.5'
      : 'px-2.5 py-1 text-[11px] gap-1';
  const iconSize = size === 'md' ? 'h-3.5 w-3.5' : 'h-3 w-3';
  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold tracking-wide uppercase ${palette.container} ${sizing}`}
      title={PROJECT_STATUS_LABELS[status]}
    >
      <Icon className={`${iconSize} ${palette.iconColor}`} aria-hidden />
      {PROJECT_STATUS_LABELS[status]}
    </span>
  );
}
