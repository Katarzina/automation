import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function CtaBanner() {
  const t = await getTranslations('home.cta');

  return (
    <section className="py-24 px-4 bg-gradient-to-r from-blue-800 to-blue-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">{t('title')}</h2>
        <p className="mt-4 text-lg text-blue-100">{t('subtitle')}</p>
        <Link
          href="/contact"
          className="mt-8 inline-block px-8 py-3.5 bg-white text-blue-800 hover:bg-blue-50 font-medium rounded transition-colors"
        >
          {t('button')}
        </Link>
      </div>
    </section>
  );
}
