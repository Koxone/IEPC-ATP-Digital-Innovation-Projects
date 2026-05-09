import type { ComponentType, ReactNode, SVGProps } from 'react';

interface SectionTitleProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  hint?: string;
  action?: ReactNode;
}

export function SectionTitle({ icon: Icon, title, hint, action }: SectionTitleProps) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-ford-text-dim uppercase">
          <Icon className="h-3.5 w-3.5 text-ford-accent" aria-hidden />
          {title}
        </div>
        {hint ? <p className="text-sm text-ford-text-muted">{hint}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
