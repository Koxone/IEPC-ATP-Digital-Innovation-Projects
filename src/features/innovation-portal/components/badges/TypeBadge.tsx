import { PROJECT_TYPE_LABELS, ProjectType } from '../../enums/portfolio-enums';
import { TYPE_PALETTE } from '../../utils/style-palettes';

interface TypeBadgeProps {
  type: ProjectType;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const palette = TYPE_PALETTE[type];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${palette.container}`}
    >
      {PROJECT_TYPE_LABELS[type]}
    </span>
  );
}
