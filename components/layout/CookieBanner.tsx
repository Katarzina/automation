'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function CookieBanner() {
  const t = useTranslations('cookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem(
      'cookie_consent',
      JSON.stringify({ necessary: true, analytics: true, marketing: true })
    );
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {t('text')}{' '}
          <Link href="/cookies" className="text-brand-600 hover:underline">
            {t('link')}
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/cookies"
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-muted hover:text-gray-900 transition-colors"
          >
            {t('settings')}
          </Link>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
