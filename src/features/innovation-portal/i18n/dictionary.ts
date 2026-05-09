import {
  ImpactUnit,
  MilestoneStatus,
  ProjectCategory,
  ProjectLinkType,
  ProjectPriority,
  ProjectStatus,
  ProjectType,
} from '../enums/portfolio-enums';
import { Locale } from './locale';

/**
 * Single source of truth for every visible string in the portal. The
 * dictionary keeps enum-driven labels next to free-form UI copy so a
 * translator can update both without touching React code.
 */
export interface Dictionary {
  header: {
    eyebrow: string;
    title: string;
    initiativesTracked: string;
    inProductionShort: string;
  };
  hero: {
    livePill: string;
    title: string;
    description: string;
    kpis: {
      tracked: string;
      trackedHint: string;
      inProduction: string;
      inProductionHint: string;
      ai: string;
      aiHint: string;
      impact: string;
      impactHint: (hours: string) => string;
    };
  };
  filters: {
    title: string;
    shownLabel: (shown: number, total: number) => string;
    clear: string;
    search: {
      label: string;
      placeholder: string;
    };
    category: string;
    status: string;
    type: string;
    allCategories: string;
    allStatuses: string;
    allTypes: string;
  };
  categoryMix: {
    title: string;
  };
  initiatives: {
    title: string;
    hint: string;
  };
  card: {
    annualImpact: string;
    liveBadge: string;
    pendingUrlBadge: string;
    updatedPrefix: string;
  };
  empty: {
    title: string;
    description: string;
  };
  detail: {
    closeAria: string;
    sections: {
      about: string;
      delivery: string;
      kickoff: string;
      expectedGoLive: string;
      lastUpdate: string;
      tbd: string;
      impact: string;
      ownership: string;
      owner: string;
      team: string;
      sponsor: string;
      tech: string;
      links: string;
      pendingUrl: string;
      roadmap: string;
      roadmapHint: string;
      nextSteps: string;
      blockers: string;
      noBlockers: string;
      severityLabel: string;
      raisedOn: string;
    };
    severity: Record<'low' | 'medium' | 'high', string>;
  };
  roadmap: {
    eyebrow: string;
    title: string;
    description: string;
  };
  milestones: {
    completedOn: (date: string) => string;
    targetOn: (date: string, relative: string) => string;
  };
  progressBar: {
    label: string;
  };
  priority: {
    suffix: string;
  };
  footer: {
    titleSuffix: string;
    rights: string;
  };
  language: {
    label: string;
  };
  enums: {
    projectStatus: Record<ProjectStatus, string>;
    projectCategory: Record<ProjectCategory, string>;
    projectType: Record<ProjectType, string>;
    projectPriority: Record<ProjectPriority, string>;
    milestoneStatus: Record<MilestoneStatus, string>;
    projectLink: Record<ProjectLinkType, string>;
    impactUnit: Record<ImpactUnit, string>;
  };
  dates: {
    today: string;
    tomorrow: string;
    yesterday: string;
    inDays: (days: number) => string;
    daysAgo: (days: number) => string;
    inWeeks: (weeks: number) => string;
    weeksAgo: (weeks: number) => string;
  };
  impact: {
    perYearSuffix: string;
    perMonthHoursSuffix: string;
    usersSuffix: string;
    daysSuffix: string;
  };
}

