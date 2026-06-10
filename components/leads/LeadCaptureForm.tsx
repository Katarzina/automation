'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function LeadCaptureForm() {
  const t = useTranslations('lead');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <p className="font-semibold text-stone-900">{t('success')}</p>
        <p className="text-gray-500 text-sm mt-1">{t('successSub')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">{t('name')} *</label>
          <input
            name="name"
            required
            placeholder="John Smith"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-800 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">{t('email')} *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="john@company.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-800 transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{t('budget')}</label>
        <select
          name="budget"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:border-blue-800 transition-colors bg-white"
        >
          <option value="">{t('budgetPlaceholder')}</option>
          <option value="< $1,000">{'< $1,000'}</option>
          <option value="$1,000 – $5,000">$1,000 – $5,000</option>
          <option value="$5,000 – $15,000">$5,000 – $15,000</option>
          <option value="$15,000+">$15,000+</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{t('message')} *</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={t('messagePlaceholder')}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-800 transition-colors resize-none"
        />
      </div>
      {status === 'error' && <p className="text-red-600 text-sm">{t('error')}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition-colors"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
