'use client';

import { Flag } from 'lucide-react';
import { ProjectPriority } from '../../enums/portfolio-enums';
import { useT } from '../../i18n/I18nProvider';
import { PRIORITY_PALETTE } from '../../utils/style-palettes';

interface PriorityBadgeProps {
  priority: ProjectPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const t = useT();
  const palette = PRIORITY_PALETTE[priority];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${palette.container}`}
    >
      <Flag className={`h-3 w-3 ${palette.iconColor}`} aria-hidden />
      {t.enums.projectPriority[priority]} {t.priority.suffix}
    </span>
  );
}
