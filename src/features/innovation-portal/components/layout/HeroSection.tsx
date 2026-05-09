'use client';

import { Bot, DollarSign, Rocket, TrendingUp } from 'lucide-react';
import { ProjectCategory, ProjectStatus } from '../../enums/portfolio-enums';
import { useT } from '../../i18n/I18nProvider';
import type { InnovationProject } from '../../types/portfolio-types';
import { formatUsd, sumAnnualUsdImpact, sumMonthlyHoursSaved } from '../../utils/impact-utils';
import { MetricCard } from '../common/MetricCard';

interface HeroSectionProps {
  projects: InnovationProject[];
}

export function HeroSection({ projects }: HeroSectionProps) {
  const t = useT();
  const total = projects.length;
  const inProduction = projects.filter((p) => p.status === ProjectStatus.DEPLOYED).length;
  const aiInitiatives = projects.filter((p) => p.category === ProjectCategory.AI).length;
  const totalImpact = sumAnnualUsdImpact(projects.flatMap((p) => p.impact));
  const totalHoursSaved = sumMonthlyHoursSaved(projects.flatMap((p) => p.impact));

  return (
    <section className="surface-card relative overflow-hidden p-6 sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ford-accent/12 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-ford-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ford-accent/30 bg-ford-accent/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-ford-accent uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-ford-accent opacity-75 health-pulse" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ford-accent" />
            </span>
            {t.hero.livePill}
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.hero.title}</h2>
          <p className="max-w-3xl text-sm text-ford-text-muted sm:text-base">
            {t.hero.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label={t.hero.kpis.tracked}
            value={total}
            hint={t.hero.kpis.trackedHint}
            icon={TrendingUp}
            iconColor="text-[#bfdbfe]"
            iconBg="bg-[#3b82f6]/15 ring-[#3b82f6]/30"
          />
          <MetricCard
            label={t.hero.kpis.inProduction}
            value={inProduction}
            hint={t.hero.kpis.inProductionHint}
            icon={Rocket}
            iconColor="text-[#a7f3d0]"
            iconBg="bg-[#10b981]/15 ring-[#10b981]/30"
          />
          <MetricCard
            label={t.hero.kpis.ai}
            value={aiInitiatives}
            hint={t.hero.kpis.aiHint}
            icon={Bot}
            iconColor="text-[#e9d5ff]"
            iconBg="bg-[#a855f7]/15 ring-[#a855f7]/30"
          />
          <MetricCard
            label={t.hero.kpis.impact}
            value={formatUsd(totalImpact)}
            hint={t.hero.kpis.impactHint(totalHoursSaved.toLocaleString('en-US'))}
            icon={DollarSign}
            iconColor="text-[#fde68a]"
            iconBg="bg-[#f59e0b]/15 ring-[#f59e0b]/30"
          />
        </div>
      </div>
    </section>
  );
}
