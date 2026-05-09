# AGENTS.md — IEPC Internal App Conventions

> **Read this file before generating any code in this repository, or any new repository the user describes as "with the same style as our other projects".**
>
> Owner: Juan De Leon · IEPC Engineering · Ford Motor Company
> Audience: AI coding agents (Cursor, Codex, Claude Code, etc.) building internal Ford / IEPC web apps.

This file is the single source of truth for **design, styles, folder structure and architecture** across every internal Ford / IEPC web app maintained by this team. The user will frequently say:

> "Quiero un proyecto nuevo con los mismos estilos que los que usamos en todos nuestros proyectos."

When they do, you do **not** need to inspect another repo. Use this document.

---

## 0. Starting point — non-negotiable

Every new project **must** begin by cloning the official Ford engineering template:

```bash
git clone https://github.com/ford-innersource/EngineeringFoundations.git <project-name>
cd <project-name>
rm -rf .git
git init
```

The template ships with all approved technology choices, build scripts, linter, formatter and the empty `domain / application / infrastructure / presentation` skeleton. **Never substitute a different starter, never add or remove top-level dependencies on a whim, never re-invent the build system.** This document does not list technologies — they are inherited from the template.

What you do on top of the clone:

1. Replace the template's `src/app/globals.css` with the block in section **2.1**.
2. Update `src/app/layout.tsx` so the `<html>` and `<body>` follow section **2.3**.
3. Build the feature inside the existing `domain / application / infrastructure / presentation` folders following sections **3** and **4**.
4. Verify with the checklist in section **9**.

---

## 1. Brand voice

- **Audience**: internal Ford / IEPC engineering and leadership. Tone is corporate, calm, executive — never playful.
- **Language defaults**: UI copy is in English unless the user asks otherwise. Internal-use disclaimer must always appear in the footer.
- **Identity**: every app shows the Ford oval (section 2.5) and an `IEPC · <subtitle>` eyebrow in the header. Apps are recognisably "Ford internal" at a glance.

---

## 2. Design system — Ford corporate flat enterprise

Dark navy background, blue/cyan accents, rounded but subtle (4–6 px), **zero glassmorphism** unless explicitly asked. **Dark theme only.** No light-mode toggle. No gradients on text.

### 2.1 Tokens — replace `src/app/globals.css` entirely with this block

This file replaces whatever the template ships with. Do not merge — overwrite.

