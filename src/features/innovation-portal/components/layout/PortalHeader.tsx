'use client';

import { ChevronRight, LayoutDashboard } from 'lucide-react';
import { useT } from '../../i18n/I18nProvider';
import { FordOvalLogo } from '../common/FordOvalLogo';
import { LanguageToggle } from '../common/LanguageToggle';

interface PortalHeaderProps {
  totalProjects: number;
  inProductionCount: number;
}

export function PortalHeader({ totalProjects, inProductionCount }: PortalHeaderProps) {
  const t = useT();
  return (
    <header className="sticky top-0 z-30 border-b border-ford-border bg-ford-sidebar/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-3">
          <FordOvalLogo className="h-9 w-14" />
          <div className="hidden h-6 w-px bg-ford-border sm:block" />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-ford-text-dim uppercase">
              {t.header.eyebrow}
            </span>
            <h1 className="text-sm font-semibold text-white">{t.header.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-xs text-ford-text-muted md:flex">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-ford-border bg-ford-surface px-2.5 py-1.5 text-ford-text">
              <LayoutDashboard className="h-3.5 w-3.5 text-ford-accent" aria-hidden />
              <span className="font-semibold tabular-nums">{totalProjects}</span>
              <span className="text-ford-text-dim">{t.header.initiativesTracked}</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-ford-text-dim" aria-hidden />
            <span className="text-ford-text-muted">
              <span className="font-semibold text-white tabular-nums">{inProductionCount}</span>{' '}
              {t.header.inProductionShort}
            </span>
          </div>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
