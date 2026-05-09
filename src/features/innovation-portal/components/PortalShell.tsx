'use client';

import { Briefcase } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PROJECTS } from '../data/projects';
import { ProjectStatus } from '../enums/portfolio-enums';
import { FiltersBar, type PortfolioFilters } from './filters/FiltersBar';
import { CategoryDistribution } from './filters/CategoryDistribution';
import { HeroSection } from './layout/HeroSection';
import { PortalFooter } from './layout/PortalFooter';
import { PortalHeader } from './layout/PortalHeader';
import { PortfolioRoadmap } from './layout/PortfolioRoadmap';
import { ProjectDetailPanel } from './projects/ProjectDetailPanel';
import { ProjectGrid } from './projects/ProjectGrid';
import { SectionTitle } from './common/SectionTitle';

const INITIAL_FILTERS: PortfolioFilters = {
  search: '',
  category: 'ALL',
  status: 'ALL',
  type: 'ALL',
};

export function PortalShell() {
  const [filters, setFilters] = useState<PortfolioFilters>(INITIAL_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      if (filters.category !== 'ALL' && project.category !== filters.category) return false;
      if (filters.status !== 'ALL' && project.status !== filters.status) return false;
      if (filters.type !== 'ALL' && project.type !== filters.type) return false;
      if (search.length === 0) return true;
      const haystack = [
        project.name,
        project.shortName,
        project.description,
        project.longDescription,
        project.owner,
        project.sponsor,
        project.team.join(' '),
        project.techStack.join(' '),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(search);
    });
  }, [filters]);

  const totalInProduction = useMemo(
    () => PROJECTS.filter((p) => p.status === ProjectStatus.DEPLOYED).length,
    [],
  );

  const selectedProject = selectedId
    ? PROJECTS.find((p) => p.id === selectedId) ?? null
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-ford-bg text-ford-text">
      <PortalHeader totalProjects={PROJECTS.length} inProductionCount={totalInProduction} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-6 py-6">
        <HeroSection projects={PROJECTS} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <FiltersBar
            filters={filters}
            onChange={setFilters}
            totalShown={filteredProjects.length}
            totalProjects={PROJECTS.length}
          />
          <CategoryDistribution projects={PROJECTS} />
        </div>

        <section className="flex flex-col gap-4">
          <SectionTitle
            icon={Briefcase}
            title="Initiatives"
            hint="Click any card to open its full executive view."
          />
          <ProjectGrid
            projects={filteredProjects}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </section>

        <PortfolioRoadmap projects={PROJECTS} onSelectProject={setSelectedId} />
      </main>

      <PortalFooter />

      <ProjectDetailPanel project={selectedProject} onClose={() => setSelectedId(null)} />
    </div>
  );
}