```css
@import 'tailwindcss';

:root {
  --ford-header: #0f3a8e;
  --ford-header-dark: #0a2a6b;

  --ford-bg: #2a3441;
  --ford-bg-soft: #2f3a48;
  --ford-sidebar: #1f2937;
  --ford-sidebar-hover: #2a3441;

  --ford-surface: #26303d;
  --ford-surface-soft: #2c3949;
  --ford-surface-strong: #1f2937;

  --ford-border: #3a4554;
  --ford-border-strong: #4a5564;
  --ford-border-soft: #333d4c;

  --ford-text: #ffffff;
  --ford-text-muted: #a7b0bd;
  --ford-text-dim: #7a8492;
  --ford-text-faint: #6b7280;

  --ford-accent: #3b82f6;
  --ford-accent-hover: #2563eb;
  --ford-accent-soft: #1e40af;
  --ford-accent-faint: rgba(59, 130, 246, 0.12);

  --ford-success: #10b981;
  --ford-success-soft: rgba(16, 185, 129, 0.12);
  --ford-warning: #f59e0b;
  --ford-warning-soft: rgba(245, 158, 11, 0.12);
  --ford-danger: #e11d48;
  --ford-danger-soft: rgba(225, 29, 72, 0.12);
  --ford-info: #3b82f6;
  --ford-info-soft: rgba(59, 130, 246, 0.12);

  --background: var(--ford-bg);
  --foreground: var(--ford-text);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-ford-header: var(--ford-header);
  --color-ford-header-dark: var(--ford-header-dark);

  --color-ford-bg: var(--ford-bg);
  --color-ford-bg-soft: var(--ford-bg-soft);
  --color-ford-sidebar: var(--ford-sidebar);
  --color-ford-sidebar-hover: var(--ford-sidebar-hover);

  --color-ford-surface: var(--ford-surface);
  --color-ford-surface-soft: var(--ford-surface-soft);
  --color-ford-surface-strong: var(--ford-surface-strong);

  --color-ford-border: var(--ford-border);
  --color-ford-border-strong: var(--ford-border-strong);
  --color-ford-border-soft: var(--ford-border-soft);

  --color-ford-text: var(--ford-text);
  --color-ford-text-muted: var(--ford-text-muted);
  --color-ford-text-dim: var(--ford-text-dim);
  --color-ford-text-faint: var(--ford-text-faint);

  --color-ford-accent: var(--ford-accent);
  --color-ford-accent-hover: var(--ford-accent-hover);
  --color-ford-accent-soft: var(--ford-accent-soft);

  --color-ford-success: var(--ford-success);
  --color-ford-warning: var(--ford-warning);
  --color-ford-danger: var(--ford-danger);
  --color-ford-info: var(--ford-info);

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

html,
body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
}

body {
  background: var(--ford-bg);
  min-height: 100vh;
}

.surface-card {
  background: var(--ford-surface);
  border: 1px solid var(--ford-border);
  border-radius: 6px;
}

.surface-card-soft {
  background: var(--ford-surface-soft);
  border: 1px solid var(--ford-border);
  border-radius: 6px;
}

.section-card {
  background: transparent;
  border: 1px solid var(--ford-border);
  border-radius: 6px;
}

.input-base {
  background: var(--ford-surface-strong);
  border: 1px solid var(--ford-border);
  color: var(--ford-text);
  border-radius: 4px;
}
.input-base:focus {
  outline: none;
  border-color: var(--ford-accent);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.btn-primary {
  background: var(--ford-accent);
  color: #fff;
  border-radius: 4px;
  font-weight: 500;
  transition: background 120ms ease, transform 120ms ease;
}
.btn-primary:hover { background: var(--ford-accent-hover); }

.btn-secondary {
  background: transparent;
  color: var(--ford-text-muted);
  border: 1px solid var(--ford-border);
  border-radius: 4px;
  font-weight: 500;
  transition: background 120ms ease, color 120ms ease;
}
.btn-secondary:hover { background: var(--ford-surface-soft); color: var(--ford-text); }

.scrollbar-slim::-webkit-scrollbar { width: 10px; height: 10px; }
.scrollbar-slim::-webkit-scrollbar-track { background: transparent; }
.scrollbar-slim::-webkit-scrollbar-thumb { background: rgba(167, 176, 189, 0.2); border-radius: 9999px; }
.scrollbar-slim::-webkit-scrollbar-thumb:hover { background: rgba(167, 176, 189, 0.35); }

@keyframes pulseRing {
  0%   { transform: scale(0.95); opacity: 0.7; }
  70%  { transform: scale(1.4);  opacity: 0;   }
  100% { transform: scale(1.4);  opacity: 0;   }
}

.health-pulse::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: currentColor;
  animation: pulseRing 1.8s ease-out infinite;
}
```

### 2.2 Tailwind tokens you may use directly

`bg-ford-bg`, `bg-ford-surface`, `bg-ford-surface-soft`, `bg-ford-sidebar`, `text-ford-text`, `text-ford-text-muted`, `text-ford-text-dim`, `border-ford-border`, `border-ford-border-strong`, `text-ford-accent`, `bg-ford-accent`.

For per-status accent colors use the **palette literals** below — do NOT invent new colors:

| Tone    | Hex                 | When |
| ---     | ---                 | --- |
| Blue    | `#3b82f6` / `#bfdbfe` | Primary accent / In-progress |
| Cyan    | `#06b6d4` / `#a5f3fc` | Pilot / Digital transformation |
| Emerald | `#10b981` / `#a7f3d0` | Deployed / Success / $ impact |
| Purple  | `#a855f7` / `#e9d5ff` | AI / Planning / POC |
| Amber   | `#f59e0b` / `#fde68a` | Paused / Warning / High priority |
| Rose    | `#e11d48` / `#fda4af` | At risk / Critical / Strategic |
| Slate   | `#7a8492` / `#cbd5e1` | Pending / Idle / Neutral |

Badge formula (always):
`border-[#TONE]/40 bg-[#TONE]/12 text-[#FOREGROUND]` plus a matching `accentBar: 'bg-[#TONE]'` for left-edge accents.

### 2.3 Layout & typography

