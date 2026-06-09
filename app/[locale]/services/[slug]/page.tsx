import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getAllServices, getServiceBySlug } from '@/lib/getServices';
import { routing } from '@/routing';
import ServiceDetail from '@/components/services/ServiceDetail';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllServices().map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const tr = service.translations[locale] ?? service.translations['en'];
  return { title: `${tr.title} | AI Automation Studio` };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const t = await getTranslations('services');

  return (
    <div className="pt-16 max-w-6xl mx-auto px-4">
      <ServiceDetail service={service} locale={locale} index={0} getStartedLabel={t('getStarted')} />
    </div>
  );
}