const en: Dictionary = {
  header: {
    eyebrow: 'IEPC · Executive view',
    title: 'Digital Innovation Portfolio',
    initiativesTracked: 'initiatives tracked',
    inProductionShort: 'in production',
  },
  hero: {
    livePill: 'Live portfolio overview',
    title: 'Every digital initiative across IEPC, in one place.',
    description:
      'A centralized executive view of every active software, AI and digital transformation initiative — including status, impact, ownership, deployment links, roadmap and delivery progress. Built for leadership to see what is shipping, what is at risk and where to invest next.',
    kpis: {
      tracked: 'Initiatives tracked',
      trackedHint: 'Active across all categories',
      inProduction: 'In production',
      inProductionHint: 'Already shipping value',
      ai: 'AI initiatives',
      aiHint: 'Models in pilot or production',
      impact: 'Annual portfolio impact',
      impactHint: (hours) => `+${hours} hrs / month saved`,
    },
  },
  filters: {
    title: 'Filter portfolio',
    shownLabel: (shown, total) => `${shown} / ${total} initiatives shown`,
    clear: 'Clear filters',
    search: {
      label: 'Search',
      placeholder: 'Project, owner, tech…',
    },
    category: 'Category',
    status: 'Status',
    type: 'Type',
    allCategories: 'All categories',
    allStatuses: 'All statuses',
    allTypes: 'All types',
  },
  categoryMix: {
    title: 'Portfolio mix',
  },
  initiatives: {
    title: 'Initiatives',
    hint: 'Click any card to open its full executive view.',
  },
  card: {
    annualImpact: 'Annual impact',
    liveBadge: 'live',
    pendingUrlBadge: 'Pending URL',
    updatedPrefix: 'Updated',
  },
  empty: {
    title: 'No initiatives match the current filters.',
    description:
      'Try clearing a filter or searching for an owner, technology or project name.',
  },
  detail: {
    closeAria: 'Close detail panel',
    sections: {
      about: 'About this initiative',
      delivery: 'Delivery',
      kickoff: 'Kickoff',
      expectedGoLive: 'Expected go-live',
      lastUpdate: 'Last update',
      tbd: 'TBD',
      impact: 'Business impact',
      ownership: 'Ownership',
      owner: 'Owner',
      team: 'Team',
      sponsor: 'Executive sponsor',
      tech: 'Tech stack',
      links: 'Links',
      pendingUrl: 'Pending URL',
      roadmap: 'Roadmap',
      roadmapHint: 'From kickoff to expected go-live.',
      nextSteps: 'Next steps',
      blockers: 'Blockers',
      noBlockers: 'No blockers reported.',
      severityLabel: 'severity',
      raisedOn: 'Raised',
    },
    severity: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
    },
  },
  roadmap: {
    eyebrow: 'Portfolio roadmap',
    title: 'Upcoming milestones across IEPC',
    description:
      'Next 12 milestones from every active initiative, grouped by month. Click any milestone to open the project.',
  },
  milestones: {
    completedOn: (date) => `Completed ${date}`,
    targetOn: (date, relative) => `Target ${date} · ${relative}`,
  },
  progressBar: {
    label: 'Delivery progress',
  },
  priority: {
    suffix: 'priority',
  },
  footer: {
    titleSuffix: 'Maintained by IEPC Engineering',
    rights: '© {year} Ford Motor Company · Internal use only',
  },
  language: {
    label: 'Language',
  },
  enums: {
    projectStatus: {
      [ProjectStatus.IDEATION]: 'Ideation',
      [ProjectStatus.PLANNING]: 'Planning',
      [ProjectStatus.IN_PROGRESS]: 'In Progress',
      [ProjectStatus.IN_PILOT]: 'In Pilot',
      [ProjectStatus.DEPLOYED]: 'Deployed',
      [ProjectStatus.PAUSED]: 'Paused',
      [ProjectStatus.COMPLETED]: 'Completed',
    },
    projectCategory: {
      [ProjectCategory.SOFTWARE]: 'Software',
      [ProjectCategory.AI]: 'AI / ML',
      [ProjectCategory.DIGITAL_TRANSFORMATION]: 'Digital Transformation',
      [ProjectCategory.DATA_ANALYTICS]: 'Data & Analytics',
      [ProjectCategory.AUTOMATION]: 'Automation',
    },
    projectType: {
      [ProjectType.POC]: 'Proof of Concept',
      [ProjectType.PILOT]: 'Pilot',
      [ProjectType.PRODUCTION]: 'Production',
      [ProjectType.INTERNAL_TOOL]: 'Internal Tool',
      [ProjectType.RESEARCH]: 'Research',
    },
    projectPriority: {
      [ProjectPriority.LOW]: 'Low',
      [ProjectPriority.MEDIUM]: 'Medium',
      [ProjectPriority.HIGH]: 'High',
      [ProjectPriority.STRATEGIC]: 'Strategic',
    },
    milestoneStatus: {
      [MilestoneStatus.PENDING]: 'Pending',
      [MilestoneStatus.IN_PROGRESS]: 'In Progress',
      [MilestoneStatus.COMPLETED]: 'Completed',
      [MilestoneStatus.AT_RISK]: 'At Risk',
    },
    projectLink: {
      [ProjectLinkType.DEPLOYMENT]: 'Live deployment',
      [ProjectLinkType.REPOSITORY]: 'Source repository',
      [ProjectLinkType.DEMO]: 'Demo',
      [ProjectLinkType.DOCUMENTATION]: 'Documentation',
      [ProjectLinkType.DASHBOARD]: 'Dashboard',
    },
    impactUnit: {
      [ImpactUnit.USD_PER_YEAR]: 'USD / year',
      [ImpactUnit.HOURS_PER_MONTH]: 'hours / month',
      [ImpactUnit.USERS]: 'users',
      [ImpactUnit.PERCENT]: '%',
      [ImpactUnit.DAYS_REDUCED]: 'days reduced',
      [ImpactUnit.COUNT]: 'units',
    },
  },
  dates: {
    today: 'Today',
    tomorrow: 'Tomorrow',
    yesterday: 'Yesterday',
    inDays: (days) => `In ${days} days`,
    daysAgo: (days) => `${days} days ago`,
    inWeeks: (weeks) => `In ${weeks} weeks`,
    weeksAgo: (weeks) => `${weeks} weeks ago`,
  },
  impact: {
    perYearSuffix: '/ yr',
    perMonthHoursSuffix: 'hrs / mo',
    usersSuffix: 'users',
    daysSuffix: 'days',
  },
};

