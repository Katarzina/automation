import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getAllSolutions } from '@/lib/getSolutions';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

const categoryColors: Record<string, string> = {
  landing:    'bg-blue-50 text-blue-700',
  chatbot:    'bg-purple-50 text-purple-700',
  automation: 'bg-green-50 text-green-700',
  software:   'bg-orange-50 text-orange-700',
};

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('solutions');
  const solutions = getAllSolutions();

  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-100 py-16 text-center px-4">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-stone-900">{t('title')}</h1>
        <p className="mt-4 text-lg text-gray-500">{t('subtitle')}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {solutions.map((solution) => {
            const tr = solution.translations[locale] ?? solution.translations['en'];
            return (
              <div key={solution.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={solution.cover}
                    alt={tr.title}
                    fill
                    className="object-cover"
                  />
                  {solution.status === 'live' && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      Live
                    </span>
                  )}
                  {solution.status === 'coming-soon' && (
                    <span className="absolute top-3 right-3 bg-gray-800/70 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {t('comingSoon')}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[solution.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {t(`categories.${solution.category}`)}
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-stone-900 mb-2">{tr.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{tr.description}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {solution.techStack.map((tech) => (
                      <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{tech}</span>
                    ))}
                  </div>

                  <div className="mt-5">
                    {solution.demoUrl ? (
                      <a
                        href={solution.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium rounded transition-colors"
                      >
                        {t('liveDemo')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">{t('comingSoonLabel')}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
