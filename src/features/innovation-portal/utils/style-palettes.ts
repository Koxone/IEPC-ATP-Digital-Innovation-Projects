import {
  MilestoneStatus,
  ProjectCategory,
  ProjectPriority,
  ProjectStatus,
  ProjectType,
} from '../enums/portfolio-enums';

interface BadgePalette {
  container: string;
  text: string;
  iconColor: string;
  ring?: string;
  accentBar: string;
}

export const STATUS_PALETTE: Record<ProjectStatus, BadgePalette> = {
  [ProjectStatus.IDEATION]: {
    container: 'border-[#7a8492]/40 bg-[#7a8492]/12 text-[#cbd5e1]',
    text: 'text-[#cbd5e1]',
    iconColor: 'text-[#cbd5e1]',
    ring: 'ring-[#7a8492]/40',
    accentBar: 'bg-[#7a8492]',
  },
  [ProjectStatus.PLANNING]: {
    container: 'border-[#a855f7]/40 bg-[#a855f7]/12 text-[#e9d5ff]',
    text: 'text-[#e9d5ff]',
    iconColor: 'text-[#e9d5ff]',
    ring: 'ring-[#a855f7]/40',
    accentBar: 'bg-[#a855f7]',
  },
  [ProjectStatus.IN_PROGRESS]: {
    container: 'border-[#3b82f6]/40 bg-[#3b82f6]/12 text-[#bfdbfe]',
    text: 'text-[#bfdbfe]',
    iconColor: 'text-[#bfdbfe]',
    ring: 'ring-[#3b82f6]/40',
    accentBar: 'bg-[#3b82f6]',
  },
  [ProjectStatus.IN_PILOT]: {
    container: 'border-[#06b6d4]/40 bg-[#06b6d4]/12 text-[#a5f3fc]',
    text: 'text-[#a5f3fc]',
    iconColor: 'text-[#a5f3fc]',
    ring: 'ring-[#06b6d4]/40',
    accentBar: 'bg-[#06b6d4]',
  },
  [ProjectStatus.DEPLOYED]: {
    container: 'border-[#10b981]/40 bg-[#10b981]/12 text-[#a7f3d0]',
    text: 'text-[#a7f3d0]',
    iconColor: 'text-[#a7f3d0]',
    ring: 'ring-[#10b981]/40',
    accentBar: 'bg-[#10b981]',
  },
  [ProjectStatus.PAUSED]: {
    container: 'border-[#f59e0b]/40 bg-[#f59e0b]/12 text-[#fde68a]',
    text: 'text-[#fde68a]',
    iconColor: 'text-[#fde68a]',
    ring: 'ring-[#f59e0b]/40',
    accentBar: 'bg-[#f59e0b]',
  },
  [ProjectStatus.COMPLETED]: {
    container: 'border-[#10b981]/30 bg-[#10b981]/8 text-[#86efac]',
    text: 'text-[#86efac]',
    iconColor: 'text-[#86efac]',
    ring: 'ring-[#10b981]/30',
    accentBar: 'bg-[#10b981]',
  },
};

export const CATEGORY_PALETTE: Record<ProjectCategory, BadgePalette> = {
  [ProjectCategory.SOFTWARE]: {
    container: 'border-[#3b82f6]/40 bg-[#3b82f6]/12 text-[#bfdbfe]',
    text: 'text-[#bfdbfe]',
    iconColor: 'text-[#bfdbfe]',
    accentBar: 'bg-[#3b82f6]',
  },
  [ProjectCategory.AI]: {
    container: 'border-[#a855f7]/40 bg-[#a855f7]/12 text-[#e9d5ff]',
    text: 'text-[#e9d5ff]',
    iconColor: 'text-[#e9d5ff]',
    accentBar: 'bg-[#a855f7]',
  },
  [ProjectCategory.DIGITAL_TRANSFORMATION]: {
    container: 'border-[#06b6d4]/40 bg-[#06b6d4]/12 text-[#a5f3fc]',
    text: 'text-[#a5f3fc]',
    iconColor: 'text-[#a5f3fc]',
    accentBar: 'bg-[#06b6d4]',
  },
  [ProjectCategory.DATA_ANALYTICS]: {
    container: 'border-[#10b981]/40 bg-[#10b981]/12 text-[#a7f3d0]',
    text: 'text-[#a7f3d0]',
    iconColor: 'text-[#a7f3d0]',
    accentBar: 'bg-[#10b981]',
  },
  [ProjectCategory.AUTOMATION]: {
    container: 'border-[#f59e0b]/40 bg-[#f59e0b]/12 text-[#fde68a]',
    text: 'text-[#fde68a]',
    iconColor: 'text-[#fde68a]',
    accentBar: 'bg-[#f59e0b]',
  },
};

