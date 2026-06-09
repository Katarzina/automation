'use client';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { submitContactForm, type FormState } from '@/app/[locale]/contact/actions';

const initial: FormState = { success: false, message: '' };

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [state, action, pending] = useActionState(submitContactForm, initial);

  if (state.success) {
    return (
      <div className="bg-card border border-white/5 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <p className="text-white font-medium">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-muted mb-1">{t('name')} *</label>
          <input
            name="name"
            required
            className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-1">{t('email')} *</label>
          <input
            name="email"
            type="email"
            required
            className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-muted mb-1">{t('company')}</label>
        <input
          name="company"
          className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500"
        />
      </div>
      <div>
        <label className="block text-sm text-muted mb-1">{t('service')}</label>
        <select
          name="service"
          className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500"
        >
          <option value="automation">{t('serviceOptions.automation')}</option>
          <option value="agents">{t('serviceOptions.agents')}</option>
          <option value="software">{t('serviceOptions.software')}</option>
          <option value="landing">{t('serviceOptions.landing')}</option>
          <option value="other">{t('serviceOptions.other')}</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-muted mb-1">{t('message')} *</label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 resize-none"
        />
      </div>
      {state.message && !state.success && (
        <p className="text-red-400 text-sm">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-medium rounded-xl transition-all"
      >
        {pending ? t('sending') : t('send')}
      </button>
    </form>
  );
}
