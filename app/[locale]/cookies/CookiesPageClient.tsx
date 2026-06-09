'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Prefs = { necessary: boolean; analytics: boolean; marketing: boolean };

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
        value ? 'bg-indigo-600' : 'bg-gray-200'
      }`}
      aria-pressed={value}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
          value ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function CookiesPageClient() {
  const t = useTranslations('cookies');
  const [prefs, setPrefs] = useState<Prefs>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cookie_consent');
      if (saved) setPrefs(JSON.parse(saved));
    } catch {}
  }, []);

  const save = (next: Prefs) => {
    setPrefs(next);
    localStorage.setItem('cookie_consent', JSON.stringify(next));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <h1 className="font-heading text-4xl font-bold text-stone-900 mb-4">{t('title')}</h1>
      <p className="text-gray-600 mb-10">{t('intro')}</p>

      <div className="space-y-4">
        {/* Necessary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-stone-900">{t('necessary.title')}</h3>
            <p className="text-sm text-gray-500 mt-1">{t('necessary.desc')}</p>
          </div>
          <Toggle value={true} onChange={() => {}} />
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-stone-900">{t('analytics.title')}</h3>
            <p className="text-sm text-gray-500 mt-1">{t('analytics.desc')}</p>
          </div>
          <Toggle value={prefs.analytics} onChange={(v) => save({ ...prefs, analytics: v })} />
        </div>

        {/* Marketing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-stone-900">{t('marketing.title')}</h3>
            <p className="text-sm text-gray-500 mt-1">{t('marketing.desc')}</p>
          </div>
          <Toggle value={prefs.marketing} onChange={(v) => save({ ...prefs, marketing: v })} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => save({ necessary: true, analytics: true, marketing: true })}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
        >
          {t('acceptAll')}
        </button>
        <button
          onClick={() => save({ necessary: true, analytics: false, marketing: false })}
          className="px-5 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm rounded transition-colors"
        >
          {t('rejectAll')}
        </button>
        <button
          onClick={() => save(prefs)}
          className="px-5 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm rounded transition-colors"
        >
          {t('saveSettings')}
        </button>
      </div>
    </div>
  );
}