- The template ships Geist + Geist Mono. Make sure `<html>` carries those font CSS variables and `h-full antialiased`. The `<body>` is `flex min-h-full flex-col`.
- Page max width: `max-w-7xl mx-auto px-6 py-6`, gap-6 between major sections.
- Headings:
  - h1 (header brand): `text-sm font-semibold text-white`
  - h2 (hero): `text-3xl sm:text-4xl font-bold text-white`
  - h3 (card title): `text-base sm:text-lg font-semibold text-white`
- Eyebrows / section titles: `text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase`.
- Numbers (KPIs, counts, percentages, dates): always `tabular-nums`.

### 2.4 Header pattern

Sticky, navy, with the Ford oval, a vertical divider, an eyebrow + h1 on the left, and dashboard-context chips on the right.

```tsx
<header className="sticky top-0 z-30 border-b border-ford-border bg-ford-sidebar/90 backdrop-blur">
  <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3">
    {/* left: <FordOvalLogo /> + eyebrow + h1 */}
    {/* right: context pills */}
  </div>
</header>
```

### 2.5 Ford oval logo (drop-in)

```tsx
export function FordOvalLogo({ className = 'h-9 w-14' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <ellipse cx="50" cy="30" rx="48" ry="26" fill="#0f3a8e" stroke="#1e40af" strokeWidth="2" />
      <text x="50" y="38" textAnchor="middle" fontFamily="'Geist', 'Inter', system-ui, sans-serif"
            fontSize="22" fontWeight="700" fill="#ffffff" letterSpacing="2">Ford</text>
    </svg>
  );
}
```

---

## 3. Architecture — clean architecture, layered, feature-grouped

The template ships the five top-level folders below already created (with `.gitkeep` files). **Do not invent new top-level folders.** Inside every layer subfolder, files are **grouped by feature** so the same feature's pieces are easy to find across layers.

### 3.1 Top-level layout (matches the EngineeringFoundations template)

```
src/
├── app/
│   ├── api/
│   ├── globals.css        ← replace with section 2.1 verbatim
│   ├── layout.tsx         ← keep template fonts, dark body per section 2.3
│   └── page.tsx           ← thin: just renders the page from presentation/ui/pages
│
├── application/
│   ├── use-cases/
│   ├── dto/
│   └── adapters/
│
├── domain/
│   ├── entities/
│   ├── enums/
│   ├── errors/
│   ├── repositories/
│   ├── services/
│   ├── value-objects/
│   └── types/
│
├── infrastructure/
│   ├── database/
│   ├── mappers/
│   ├── repositories/
│   ├── services/
│   └── types/
│
└── presentation/
    ├── constants/
    ├── hooks/
    ├── mappers/
    ├── providers/
    ├── services/
    ├── stores/
    ├── types/
    └── ui/
        ├── components/
        ├── config/
        ├── pages/
        └── styles/
```

### 3.2 Feature grouping rule

**Inside every subfolder, group files by feature.** Either with subfolders (preferred when the feature has > 2 files in that subfolder) or with a `<feature>-` filename prefix (acceptable when there is only one file). Examples:

- `src/domain/enums/<feature>/portfolio-enums.ts` (or `src/domain/enums/portfolio-enums.ts` if only one)
- `src/domain/types/<feature>/portfolio-types.ts`
- `src/domain/entities/<feature>/Project.ts`
- `src/application/use-cases/<feature>/get-portfolio-summary.ts`
- `src/application/dto/<feature>/project-card.dto.ts`
- `src/infrastructure/database/<feature>/projects.seed.ts`
- `src/infrastructure/repositories/<feature>/in-memory-project.repository.ts`
- `src/presentation/ui/components/<feature>/badges/StatusBadge.tsx`
- `src/presentation/ui/pages/<feature>/PortalShell.tsx`
- `src/presentation/ui/styles/<feature>/style-palettes.ts`

When the project only has one feature you may omit the `<feature>/` segment in some subfolders for brevity — but **never** in `presentation/ui/components/` or `presentation/ui/pages/`, where the feature segment is mandatory.

### 3.3 What goes in each layer

