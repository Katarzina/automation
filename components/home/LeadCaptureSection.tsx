import LeadCaptureForm from '@/components/leads/LeadCaptureForm';
import { getTranslations } from 'next-intl/server';

type Props = { locale: string };

export default async function LeadCaptureSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'lead' });

  return (
    <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-medium text-blue-800 bg-blue-50 px-3 py-1 rounded-full mb-4">
              {t('badge')}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">{t('subtitle')}</p>
            <ul className="space-y-2">
              {['item1', 'item2', 'item3'].map((key) => (
                <li key={key} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-blue-800">✓</span>
                  {t(`items.${key}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <LeadCaptureForm />
          </div>
        </div>
      </div>
    </section>
  );
}
