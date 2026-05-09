'use client';

import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  Award,
  Cpu,
  ExternalLink,
  ListChecks,
  Map,
  ShieldAlert,
  Target,
  Users,
  X,
} from 'lucide-react';
import { useEffect } from 'react';
import { ProjectLinkType } from '../../enums/portfolio-enums';
import { useI18n } from '../../i18n/I18nProvider';
import type { InnovationProject } from '../../types/portfolio-types';
import { formatDate, relativeDateLabel } from '../../utils/date-utils';
import { CategoryBadge } from '../badges/CategoryBadge';
import { PriorityBadge } from '../badges/PriorityBadge';
import { StatusBadge } from '../badges/StatusBadge';
import { TypeBadge } from '../badges/TypeBadge';
import { ImpactMetricRow } from '../common/ImpactMetricRow';
import { MilestoneItem } from '../common/MilestoneItem';
import { ProgressBar } from '../common/ProgressBar';
import { SectionTitle } from '../common/SectionTitle';

interface ProjectDetailPanelProps {
  project: InnovationProject | null;
  onClose: () => void;
}

export function ProjectDetailPanel({ project, onClose }: ProjectDetailPanelProps) {
  const { t } = useI18n();
  useEffect(() => {
    if (!project) return;
    const handler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button
        type="button"
        aria-label={t.detail.closeAria}
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/50 backdrop-blur-sm"
      />
      <aside className="relative z-10 flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-ford-border bg-ford-bg shadow-2xl">
        <DetailHeader project={project} onClose={onClose} />
        <div className="scrollbar-slim flex flex-1 flex-col gap-6 overflow-y-auto p-6">
          <Description project={project} />
          <DeliverySection project={project} />
          <ImpactSection project={project} />
          <OwnershipSection project={project} />
          <TechStackSection project={project} />
          <LinksSection project={project} />
          <RoadmapSection project={project} />
          <NextStepsSection project={project} />
          <BlockersSection project={project} />
        </div>
      </aside>
    </div>
  );
}

function DetailHeader({ project, onClose }: { project: InnovationProject; onClose: () => void }) {
  const { t } = useI18n();
  return (
    <header className="flex items-start justify-between gap-4 border-b border-ford-border bg-ford-sidebar/80 p-6">
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-semibold tracking-[0.2em] text-ford-text-dim uppercase">
          {project.shortName}
        </span>
        <h2 className="text-2xl leading-tight font-bold text-white">{project.name}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} size="md" />
          <CategoryBadge category={project.category} size="md" />
          <TypeBadge type={project.type} />
          <PriorityBadge priority={project.priority} />
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer rounded-md border border-ford-border bg-ford-surface p-1.5 text-ford-text-muted transition hover:border-ford-border-strong hover:text-white"
        aria-label={t.detail.closeAria}
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </header>
  );
}

function Description({ project }: { project: InnovationProject }) {
  const { t } = useI18n();
  return (
    <section className="surface-card flex flex-col gap-2 p-4">
      <p className="text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase">
        {t.detail.sections.about}
      </p>
      <p className="text-sm leading-relaxed text-ford-text">{project.longDescription}</p>
    </section>
  );
}

function DeliverySection({ project }: { project: InnovationProject }) {
  const { locale, t } = useI18n();
  return (
    <section className="flex flex-col gap-3">
      <SectionTitle icon={Target} title={t.detail.sections.delivery} />
      <div className="surface-card flex flex-col gap-4 p-4">
        <ProgressBar value={project.progress} size="md" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <KeyValue label={t.detail.sections.kickoff} value={formatDate(project.kickoffDate, locale)} />
          <KeyValue
            label={t.detail.sections.expectedGoLive}
            value={
              project.expectedGoLiveDate
                ? `${formatDate(project.expectedGoLiveDate, locale)} · ${relativeDateLabel(
                    project.expectedGoLiveDate,
                    t,
                    locale,
                  )}`
                : t.detail.sections.tbd
            }
          />
          <KeyValue
            label={t.detail.sections.lastUpdate}
            value={`${formatDate(project.lastUpdateDate, locale)} · ${relativeDateLabel(
              project.lastUpdateDate,
              t,
              locale,
            )}`}
          />
        </div>
      </div>
    </section>
  );
}