| Layer | Holds | Knows about |
| --- | --- | --- |
| `app/` | Entry points only: `layout.tsx`, `page.tsx`, `globals.css`, `api/*/route.ts`. Files are thin and delegate. | Everything (composition root). |
| `domain/` | Pure business core: enums, types, entities, value objects, repository **interfaces**, domain errors, domain services. **No React, no framework, no IO, no fetch.** | Nothing outside `domain/`. |
| `application/` | Use cases (one function per business action), DTOs (input/output of use cases), adapters between repository interfaces and DTOs. | `domain/` only. |
| `infrastructure/` | Concrete implementations: database access (`database/`), repository implementations (`repositories/`), external service clients (`services/`), DB ↔ entity mappers (`mappers/`), infra-specific types. | `domain/` interfaces + `application/` DTOs. |
| `presentation/` | Everything UI: components, pages, hooks, providers, stores, presentation mappers (entity → view-model), Tailwind palettes (`ui/styles/`), runtime constants, presentation-specific types. | `application/` use cases + `domain/` types. **Never** `infrastructure/` directly. |

### 3.4 Subfolder responsibilities

**`app/`**
- `app/page.tsx` — `import { PortalShell } from '@/presentation/ui/pages/<feature>/PortalShell'; export default function Home() { return <PortalShell />; }`
- `app/layout.tsx` — root font wiring, `<html lang="en">`, `flex min-h-full flex-col` body. Nothing else.
- `app/api/<route>/route.ts` — route handlers. Call `application/use-cases/...` only. Never reach into the database directly here.
- `app/globals.css` — paste section 2.1 verbatim.

**`domain/`**
- `enums/` — plain enums. No labels, no React.
- `types/` — interfaces built on enums.
- `entities/` — class-style entities with invariants when there are real business rules. Skip if not needed.
- `value-objects/` — `Money`, `Percentage`, `DateRange` when applicable.
- `repositories/` — **interfaces only**.
- `services/` — pure domain logic that does not belong on a single entity.
- `errors/` — domain-specific error classes.

**`application/`**
- `use-cases/` — one named function per business action. Take a repository interface from `domain/`, return a DTO.
- `dto/` — plain shapes returned from use cases.
- `adapters/` — convert between domain entities and DTOs when the mapping is non-trivial.

**`infrastructure/`**
- `database/` — DB connection setup, schemas, and (for prototypes) the typed seed array (`<feature>/projects.seed.ts`).
- `mappers/` — DB doc ↔ domain entity mappers.
- `repositories/` — implementations of `domain/repositories` interfaces. For prototypes use an `InMemory…Repository` over the seed.
- `services/` — outbound clients (auth provider, mail, external APIs).
- `types/` — infra-only types.

**`presentation/`**
- `ui/components/<feature>/` — grouped:
  - `badges/` — StatusBadge, CategoryBadge, TypeBadge, PriorityBadge
  - `common/` — ProgressBar, MetricCard, SectionTitle, EmptyState, MilestoneItem, ImpactMetricRow, FordOvalLogo
  - `filters/` — FiltersBar, CategoryDistribution
  - `layout/` — PortalHeader, HeroSection, PortalFooter, PortfolioRoadmap
  - `projects/` — ProjectCard, ProjectGrid, ProjectDetailPanel
