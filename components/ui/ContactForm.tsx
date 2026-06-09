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
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <p className="text-stone-900 font-medium">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-gray-700 mb-1">{t('name')} *</label>
          <input
            name="name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-stone-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">{t('email')} *</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-stone-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">{t('company')}</label>
        <input
          name="company"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-stone-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">{t('service')}</label>
        <select
          name="service"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="automation">{t('serviceOptions.automation')}</option>
          <option value="agents">{t('serviceOptions.agents')}</option>
          <option value="software">{t('serviceOptions.software')}</option>
          <option value="landing">{t('serviceOptions.landing')}</option>
          <option value="other">{t('serviceOptions.other')}</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">{t('message')} *</label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-stone-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white resize-none"
        />
      </div>
      {state.message && !state.success && (
        <p className="text-red-600 text-sm">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full py-3.5 bg-blue-800 hover:bg-blue-900 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
      >
        {pending ? t('sending') : t('send')}
      </button>
    </form>
  );
}
