'use client';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const locales = ['en', 'cs', 'uk', 'ru'] as const;

  return (
    <div className="flex gap-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`px-2 py-1 text-xs rounded uppercase transition-colors ${
            locale === l
              ? 'bg-brand-500 text-white'
              : 'text-muted hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
