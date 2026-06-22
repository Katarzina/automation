import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Layout, Globe, Bot, Target, Zap } from 'lucide-react';
import { Link } from '@/i18n/navigation';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

const services = [
  {
    key: 'landing',
    icon: Layout,
    color: 'text-blue-700 bg-blue-50',
    czk: '1 000 Kč',
    eur: '€40',
  },
  {
    key: 'website',
    icon: Globe,
    color: 'text-emerald-700 bg-emerald-50',
    czk: '3 000–5 000 Kč',
    eur: '€120–200',
  },
  {
    key: 'telegram',
    icon: Bot,
    color: 'text-violet-700 bg-violet-50',
    czk: '2 000 Kč',
    eur: '€80',
  },
  {
    key: 'lead',
    icon: Target,
    color: 'text-orange-700 bg-orange-50',
    czk: '10 000 Kč',
    eur: '€400',
  },
  {
    key: 'full',
    icon: Zap,
    color: 'text-pink-700 bg-pink-50',
    czk: '15 000 Kč',
    eur: '€600',
  },
] as const;

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pricing');

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="py-16 px-4 text-center border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-500">{t('subtitle')}</p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ key, icon: Icon, color, czk, eur }) => (
            <div
              key={key}
              className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <h2 className="font-heading text-lg font-semibold text-stone-900">
                  {t(`${key}.title`)}
                </h2>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  {t(`${key}.desc`)}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-end gap-2">
                  <span className="text-xs text-gray-400 mb-0.5">{t('from')}</span>
                  <span className="font-heading text-2xl font-bold text-stone-900">{czk}</span>
                </div>
                <div className="text-sm text-gray-400 mt-0.5">{t('from')} {eur}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Note + CTA */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-400 mb-8">{t('note')}</p>
          <Link
            href="/contact"
            className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-medium px-8 py-4 rounded-lg transition-colors text-sm"
          >
            {t('cta')}
          </Link>
        </div>
      </section>

    </div>
  );
}
