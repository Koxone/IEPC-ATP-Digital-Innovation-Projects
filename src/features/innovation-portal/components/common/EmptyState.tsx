import { Search } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="surface-card flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ford-surface-soft text-ford-accent ring-1 ring-ford-border">
        <Search className="h-4 w-4" aria-hidden />
      </span>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="max-w-md text-xs text-ford-text-dim">{description}</p>
    </div>
  );
}
