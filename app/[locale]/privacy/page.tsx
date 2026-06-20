import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { SITE } from '@/lib/config';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="font-heading text-4xl font-bold text-stone-900 mb-2">{t('title')}</h1>
      <p className="text-sm text-gray-400 mb-12">{t('updated')}</p>

      <div className="prose prose-stone max-w-none space-y-10">
        {(['intro', 'dataCollection', 'dataUse', 'cookies', 'thirdParty', 'rights', 'contact'] as const).map((section) => (
          <section key={section}>
            <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t(`${section}.title`)}</h2>
            <p className="text-gray-600 leading-relaxed">{t(`${section}.text`)}</p>
          </section>
        ))}
      </div>

      <div className="mt-12 p-5 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500">
        {SITE.name} · {SITE.email} · {SITE.phone}
      </div>
    </div>
  );
}
