/**
 * Project lifecycle status. Drives the colour of the status badge and
 * filters in the executive view. Display labels live in the i18n
 * dictionary (see `i18n/dictionary.ts`).
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

/**
 * Where the initiative sits in its maturity curve.
 */
export enum ProjectType {
  POC = 'POC',
  PILOT = 'PILOT',
  PRODUCTION = 'PRODUCTION',
  INTERNAL_TOOL = 'INTERNAL_TOOL',
  RESEARCH = 'RESEARCH',
}

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

/**
 * Per-milestone status for the roadmap timeline.
 */
export enum MilestoneStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  AT_RISK = 'AT_RISK',
}

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
