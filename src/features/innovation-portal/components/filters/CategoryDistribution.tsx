import { PieChart } from 'lucide-react';
import {
  PROJECT_CATEGORY_LABELS,
  ProjectCategory,
} from '../../enums/portfolio-enums';
import type { InnovationProject } from '../../types/portfolio-types';
import { CATEGORY_PALETTE } from '../../utils/style-palettes';

interface CategoryDistributionProps {
  projects: InnovationProject[];
}

export function CategoryDistribution({ projects }: CategoryDistributionProps) {
  const total = projects.length || 1;
  const byCategory = Object.values(ProjectCategory).map((category) => ({
    category,
    count: projects.filter((p) => p.category === category).length,
  }));

  return (
    <section className="surface-card flex flex-col gap-4 p-5">
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase">
        <PieChart className="h-3.5 w-3.5 text-ford-accent" aria-hidden />
        Portfolio mix
      </div>

      <div className="flex flex-col gap-3">
        {byCategory.map(({ category, count }) => {
          const percentage = Math.round((count / total) * 100);
          const palette = CATEGORY_PALETTE[category];
          return (
            <div key={category} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${palette.text}`}>
                  {PROJECT_CATEGORY_LABELS[category]}
                </span>
                <span className="text-ford-text-dim tabular-nums">
                  <span className="font-semibold text-white">{count}</span> · {percentage}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 ring-inset">
                <div
                  className={`h-full rounded-full ${palette.accentBar}`}
                  style={{ width: count === 0 ? '4px' : `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