export const TYPE_PALETTE: Record<ProjectType, BadgePalette> = {
  [ProjectType.POC]: {
    container: 'border-[#a855f7]/30 bg-[#a855f7]/10 text-[#e9d5ff]',
    text: 'text-[#e9d5ff]',
    iconColor: 'text-[#e9d5ff]',
    accentBar: 'bg-[#a855f7]',
  },
  [ProjectType.PILOT]: {
    container: 'border-[#06b6d4]/30 bg-[#06b6d4]/10 text-[#a5f3fc]',
    text: 'text-[#a5f3fc]',
    iconColor: 'text-[#a5f3fc]',
    accentBar: 'bg-[#06b6d4]',
  },
  [ProjectType.PRODUCTION]: {
    container: 'border-[#10b981]/30 bg-[#10b981]/10 text-[#a7f3d0]',
    text: 'text-[#a7f3d0]',
    iconColor: 'text-[#a7f3d0]',
    accentBar: 'bg-[#10b981]',
  },
  [ProjectType.INTERNAL_TOOL]: {
    container: 'border-[#3b82f6]/30 bg-[#3b82f6]/10 text-[#bfdbfe]',
    text: 'text-[#bfdbfe]',
    iconColor: 'text-[#bfdbfe]',
    accentBar: 'bg-[#3b82f6]',
  },
  [ProjectType.RESEARCH]: {
    container: 'border-[#7a8492]/30 bg-[#7a8492]/10 text-[#cbd5e1]',
    text: 'text-[#cbd5e1]',
    iconColor: 'text-[#cbd5e1]',
    accentBar: 'bg-[#7a8492]',
  },
};

export const PRIORITY_PALETTE: Record<ProjectPriority, BadgePalette> = {
  [ProjectPriority.LOW]: {
    container: 'border-ford-border bg-ford-surface text-ford-text-muted',
    text: 'text-ford-text-muted',
    iconColor: 'text-ford-text-dim',
    accentBar: 'bg-[#7a8492]',
  },
  [ProjectPriority.MEDIUM]: {
    container: 'border-[#3b82f6]/35 bg-[#3b82f6]/10 text-[#bfdbfe]',
    text: 'text-[#bfdbfe]',
    iconColor: 'text-[#bfdbfe]',
    accentBar: 'bg-[#3b82f6]',
  },
  [ProjectPriority.HIGH]: {
    container: 'border-[#f59e0b]/40 bg-[#f59e0b]/12 text-[#fde68a]',
    text: 'text-[#fde68a]',
    iconColor: 'text-[#fde68a]',
    accentBar: 'bg-[#f59e0b]',
  },
  [ProjectPriority.STRATEGIC]: {
    container: 'border-[#e11d48]/40 bg-[#e11d48]/12 text-[#fda4af]',
    text: 'text-[#fda4af]',
    iconColor: 'text-[#fda4af]',
    accentBar: 'bg-[#e11d48]',
  },
};

export const MILESTONE_PALETTE: Record<MilestoneStatus, BadgePalette> = {
  [MilestoneStatus.PENDING]: {
    container: 'border-ford-border bg-ford-surface text-ford-text-muted',
    text: 'text-ford-text-muted',
    iconColor: 'text-ford-text-dim',
    accentBar: 'bg-[#7a8492]',
  },
  [MilestoneStatus.IN_PROGRESS]: {
    container: 'border-[#3b82f6]/40 bg-[#3b82f6]/12 text-[#bfdbfe]',
    text: 'text-[#bfdbfe]',
    iconColor: 'text-[#bfdbfe]',
    accentBar: 'bg-[#3b82f6]',
  },
  [MilestoneStatus.COMPLETED]: {
    container: 'border-[#10b981]/40 bg-[#10b981]/12 text-[#a7f3d0]',
    text: 'text-[#a7f3d0]',
    iconColor: 'text-[#a7f3d0]',
    accentBar: 'bg-[#10b981]',
  },
  [MilestoneStatus.AT_RISK]: {
    container: 'border-[#e11d48]/40 bg-[#e11d48]/12 text-[#fda4af]',
    text: 'text-[#fda4af]',
    iconColor: 'text-[#fda4af]',
    accentBar: 'bg-[#e11d48]',
  },
};

/**
 * Tone helper for the linear progress bar based on the current
 * percentage. Mirrors the gradient language used in the tickets app.
 */
export function progressTone(value: number): string {
  if (value >= 100) return 'from-emerald-400 to-emerald-600';
  if (value >= 75) return 'from-cyan-400 to-blue-600';
  if (value >= 50) return 'from-blue-400 to-blue-700';
  if (value >= 25) return 'from-sky-400 to-blue-600';
  return 'from-slate-500 to-slate-700';
}
