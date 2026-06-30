import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function CtaBanner() {
  const t = await getTranslations('home.cta');

  return (
    <section className="relative py-24 px-6 bg-[#0a0a0f] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-indigo-600/15 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-5">
          {t('title')}
        </h2>
        <p className="text-lg text-stone-300 mb-10 max-w-xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://cal.com/ai-automation-studio-brno/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {t('button')}
          </a>
          <Link
            href="/solutions"
            className="px-8 py-4 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            {t('secondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
