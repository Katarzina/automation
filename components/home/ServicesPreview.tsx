import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { getAllServices } from '@/lib/getServices';
import ServiceCard from '@/components/services/ServiceCard';
import SectionTitle from '@/components/ui/SectionTitle';

export default async function ServicesPreview() {
  const t = await getTranslations('home.services');
  const locale = await getLocale();
  const services = getAllServices();

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              locale={locale}
              learnMoreLabel="Learn more"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
