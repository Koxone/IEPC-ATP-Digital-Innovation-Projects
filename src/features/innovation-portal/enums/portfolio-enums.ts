/**
 * Project lifecycle status. Drives the colour of the status badge and
 * filters in the executive view.
 */
export enum ProjectStatus {
  IDEATION = 'IDEATION',
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_PILOT = 'IN_PILOT',
  DEPLOYED = 'DEPLOYED',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  [ProjectStatus.IDEATION]: 'Ideation',
  [ProjectStatus.PLANNING]: 'Planning',
  [ProjectStatus.IN_PROGRESS]: 'In Progress',
  [ProjectStatus.IN_PILOT]: 'In Pilot',
  [ProjectStatus.DEPLOYED]: 'Deployed',
  [ProjectStatus.PAUSED]: 'Paused',
  [ProjectStatus.COMPLETED]: 'Completed',
};

/**
 * Top-level portfolio category. Used for grouping, KPI breakdowns and
 * the category filter.
 */
export enum ProjectCategory {
  SOFTWARE = 'SOFTWARE',
  AI = 'AI',
  DIGITAL_TRANSFORMATION = 'DIGITAL_TRANSFORMATION',
  DATA_ANALYTICS = 'DATA_ANALYTICS',
  AUTOMATION = 'AUTOMATION',
}

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  [ProjectCategory.SOFTWARE]: 'Software',
  [ProjectCategory.AI]: 'AI / ML',
  [ProjectCategory.DIGITAL_TRANSFORMATION]: 'Digital Transformation',
  [ProjectCategory.DATA_ANALYTICS]: 'Data & Analytics',
  [ProjectCategory.AUTOMATION]: 'Automation',
};

/**
 * Where the initiative sits in its maturity curve. Helps executives know
 * whether they are looking at a throwaway prototype or production-grade
 * software.
 */
export enum ProjectType {
  POC = 'POC',
  PILOT = 'PILOT',
  PRODUCTION = 'PRODUCTION',
  INTERNAL_TOOL = 'INTERNAL_TOOL',
  RESEARCH = 'RESEARCH',
}

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  [ProjectType.POC]: 'Proof of Concept',
  [ProjectType.PILOT]: 'Pilot',
  [ProjectType.PRODUCTION]: 'Production',
  [ProjectType.INTERNAL_TOOL]: 'Internal Tool',
  [ProjectType.RESEARCH]: 'Research',
};

/**
 * Strategic priority. Higher priority items are highlighted in the hero
 * and the portfolio roadmap.
 */
export enum ProjectPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  STRATEGIC = 'STRATEGIC',
}

export const PROJECT_PRIORITY_LABELS: Record<ProjectPriority, string> = {
  [ProjectPriority.LOW]: 'Low',
  [ProjectPriority.MEDIUM]: 'Medium',
  [ProjectPriority.HIGH]: 'High',
  [ProjectPriority.STRATEGIC]: 'Strategic',
};

/**
 * Per-milestone status for the roadmap timeline.
 */
export enum MilestoneStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  AT_RISK = 'AT_RISK',
}

export const MILESTONE_STATUS_LABELS: Record<MilestoneStatus, string> = {
  [MilestoneStatus.PENDING]: 'Pending',
  [MilestoneStatus.IN_PROGRESS]: 'In Progress',
  [MilestoneStatus.COMPLETED]: 'Completed',
  [MilestoneStatus.AT_RISK]: 'At Risk',
};

/**
 * Unit of impact reported per metric. Lets the UI render the value with
 * the right symbol and tooltip.
 */
export enum ImpactUnit {
  USD_PER_YEAR = 'USD_PER_YEAR',
  HOURS_PER_MONTH = 'HOURS_PER_MONTH',
  USERS = 'USERS',
  PERCENT = 'PERCENT',
  DAYS_REDUCED = 'DAYS_REDUCED',
  COUNT = 'COUNT',
}

export const IMPACT_UNIT_LABELS: Record<ImpactUnit, string> = {
  [ImpactUnit.USD_PER_YEAR]: 'USD / year',
  [ImpactUnit.HOURS_PER_MONTH]: 'hours / month',
  [ImpactUnit.USERS]: 'users',
  [ImpactUnit.PERCENT]: '%',
  [ImpactUnit.DAYS_REDUCED]: 'days reduced',
  [ImpactUnit.COUNT]: 'units',
};

/**
 * Type of external link surfaced on a project card / detail panel.
 */
export enum ProjectLinkType {
  DEPLOYMENT = 'DEPLOYMENT',
  REPOSITORY = 'REPOSITORY',
  DEMO = 'DEMO',
  DOCUMENTATION = 'DOCUMENTATION',
  DASHBOARD = 'DASHBOARD',
}

export const PROJECT_LINK_LABELS: Record<ProjectLinkType, string> = {
  [ProjectLinkType.DEPLOYMENT]: 'Live deployment',
  [ProjectLinkType.REPOSITORY]: 'Source repository',
  [ProjectLinkType.DEMO]: 'Demo',
  [ProjectLinkType.DOCUMENTATION]: 'Documentation',
  [ProjectLinkType.DASHBOARD]: 'Dashboard',
};
