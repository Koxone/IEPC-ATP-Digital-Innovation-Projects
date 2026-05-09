'use client';

import { CalendarRange, ChevronRight } from 'lucide-react';
import { MilestoneStatus } from '../../enums/portfolio-enums';
import { useI18n } from '../../i18n/I18nProvider';
import type { InnovationProject, Milestone } from '../../types/portfolio-types';
import {
  formatDate,
  formatLongMonth,
  getDaysUntilDate,
  relativeDateLabel,
} from '../../utils/date-utils';
import { MILESTONE_PALETTE } from '../../utils/style-palettes';

interface PortfolioRoadmapProps {
  projects: InnovationProject[];
  onSelectProject: (projectId: string) => void;
}

interface RoadmapEntry {
  project: InnovationProject;
  milestone: Milestone;
}

export function PortfolioRoadmap({ projects, onSelectProject }: PortfolioRoadmapProps) {
  const { locale, t } = useI18n();
  const entries: RoadmapEntry[] = projects
    .flatMap((project) =>
      project.milestones
        .filter((milestone) => milestone.status !== MilestoneStatus.COMPLETED)
        .map((milestone) => ({ project, milestone })),
    )
    .sort(
      (a, b) =>
        new Date(a.milestone.targetDate).getTime() -
        new Date(b.milestone.targetDate).getTime(),
    )
    .slice(0, 12);

  if (entries.length === 0) {
    return null;
  }

  const grouped = groupByMonth(entries, locale);

  return (
    <section className="surface-card flex flex-col gap-5 p-5 sm:p-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase">
          <CalendarRange className="h-3.5 w-3.5 text-ford-accent" aria-hidden />
          {t.roadmap.eyebrow}
        </div>
        <h3 className="text-lg font-semibold text-white">{t.roadmap.title}</h3>
        <p className="text-sm text-ford-text-muted">{t.roadmap.description}</p>
      </div>

      <div className="flex flex-col gap-5">
        {grouped.map(({ month, items }) => (
          <div key={month} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase">
                {month}
              </span>
              <span className="h-px flex-1 bg-ford-border" aria-hidden />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {items.map(({ project, milestone }) => {
                const palette = MILESTONE_PALETTE[milestone.status];
                const daysUntil = getDaysUntilDate(milestone.targetDate);
                const isOverdue = daysUntil < 0;
                return (
                  <button
                    key={`${project.id}-${milestone.id}`}
                    type="button"
                    onClick={() => onSelectProject(project.id)}
                    className="group surface-card flex cursor-pointer items-stretch gap-3 p-3 text-left transition hover:border-ford-border-strong"
                  >
                    <span
                      className={`w-1 shrink-0 rounded-full ${palette.accentBar}`}
                      aria-hidden
                    />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-semibold tracking-wider text-ford-text-dim uppercase">
                          {project.shortName}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${palette.container}`}
                        >
                          {t.enums.milestoneStatus[milestone.status]}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white">{milestone.title}</p>
                      <p className="line-clamp-2 text-xs text-ford-text-muted">
                        {milestone.description}
                      </p>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-ford-text-dim">
                        <span>
                          {formatDate(milestone.targetDate, locale)} ·{' '}
                          <span className={isOverdue ? 'text-[#fda4af]' : 'text-ford-text-muted'}>
                            {relativeDateLabel(milestone.targetDate, t, locale)}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-ford-accent">
                          {project.name}
                          <ChevronRight
                            className="h-3 w-3 transition group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function groupByMonth(
  entries: RoadmapEntry[],
  locale: ReturnType<typeof useI18n>['locale'],
): Array<{ month: string; items: RoadmapEntry[] }> {
  const map = new Map<string, RoadmapEntry[]>();
  for (const entry of entries) {
    const key = formatLongMonth(entry.milestone.targetDate, locale);
    const list = map.get(key) ?? [];
    list.push(entry);
    map.set(key, list);
  }
  return Array.from(map.entries()).map(([month, items]) => ({ month, items }));
}
