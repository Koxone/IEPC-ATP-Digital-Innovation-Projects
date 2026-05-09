'use client';

import { Filter, Search, X } from 'lucide-react';
import { ProjectCategory, ProjectStatus, ProjectType } from '../../enums/portfolio-enums';
import { useT } from '../../i18n/I18nProvider';

export interface PortfolioFilters {
  search: string;
  category: ProjectCategory | 'ALL';
  status: ProjectStatus | 'ALL';
  type: ProjectType | 'ALL';
}

interface FiltersBarProps {
  filters: PortfolioFilters;
  onChange: (next: PortfolioFilters) => void;
  totalShown: number;
  totalProjects: number;
}

export function FiltersBar({ filters, onChange, totalShown, totalProjects }: FiltersBarProps) {
  const t = useT();
  const hasActive =
    filters.search.length > 0 ||
    filters.category !== 'ALL' ||
    filters.status !== 'ALL' ||
    filters.type !== 'ALL';

  const update = <K extends keyof PortfolioFilters>(
    key: K,
    value: PortfolioFilters[K],
  ): void => {
    onChange({ ...filters, [key]: value });
  };

  const clear = (): void =>
    onChange({ search: '', category: 'ALL', status: 'ALL', type: 'ALL' });

  return (
    <section className="surface-card flex flex-col gap-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase">
          <Filter className="h-3.5 w-3.5 text-ford-accent" aria-hidden />
          {t.filters.title}
        </div>
        <div className="flex items-center gap-3 text-xs text-ford-text-muted">
          <span>{t.filters.shownLabel(totalShown, totalProjects)}</span>
          {hasActive && (
            <button
              type="button"
              onClick={clear}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-ford-border bg-ford-surface px-2 py-1 text-[11px] font-semibold text-ford-text-muted transition hover:border-ford-border-strong hover:text-white"
            >
              <X className="h-3 w-3" aria-hidden />
              {t.filters.clear}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1.5 text-xs">
          <span className="text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase">
            {t.filters.search.label}
          </span>
          <span className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-ford-text-dim"
              aria-hidden
            />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => update('search', e.target.value)}
              placeholder={t.filters.search.placeholder}
              className="input-base w-full px-8 py-2 text-sm placeholder:text-ford-text-faint"
            />
          </span>
        </label>

        <SelectField
          label={t.filters.category}
          value={filters.category}
          onChange={(value) => update('category', value as PortfolioFilters['category'])}
          options={[
            { value: 'ALL', label: t.filters.allCategories },
            ...Object.values(ProjectCategory).map((c) => ({
              value: c,
              label: t.enums.projectCategory[c],
            })),
          ]}
        />

        <SelectField
          label={t.filters.status}
          value={filters.status}
          onChange={(value) => update('status', value as PortfolioFilters['status'])}
          options={[
            { value: 'ALL', label: t.filters.allStatuses },
            ...Object.values(ProjectStatus).map((s) => ({
              value: s,
              label: t.enums.projectStatus[s],
            })),
          ]}
        />

        <SelectField
          label={t.filters.type}
          value={filters.type}
          onChange={(value) => update('type', value as PortfolioFilters['type'])}
          options={[
            { value: 'ALL', label: t.filters.allTypes },
            ...Object.values(ProjectType).map((tp) => ({
              value: tp,
              label: t.enums.projectType[tp],
            })),
          ]}
        />
      </div>
    </section>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-xs">
      <span className="text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base cursor-pointer appearance-none px-3 py-2 text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-ford-sidebar text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
