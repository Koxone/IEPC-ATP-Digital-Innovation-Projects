'use client';

import { ProjectType } from '../../enums/portfolio-enums';
import { useT } from '../../i18n/I18nProvider';
import { TYPE_PALETTE } from '../../utils/style-palettes';

interface TypeBadgeProps {
  type: ProjectType;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const t = useT();
  const palette = TYPE_PALETTE[type];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${palette.container}`}
    >
      {t.enums.projectType[type]}
    </span>
  );
}
