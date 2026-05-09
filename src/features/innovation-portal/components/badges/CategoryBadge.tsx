import { Bot, Cog, Database, MonitorCog, Sparkles } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { PROJECT_CATEGORY_LABELS, ProjectCategory } from '../../enums/portfolio-enums';
import { CATEGORY_PALETTE } from '../../utils/style-palettes';

interface CategoryBadgeProps {
  category: ProjectCategory;
  size?: 'sm' | 'md';
}

const CATEGORY_ICONS: Record<ProjectCategory, ComponentType<SVGProps<SVGSVGElement>>> = {
  [ProjectCategory.SOFTWARE]: MonitorCog,
  [ProjectCategory.AI]: Bot,
  [ProjectCategory.DIGITAL_TRANSFORMATION]: Sparkles,
  [ProjectCategory.DATA_ANALYTICS]: Database,
  [ProjectCategory.AUTOMATION]: Cog,
};

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const palette = CATEGORY_PALETTE[category];
  const Icon = CATEGORY_ICONS[category];
  const sizing =
    size === 'md'
      ? 'px-3 py-1.5 text-xs gap-1.5'
      : 'px-2.5 py-1 text-[11px] gap-1';
  const iconSize = size === 'md' ? 'h-3.5 w-3.5' : 'h-3 w-3';
  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold tracking-wide uppercase ${palette.container} ${sizing}`}
    >
      <Icon className={`${iconSize} ${palette.iconColor}`} aria-hidden />
      {PROJECT_CATEGORY_LABELS[category]}
    </span>
  );
}
