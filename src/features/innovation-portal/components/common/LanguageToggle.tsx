'use client';

import { Languages } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';
import { Locale, LOCALE_LABELS, LOCALE_SHORT, SUPPORTED_LOCALES } from '../../i18n/locale';

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t.language.label}
      className="inline-flex items-center gap-1 rounded-md border border-ford-border bg-ford-surface px-1.5 py-1"
    >
      <Languages className="h-3.5 w-3.5 text-ford-accent" aria-hidden />
      {SUPPORTED_LOCALES.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code as Locale)}
            aria-pressed={isActive}
            title={LOCALE_LABELS[code as Locale]}
            className={`cursor-pointer rounded-sm px-1.5 py-0.5 text-[10px] font-bold tracking-[0.2em] uppercase transition ${
              isActive
                ? 'bg-ford-accent text-white shadow-sm'
                : 'text-ford-text-dim hover:text-white'
            }`}
          >
            {LOCALE_SHORT[code as Locale]}
          </button>
        );
      })}
    </div>
  );
}