function ImpactSection({ project }: { project: InnovationProject }) {
  const { t } = useI18n();
  if (project.impact.length === 0) return null;
  return (
    <section className="flex flex-col gap-3">
      <SectionTitle icon={Award} title={t.detail.sections.impact} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {project.impact.map((metric) => (
          <ImpactMetricRow key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}

function OwnershipSection({ project }: { project: InnovationProject }) {
  const { t } = useI18n();
  return (
    <section className="flex flex-col gap-3">
      <SectionTitle icon={Users} title={t.detail.sections.ownership} />
      <div className="surface-card grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
        <KeyValue label={t.detail.sections.owner} value={project.owner} />
        <KeyValue label={t.detail.sections.team} value={project.team.join(', ')} />
        <KeyValue label={t.detail.sections.sponsor} value={project.sponsor} />
      </div>
    </section>
  );
}

function TechStackSection({ project }: { project: InnovationProject }) {
  const { t } = useI18n();
  if (project.techStack.length === 0) return null;
  return (
    <section className="flex flex-col gap-3">
      <SectionTitle icon={Cpu} title={t.detail.sections.tech} />
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-full border border-ford-border bg-ford-surface px-3 py-1 text-xs font-medium text-ford-text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}

function LinksSection({ project }: { project: InnovationProject }) {
  const { t } = useI18n();
  if (project.links.length === 0) return null;
  return (
    <section className="flex flex-col gap-3">
      <SectionTitle icon={ExternalLink} title={t.detail.sections.links} />
      <div className="flex flex-col gap-2">
        {project.links.map((link) => {
          const isLive = link.url && link.url !== '#';
          const baseClass =
            'surface-card flex items-center justify-between gap-3 p-3 transition';
          return (
            <a
              key={link.id}
              href={isLive ? link.url : undefined}
              target={isLive ? '_blank' : undefined}
              rel={isLive ? 'noopener noreferrer' : undefined}
              aria-disabled={!isLive}
              className={
                isLive
                  ? `${baseClass} cursor-pointer hover:border-ford-border-strong`
                  : `${baseClass} pointer-events-none cursor-not-allowed opacity-60`
              }
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold tracking-wider text-ford-text-dim uppercase">
                  {t.enums.projectLink[link.type as ProjectLinkType]}
                </span>
                <span className="text-sm font-semibold text-white">{link.label}</span>
              </div>
              {isLive ? (
                <ArrowUpRight className="h-4 w-4 text-ford-accent" aria-hidden />
              ) : (
                <span className="text-[10px] font-semibold tracking-wider text-ford-text-dim uppercase">
                  {t.detail.sections.pendingUrl}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}

function RoadmapSection({ project }: { project: InnovationProject }) {
  const { t } = useI18n();
  if (project.milestones.length === 0) return null;
  return (
    <section className="flex flex-col gap-3">
      <SectionTitle
        icon={Map}
        title={t.detail.sections.roadmap}
        hint={t.detail.sections.roadmapHint}
      />
      <ol className="flex flex-col">
        {project.milestones.map((milestone, idx) => (
          <MilestoneItem
            key={milestone.id}
            milestone={milestone}
            isLast={idx === project.milestones.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}

function NextStepsSection({ project }: { project: InnovationProject }) {
  const { t } = useI18n();
  if (project.nextSteps.length === 0) return null;
  return (
    <section className="flex flex-col gap-3">
      <SectionTitle icon={ListChecks} title={t.detail.sections.nextSteps} />
      <ul className="surface-card flex flex-col gap-2 p-4">
        {project.nextSteps.map((step, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-ford-text">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ford-accent"
              aria-hidden
            />
            {step}
          </li>
        ))}
      </ul>
    </section>
  );
}

function BlockersSection({ project }: { project: InnovationProject }) {
  const { locale, t } = useI18n();
  if (project.blockers.length === 0) {
    return (
      <section className="flex flex-col gap-3">
        <SectionTitle icon={ShieldAlert} title={t.detail.sections.blockers} />
        <p className="surface-card-soft inline-flex items-center gap-2 p-3 text-sm text-emerald-300">
          <Award className="h-4 w-4" aria-hidden />
          {t.detail.sections.noBlockers}
        </p>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-3">
      <SectionTitle icon={AlertTriangle} title={t.detail.sections.blockers} />
      <div className="flex flex-col gap-2">
        {project.blockers.map((blocker) => (
          <div
            key={blocker.id}
            className={`flex items-start gap-3 rounded-md border p-3 ${SEVERITY_STYLES[blocker.severity]}`}
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">
                {t.detail.severity[blocker.severity]} {t.detail.sections.severityLabel}
              </p>
              <p className="text-sm">{blocker.description}</p>
              <p className="text-[11px] text-ford-text-dim">
                {t.detail.sections.raisedOn} {formatDate(blocker.raisedAt, locale)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const SEVERITY_STYLES: Record<'low' | 'medium' | 'high', string> = {
  low: 'border-ford-border bg-ford-surface text-ford-text-muted',
  medium: 'border-[#f59e0b]/40 bg-[#f59e0b]/10 text-[#fde68a]',
  high: 'border-[#e11d48]/40 bg-[#e11d48]/10 text-[#fda4af]',
};

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <p className="text-[10px] font-semibold tracking-wider text-ford-text-dim uppercase">
        {label}
      </p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
