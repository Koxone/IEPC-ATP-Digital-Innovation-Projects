'use client';

import type { InnovationProject } from '../../types/portfolio-types';
import { EmptyState } from '../common/EmptyState';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  projects: InnovationProject[];
  selectedId: string | null;
  onSelect: (projectId: string) => void;
}

export function ProjectGrid({ projects, selectedId, onSelect }: ProjectGridProps) {
  if (projects.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isSelected={selectedId === project.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
