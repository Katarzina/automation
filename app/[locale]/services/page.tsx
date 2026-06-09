import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAllServices } from '@/lib/getServices';
import ServiceDetail from '@/components/services/ServiceDetail';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.services' });
  return { title: t('title'), description: t('description') };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const services = getAllServices();

  return (
    <div className="pt-16">
      <div className="py-20 text-center px-4 bg-gradient-to-b from-brand-900/20 to-transparent">
        <h1 className="font-heading text-5xl font-bold text-white">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 divide-y divide-white/5">
        {services.map((service, i) => (
          <ServiceDetail
            key={service.slug}
            service={service}
            locale={locale}
            index={i}
            getStartedLabel={t('getStarted')}
          />
        ))}
      </div>
    </div>
  );
}
