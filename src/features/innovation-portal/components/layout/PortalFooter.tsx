import { Briefcase } from 'lucide-react';

export function PortalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ford-border bg-ford-sidebar/50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 px-6 py-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-xs text-ford-text-muted">
          <Briefcase className="h-3.5 w-3.5 text-ford-accent" aria-hidden />
          <span>
            <span className="font-semibold text-white">Digital Innovation Portfolio</span> ·
            Maintained by IEPC Engineering
          </span>
        </div>
        <p className="text-[11px] tracking-wider text-ford-text-dim uppercase">
          © {year} Ford Motor Company · Internal use only
        </p>
      </div>
    </footer>
  );
}