- `ui/pages/<feature>/PortalShell.tsx` — orchestrator (state, filters, selection). This is the component `app/page.tsx` renders.
- `ui/styles/<feature>/` — Tailwind palette objects (`style-palettes.ts`), `progressTone`, etc.
- `ui/config/<feature>/` — UI-only constants (initial filter values, page-size defaults).
- `hooks/<feature>/` — `useProjectFilters`, `useSelectedProject`.
- `providers/<feature>/` — React context providers.
- `stores/<feature>/` — client state stores when needed (only if `useState` + context isn't enough).
- `mappers/<feature>/` — domain entity → view-model mappers (`toProjectCardVm`).
- `services/<feature>/` — calls into `application/use-cases` from the client side.
- `constants/<feature>/` — UI text-free constants (icon maps, color maps that are not enum-driven palettes).
- `types/<feature>/` — view-model types (`ProjectCardVm`, `PortfolioFilters`).

### 3.5 Hard rules

- **Dependency direction is one-way: `app/` → `presentation/` → `application/` → `domain/`** and `infrastructure/` → `domain/`, with `app/` wiring concrete `infrastructure/` implementations into use cases.
- **Never** import from `infrastructure/` inside `presentation/` or `domain/`. Cross only at `app/api/.../route.ts`.
- **Never** import React or framework code inside `domain/` or `application/`.
- The template's `tsconfig.json` already exposes `"@/*": ["./src/*"]`. Always import as `@/domain/...`, `@/application/...`, etc. — no relative deep imports across layers.
- Components that touch React state, refs, browser APIs or context must opt into client rendering at the top of the file.
- `app/page.tsx` is one render line. All composition lives in `presentation/ui/pages/<feature>/PortalShell.tsx`.

### 3.6 Naming

- Files: `PascalCase.tsx` for components and entities; `kebab-case.ts` for enums, types, utils, dto, mappers, repositories, use-cases, seed data.
- Enums: `SCREAMING_SNAKE` values, `PascalCase` enum name.
- Functions / variables: `camelCase`. Components / types / interfaces / classes: `PascalCase`.
- Booleans: `isX`, `hasX`, `canX`.
- Use cases: verb-first (`list-projects.ts`, `get-portfolio-summary.ts`).
- Repositories: noun + `Repository` (`ProjectRepository`).
- Mappers: `toX` / `fromX` (`toProjectCardVm`, `fromProjectDocument`).

---

## 4. How a feature is built (build order)

Build a feature in this exact order. Each step depends on the previous one. All paths assume the feature is named `<feature>`.

### Step 1 — Domain enums (`src/domain/enums/<feature>/portfolio-enums.ts`)

Plain enums, no display strings, no React, no imports from outside `domain/`.

```ts
export enum ProjectStatus {
  IDEATION = 'IDEATION',
  IN_PROGRESS = 'IN_PROGRESS',
  DEPLOYED = 'DEPLOYED',
  PAUSED = 'PAUSED',
}
```

### Step 2 — Domain types (`src/domain/types/<feature>/portfolio-types.ts`)

Strong types built on the enums. Dates are ISO strings so the seed stays serializable.

```ts
import type { ProjectStatus } from '@/domain/enums/<feature>/portfolio-enums';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number;          // 0–100
  kickoffDate: string;       // ISO
  expectedGoLiveDate?: string;
}
```

### Step 3 — Domain repository interface (`src/domain/repositories/<feature>/project.repository.ts`)

```ts
import type { Project } from '@/domain/types/<feature>/portfolio-types';

export interface ProjectRepository {
  list(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
}
```

### Step 4 — Infrastructure: seed + repository implementation

`src/infrastructure/database/<feature>/projects.seed.ts`:

```ts
import type { Project } from '@/domain/types/<feature>/portfolio-types';

export const PROJECTS_SEED: Project[] = [ /* fully populated, realistic IEPC records */ ];
```

`src/infrastructure/repositories/<feature>/in-memory-project.repository.ts`:

```ts
import type { ProjectRepository } from '@/domain/repositories/<feature>/project.repository';
import type { Project } from '@/domain/types/<feature>/portfolio-types';
import { PROJECTS_SEED } from '@/infrastructure/database/<feature>/projects.seed';

export class InMemoryProjectRepository implements ProjectRepository {
  async list(): Promise<Project[]> { return PROJECTS_SEED; }
  async findById(id: string): Promise<Project | null> {
    return PROJECTS_SEED.find((p) => p.id === id) ?? null;
  }
}
```

### Step 5 — Application: DTOs + use cases

`src/application/dto/<feature>/portfolio-summary.dto.ts`:

```ts
export interface PortfolioSummaryDto {
  totalProjects: number;
  inProductionCount: number;
  totalAnnualImpactUsd: number;
}
```

`src/application/use-cases/<feature>/list-projects.ts`:

```ts
import type { ProjectRepository } from '@/domain/repositories/<feature>/project.repository';
import type { Project } from '@/domain/types/<feature>/portfolio-types';

export async function listProjects(repo: ProjectRepository): Promise<Project[]> {
  return repo.list();
}
```

### Step 6 — Presentation: utilities, mappers, view-models

- `src/presentation/ui/styles/<feature>/style-palettes.ts` — `Record<EnumValue, BadgePalette>` per coloured enum + `progressTone(value)` gradient helper.
- `src/presentation/mappers/<feature>/to-project-card.vm.ts` — `toProjectCardVm(project): ProjectCardVm`.
- `src/presentation/types/<feature>/portfolio-vm.ts` — `ProjectCardVm`, `PortfolioFilters`.
- `src/presentation/hooks/<feature>/use-project-filters.ts` — search + filter state hook.
- `src/presentation/constants/<feature>/icons.ts` — icon-per-enum maps.

### Step 7 — Presentation: components

`src/presentation/ui/components/<feature>/`, organized exactly as in section 3.4 (`badges/`, `common/`, `filters/`, `layout/`, `projects/`).

### Step 8 — Page orchestrator (`src/presentation/ui/pages/<feature>/PortalShell.tsx`)

Owns filter state + selected ID. Calls the use case (already wired with the in-memory repository) to load data. Composes header → hero → filters → grid → roadmap → footer + detail panel.

### Step 9 — Wire-up at `app/`

`src/app/page.tsx`:

```tsx
import { PortalShell } from '@/presentation/ui/pages/<feature>/PortalShell';

export default function Home() {
  return <PortalShell />;
}
```

`src/app/layout.tsx` — keep the template's font wiring intact, set `<html lang="en">`, `h-full antialiased`, body `flex min-h-full flex-col`. Update `metadata.title` and `metadata.description` to the new app's name.

### 4.1 Reference badge component (with the canonical import paths)

```tsx
'use client';

import { Activity } from 'lucide-react';
import { ProjectStatus } from '@/domain/enums/<feature>/portfolio-enums';
import { STATUS_PALETTE } from '@/presentation/ui/styles/<feature>/style-palettes';

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md';
}

const STATUS_LABEL: Record<ProjectStatus, string> = {
  [ProjectStatus.IDEATION]: 'Ideation',
  [ProjectStatus.IN_PROGRESS]: 'In Progress',
  [ProjectStatus.DEPLOYED]: 'Deployed',
  [ProjectStatus.PAUSED]: 'Paused',
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const palette = STATUS_PALETTE[status];
  const sizing = size === 'md' ? 'px-3 py-1.5 text-xs gap-1.5' : 'px-2.5 py-1 text-[11px] gap-1';
  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold tracking-wide uppercase ${palette.container} ${sizing}`}
    >
      <Activity className="h-3 w-3" aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  );
}
```

---

## 5. UX rules — every interaction must follow

| Rule | Why / How |
| --- | --- |
| `cursor-pointer` on **every** clickable element | All `<button>`, interactive `<a>`, `<select>`, `role="button"`, slide-over backdrop close. Disabled / pending links use `cursor-not-allowed` + `opacity-60` + `pointer-events-none`. |
| Hover state on every interactive surface | Cards: `hover:border-ford-border-strong`. Links: `hover:text-white`. Primary buttons: `hover:bg-ford-accent-hover`. |
| `transition` on hover/active | Use Tailwind `transition` (default 150 ms) or `transition-colors`. Never animate longer than 250 ms. |
| Focus visible | Inputs use `.input-base` (provides focus ring). Buttons inherit framework defaults; do not remove focus rings. |
| Slide-over panels | `fixed inset-0 z-40 flex justify-end`, backdrop is a `<button type="button">` (clickable, accessible, `cursor-pointer`), panel is `max-w-2xl`, ESC key closes via effect. |
| Dark theme only | Never reintroduce `prefers-color-scheme: light`. No theme toggle unless asked. |
| Icons | Use the icon library that ships with the template. Always `aria-hidden` when decorative. Sizes: `h-3 w-3` (badge), `h-3.5 w-3.5` (eyebrow), `h-4 w-4` (button), `h-5 w-5` (KPI). |
| Emojis | **Never** in code or UI unless the user explicitly asks. |
| Comments | Explain *why*, not *what*. Skip narration comments like `// import x`. |
| Numbers | Always `tabular-nums` for any column that contains comparable numbers. |
| Accessibility | `aria-label` on icon-only buttons, `aria-pressed` on toggles, `aria-hidden` on decorative icons, `<html lang="en">` set. |