const es: Dictionary = {
  header: {
    eyebrow: 'IEPC · Vista ejecutiva',
    title: 'Portafolio de Innovación Digital',
    initiativesTracked: 'iniciativas en seguimiento',
    inProductionShort: 'en producción',
  },
  hero: {
    livePill: 'Vista en vivo del portafolio',
    title: 'Toda la innovación digital de IEPC, en un solo lugar.',
    description:
      'Una vista ejecutiva centralizada de cada iniciativa activa de software, IA y transformación digital — incluyendo estado, impacto, responsables, links de despliegue, hoja de ruta y avance de entrega. Construida para que la dirección vea qué está saliendo, qué está en riesgo y dónde invertir a continuación.',
    kpis: {
      tracked: 'Iniciativas en seguimiento',
      trackedHint: 'Activas en todas las categorías',
      inProduction: 'En producción',
      inProductionHint: 'Ya generando valor',
      ai: 'Iniciativas de IA',
      aiHint: 'Modelos en piloto o producción',
      impact: 'Impacto anual del portafolio',
      impactHint: (hours) => `+${hours} hrs / mes ahorradas`,
    },
  },
  filters: {
    title: 'Filtrar portafolio',
    shownLabel: (shown, total) => `${shown} / ${total} iniciativas mostradas`,
    clear: 'Limpiar filtros',
    search: {
      label: 'Buscar',
      placeholder: 'Proyecto, responsable, tecnología…',
    },
    category: 'Categoría',
    status: 'Estado',
    type: 'Tipo',
    allCategories: 'Todas las categorías',
    allStatuses: 'Todos los estados',
    allTypes: 'Todos los tipos',
  },
  categoryMix: {
    title: 'Mezcla del portafolio',
  },
  initiatives: {
    title: 'Iniciativas',
    hint: 'Haz clic en cualquier tarjeta para abrir su vista ejecutiva completa.',
  },
  card: {
    annualImpact: 'Impacto anual',
    liveBadge: 'en vivo',
    pendingUrlBadge: 'URL pendiente',
    updatedPrefix: 'Actualizado',
  },
  empty: {
    title: 'Ninguna iniciativa coincide con los filtros actuales.',
    description:
      'Intenta limpiar un filtro o buscar por responsable, tecnología o nombre del proyecto.',
  },
  detail: {
    closeAria: 'Cerrar panel de detalle',
    sections: {
      about: 'Acerca de esta iniciativa',
      delivery: 'Entrega',
      kickoff: 'Inicio',
      expectedGoLive: 'Salida en vivo estimada',
      lastUpdate: 'Última actualización',
      tbd: 'Por definir',
      impact: 'Impacto al negocio',
      ownership: 'Responsables',
      owner: 'Owner',
      team: 'Equipo',
      sponsor: 'Sponsor ejecutivo',
      tech: 'Stack tecnológico',
      links: 'Enlaces',
      pendingUrl: 'URL pendiente',
      roadmap: 'Hoja de ruta',
      roadmapHint: 'Desde el inicio hasta la salida en vivo estimada.',
      nextSteps: 'Próximos pasos',
      blockers: 'Bloqueos',
      noBlockers: 'Sin bloqueos reportados.',
      severityLabel: 'severidad',
      raisedOn: 'Reportado',
    },
    severity: {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta',
    },
  },
  roadmap: {
    eyebrow: 'Hoja de ruta del portafolio',
    title: 'Próximos hitos de IEPC',
    description:
      'Los próximos 12 hitos de cada iniciativa activa, agrupados por mes. Haz clic en cualquier hito para abrir su proyecto.',
  },
  milestones: {
    completedOn: (date) => `Completado el ${date}`,
    targetOn: (date, relative) => `Objetivo ${date} · ${relative}`,
  },
  progressBar: {
    label: 'Avance de entrega',
  },
  priority: {
    suffix: 'prioridad',
  },
  footer: {
    titleSuffix: 'Mantenido por IEPC Engineering',
    rights: '© {year} Ford Motor Company · Uso interno únicamente',
  },
  language: {
    label: 'Idioma',
  },
  enums: {
    projectStatus: {
      [ProjectStatus.IDEATION]: 'Ideación',
      [ProjectStatus.PLANNING]: 'Planeación',
      [ProjectStatus.IN_PROGRESS]: 'En Progreso',
      [ProjectStatus.IN_PILOT]: 'En Piloto',
      [ProjectStatus.DEPLOYED]: 'Desplegado',
      [ProjectStatus.PAUSED]: 'En Pausa',
      [ProjectStatus.COMPLETED]: 'Completado',
    },
    projectCategory: {
      [ProjectCategory.SOFTWARE]: 'Software',
      [ProjectCategory.AI]: 'IA / ML',
      [ProjectCategory.DIGITAL_TRANSFORMATION]: 'Transformación Digital',
      [ProjectCategory.DATA_ANALYTICS]: 'Datos y Analítica',
      [ProjectCategory.AUTOMATION]: 'Automatización',
    },
    projectType: {
      [ProjectType.POC]: 'Prueba de Concepto',
      [ProjectType.PILOT]: 'Piloto',
      [ProjectType.PRODUCTION]: 'Producción',
      [ProjectType.INTERNAL_TOOL]: 'Herramienta Interna',
      [ProjectType.RESEARCH]: 'Investigación',
    },
    projectPriority: {
      [ProjectPriority.LOW]: 'Baja',
      [ProjectPriority.MEDIUM]: 'Media',
      [ProjectPriority.HIGH]: 'Alta',
      [ProjectPriority.STRATEGIC]: 'Estratégica',
    },
    milestoneStatus: {
      [MilestoneStatus.PENDING]: 'Pendiente',
      [MilestoneStatus.IN_PROGRESS]: 'En Progreso',
      [MilestoneStatus.COMPLETED]: 'Completado',
      [MilestoneStatus.AT_RISK]: 'En Riesgo',
    },
    projectLink: {
      [ProjectLinkType.DEPLOYMENT]: 'Despliegue en vivo',
      [ProjectLinkType.REPOSITORY]: 'Repositorio',
      [ProjectLinkType.DEMO]: 'Demo',
      [ProjectLinkType.DOCUMENTATION]: 'Documentación',
      [ProjectLinkType.DASHBOARD]: 'Dashboard',
    },
    impactUnit: {
      [ImpactUnit.USD_PER_YEAR]: 'USD / año',
      [ImpactUnit.HOURS_PER_MONTH]: 'horas / mes',
      [ImpactUnit.USERS]: 'usuarios',
      [ImpactUnit.PERCENT]: '%',
      [ImpactUnit.DAYS_REDUCED]: 'días reducidos',
      [ImpactUnit.COUNT]: 'unidades',
    },
  },
  dates: {
    today: 'Hoy',
    tomorrow: 'Mañana',
    yesterday: 'Ayer',
    inDays: (days) => `En ${days} días`,
    daysAgo: (days) => `Hace ${days} días`,
    inWeeks: (weeks) => `En ${weeks} semanas`,
    weeksAgo: (weeks) => `Hace ${weeks} semanas`,
  },
  impact: {
    perYearSuffix: '/ año',
    perMonthHoursSuffix: 'hrs / mes',
    usersSuffix: 'usuarios',
    daysSuffix: 'días',
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = {
  [Locale.EN]: en,
  [Locale.ES]: es,
};
