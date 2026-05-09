import { Flag } from 'lucide-react';
import { PROJECT_PRIORITY_LABELS, ProjectPriority } from '../../enums/portfolio-enums';
import { PRIORITY_PALETTE } from '../../utils/style-palettes';

interface PriorityBadgeProps {
  priority: ProjectPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const palette = PRIORITY_PALETTE[priority];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${palette.container}`}
    >
      <Flag className={`h-3 w-3 ${palette.iconColor}`} aria-hidden />
      {PROJECT_PRIORITY_LABELS[priority]} priority
    </span>
  );
}