---

## 6. Reusable component catalog (build these in every project)

All paths are relative to `src/presentation/ui/components/<feature>/`. Always ship these components with the same prop shapes so they compose.

| Component | Path | Notes |
| --- | --- | --- |
| `FordOvalLogo` | `common/FordOvalLogo.tsx` | Pure SVG, sized via `className` prop. |
| `StatusBadge` | `badges/StatusBadge.tsx` | `status`, `size?: 'sm' \| 'md'`. Driven by `STATUS_PALETTE` from `@/presentation/ui/styles/<feature>/style-palettes`. |
| `CategoryBadge` / `TypeBadge` / `PriorityBadge` | `badges/` | Same shape as StatusBadge. |
| `ProgressBar` | `common/ProgressBar.tsx` | `value` 0–100, `showLabel`, `size`. Uses `progressTone(value)` gradient. |
| `MetricCard` | `common/MetricCard.tsx` | `label`, `value`, `hint`, `icon`, `iconColor`, `iconBg`. Used in Hero + dashboards. |
| `SectionTitle` | `common/SectionTitle.tsx` | `icon`, `title`, `hint?`, `action?`. Renders the eyebrow + optional CTA. |
| `EmptyState` | `common/EmptyState.tsx` | Centered card with search icon + title + description. |
| `MilestoneItem` | `common/MilestoneItem.tsx` | Roadmap entry with vertical timeline rail. |
| `PortalHeader` | `layout/PortalHeader.tsx` | Sticky, navy, brand left + context right. |
| `HeroSection` | `layout/HeroSection.tsx` | Live pill, title, description, 4-up MetricCard grid. |
| `FiltersBar` | `filters/FiltersBar.tsx` | Search input + 3–4 select fields, clear button when active. |
| `ProjectCard` | `projects/ProjectCard.tsx` | Whole card is a `<button>`. Click → `onSelect(id)`. |
| `ProjectGrid` | `projects/ProjectGrid.tsx` | Responsive grid `grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3`, falls back to `EmptyState`. |
| `ProjectDetailPanel` | `projects/ProjectDetailPanel.tsx` | Slide-over, all sections, ESC to close. |
| `PortalFooter` | `layout/PortalFooter.tsx` | Internal-use disclaimer + maintainer line. |
| `PortalShell` | `@/presentation/ui/pages/<feature>/PortalShell.tsx` | Page orchestrator (state, filters, selection). Rendered by `app/page.tsx`. |

