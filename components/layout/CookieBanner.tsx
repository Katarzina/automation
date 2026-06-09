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
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg rounded-xl p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          <span className="text-stone-900 font-medium">{t('text')}{' '}</span>
          <Link href="/cookies" className="text-indigo-600 hover:underline">
            {t('link')}
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/cookies"
            className="px-4 py-2 text-sm border border-gray-200 rounded text-gray-500 hover:text-stone-900 transition-colors"
          >
            {t('settings')}
          </Link>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
