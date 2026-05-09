import type {
  ImpactUnit,
  MilestoneStatus,
  ProjectCategory,
  ProjectLinkType,
  ProjectPriority,
  ProjectStatus,
  ProjectType,
} from '../enums/portfolio-enums';

/**
 * A single milestone inside a project's roadmap. Dates are ISO strings so
 * they can be safely serialized into the data file.
 */
export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: MilestoneStatus;
  completedDate?: string;
}

/**
 * One quantifiable impact metric for a project. The combination of
 * `value` + `unit` lets the UI render "$240K USD / year" or
 * "1,200 users" without coupling formatting to the data.
 */
export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  unit: ImpactUnit;
  detail?: string;
}

/**
 * External link tied to the project (deployment URL, repo, etc).
 */
export interface ProjectLink {
  id: string;
  type: ProjectLinkType;
  label: string;
  url: string;
}

/**
 * Outstanding blocker reported by the team. Surfaced in the executive
 * detail view so leadership can unblock work.
 */
export interface Blocker {
  id: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  raisedAt: string;
}

/**
 * The full executive view of a single initiative.
 */
export interface InnovationProject {
  id: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;

  category: ProjectCategory;
  type: ProjectType;
  status: ProjectStatus;
  priority: ProjectPriority;

  /** 0-100 overall delivery progress. */
  progress: number;

  owner: string;
  team: string[];
  sponsor: string;

  techStack: string[];

  links: ProjectLink[];
  impact: ImpactMetric[];
  milestones: Milestone[];

  kickoffDate: string;
  expectedGoLiveDate?: string;
  lastUpdateDate: string;

  nextSteps: string[];
  blockers: Blocker[];
}
