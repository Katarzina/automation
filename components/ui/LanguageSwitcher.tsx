'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

const LOCALES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'cs', label: 'CZ', flag: '🇨🇿' },
  { code: 'uk', label: 'UA', flag: '🇺🇦' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  const others = LOCALES.filter((l) => l.code !== locale);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:border-gray-400 transition-colors bg-gray-50 text-gray-900"
      >
        <span>{current.flag}</span>
        <span className="font-medium">{current.label}</span>
        <svg
          className={`w-3 h-3 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
          {others.map(({ code, label, flag }) => (
            <button
              key={code}
              onClick={() => {
                router.replace(pathname, { locale: code });
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <span>{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
