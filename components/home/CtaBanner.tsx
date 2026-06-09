import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function CtaBanner() {
  const t = await getTranslations('home.cta');

  return (
    <section className="py-24 px-4 bg-gradient-to-r from-brand-900/50 to-dark border-y border-white/5">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">{t('title')}</h2>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
        <Link
          href="/contact"
          className="mt-8 inline-block px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-all hover:scale-105"
        >
          {t('button')}
        </Link>
      </div>
    </section>
  );
}
