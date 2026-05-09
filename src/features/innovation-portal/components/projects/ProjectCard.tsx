import { ArrowUpRight, CalendarClock, ExternalLink, User2 } from 'lucide-react';
import type { InnovationProject } from '../../types/portfolio-types';
import { formatDate, relativeDateLabel } from '../../utils/date-utils';
import { formatImpactValue, formatUsd, sumAnnualUsdImpact } from '../../utils/impact-utils';
import { CategoryBadge } from '../badges/CategoryBadge';
import { PriorityBadge } from '../badges/PriorityBadge';
import { StatusBadge } from '../badges/StatusBadge';
import { TypeBadge } from '../badges/TypeBadge';
import { ProgressBar } from '../common/ProgressBar';

interface ProjectCardProps {
  project: InnovationProject;
  isSelected: boolean;
  onSelect: (projectId: string) => void;
}

export function ProjectCard({ project, isSelected, onSelect }: ProjectCardProps) {
  const annualUsd = sumAnnualUsdImpact(project.impact);
  const headlineImpact =
    annualUsd > 0
      ? { label: 'Annual impact', value: formatUsd(annualUsd) }
      : project.impact[0]
        ? { label: project.impact[0].label, value: formatImpactValue(project.impact[0]) }
        : null;
  const deploymentLink = project.links.find((l) => l.url && l.url !== '#');

  return (
    <button
      type="button"
      onClick={() => onSelect(project.id)}
      aria-pressed={isSelected}
      className={`group surface-card flex flex-col gap-4 p-5 text-left transition hover:border-ford-border-strong ${
        isSelected ? 'ring-2 ring-ford-accent/50' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-ford-text-dim uppercase">
            {project.shortName} · {project.team[0]}
          </span>
          <h3 className="text-base leading-snug font-semibold text-white sm:text-lg">
            {project.name}
          </h3>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-ford-text-dim transition group-hover:text-ford-accent" aria-hidden />
      </div>

      <p className="line-clamp-2 text-xs text-ford-text-muted sm:text-sm">{project.description}</p>

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        <CategoryBadge category={project.category} />
        <TypeBadge type={project.type} />
        <PriorityBadge priority={project.priority} />
      </div>

      <ProgressBar value={project.progress} />

      {headlineImpact && (
        <div className="flex items-center justify-between rounded-md border border-ford-border bg-ford-surface-soft px-3 py-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-wider text-ford-text-dim uppercase">
              {headlineImpact.label}
            </span>
            <span className="text-sm font-semibold text-white tabular-nums">
              {headlineImpact.value}
            </span>
          </div>
          {deploymentLink ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-ford-border bg-ford-surface px-2 py-0.5 text-[10px] font-semibold tracking-wider text-ford-text-muted uppercase">
              <ExternalLink className="h-2.5 w-2.5" aria-hidden />
              live
            </span>
          ) : null}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ford-border-soft pt-3 text-[11px] text-ford-text-dim">
        <span className="inline-flex items-center gap-1.5">
          <User2 className="h-3 w-3" aria-hidden />
          {project.owner}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarClock className="h-3 w-3" aria-hidden />
          Updated {formatDate(project.lastUpdateDate)} · {relativeDateLabel(project.lastUpdateDate)}
        </span>
      </div>
    </button>
  );
}
