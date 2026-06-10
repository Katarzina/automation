import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactForm from '@/components/ui/ContactForm';
import { SITE } from '@/lib/config';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return { title: t('title'), description: t('description') };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-100 py-16 text-center px-4">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-stone-900">{t('title')}</h1>
        <p className="mt-4 text-lg text-gray-500">{t('subtitle')}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-heading text-lg font-semibold text-stone-900 mb-4">
                {SITE.name}
              </h3>
              <div className="space-y-3 text-sm text-gray-500">
                <p>📍 {SITE.location}</p>
                <p>✉️ {SITE.email}</p>
                <p>🕐 {SITE.hours}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