---

## 7. Hero section pattern

The hero anchors every internal app. It must contain, in order:

1. A **"live" pill** — `inline-flex` rounded-full with a tiny accent dot using the `health-pulse` keyframe.
2. A bold h2 title (`text-3xl sm:text-4xl`).
3. A description paragraph (`max-w-3xl text-sm sm:text-base text-ford-text-muted`).
4. A **4-up KPI grid** of `MetricCard` components.

The hero card itself uses `surface-card relative overflow-hidden p-6 sm:p-8` with two decorative gradient layers (`pointer-events-none absolute`) for depth.

---

## 8. Footer pattern

Single line, internal-use disclaimer:

```tsx
<footer className="border-t border-ford-border bg-ford-sidebar/50">
  <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 px-6 py-5 sm:flex-row sm:items-center">
    <div className="flex items-center gap-2 text-xs text-ford-text-muted">
      <Briefcase className="h-3.5 w-3.5 text-ford-accent" aria-hidden />
      <span><span className="font-semibold text-white">{appName}</span> · Maintained by IEPC Engineering</span>
    </div>
    <p className="text-[11px] tracking-wider text-ford-text-dim uppercase">
      © {new Date().getFullYear()} Ford Motor Company · Internal use only
    </p>
  </div>
</footer>
```

---

## 9. "Done" checklist — must pass before responding "ready"

Use the scripts that come with the EngineeringFoundations template (the names are already wired). Do not declare a feature done if any item fails.

- [ ] Template's typecheck script → 0 errors
- [ ] Template's lint script → 0 errors
- [ ] Linter inspection of edited files → 0 issues (use the editor lints tool)
- [ ] Template's dev script → server starts cleanly, no `Error` lines in the terminal
- [ ] `GET /` returns 200 and the rendered HTML contains the expected hero title, KPI labels, at least one project name and the footer
- [ ] Every interactive element (`<button>`, link, `<select>`, slide-over backdrop) carries `cursor-pointer`
- [ ] Hero, filters, grid, detail panel and footer all render
- [ ] `globals.css` has been replaced with the section 2.1 block (no leftover template tokens)
- [ ] No emojis in code or UI
- [ ] No `console.log`, no `TODO`, no commented-out blocks
- [ ] No new top-level dependencies installed without justification — the template already ships everything we need

When all boxes are checked, summarize what was built, list the new files, and quote the verification output (typecheck, lint, dev server `Ready in …`, `GET /` status).
