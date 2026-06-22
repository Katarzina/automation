import { getTranslations, getLocale } from 'next-intl/server';
import { getAllSolutions } from '@/lib/getSolutions';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import SectionTitle from '@/components/ui/SectionTitle';

const categoryColors: Record<string, string> = {
  landing:    'bg-blue-50 text-blue-700',
  chatbot:    'bg-purple-50 text-purple-700',
  automation: 'bg-green-50 text-green-700',
  software:   'bg-orange-50 text-orange-700',
};

export default async function ProjectsPreview() {
  const t = await getTranslations('home.projects');
  const locale = await getLocale();
  const solutions = getAllSolutions().filter(s => s.status === 'live').slice(0, 3);

  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((solution) => {
            const tr = solution.translations[locale] ?? solution.translations['en'];
            return (
              <div key={solution.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={solution.cover}
                    alt={tr.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 px-2 py-1 text-xs rounded-full capitalize font-medium ${categoryColors[solution.category] ?? 'bg-gray-100 text-gray-600'}`}>
                    {solution.category}
                  </span>
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    Live
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading text-base font-semibold text-stone-900 mb-2">{tr.title}</h3>
                  <p className="text-sm text-gray-500 flex-1 line-clamp-2">{tr.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {solution.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/solutions"
            className="px-6 py-3 border border-stone-300 text-stone-700 hover:bg-stone-900 hover:text-white rounded transition-colors inline-block"
          >
            {t('seeAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
