import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactForm from '@/components/ui/ContactForm';

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
    <div className="pt-16">
      <div className="py-20 text-center px-4 bg-gradient-to-b from-brand-900/20 to-transparent">
        <h1 className="font-heading text-5xl font-bold text-white">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold text-white mb-4">
                AI Automation Studio
              </h3>
              <div className="space-y-3 text-sm text-muted">
                <p>📍 {t('info.location')}</p>
                <p>✉️ {t('info.email')}</p>
                <p>🕐 {t('info.hours')}</p>
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
