import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getAllProjects, getProjectBySlug } from '@/lib/getProjects';
import { routing } from '@/routing';
import { Link } from '@/i18n/navigation';
import Lightbox from '@/components/projects/Lightbox';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProjects().map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const tr = project.translations[locale] ?? project.translations['en'];
  return { title: `${tr.title} | AI Automation Studio` };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const tr = project.translations[locale] ?? project.translations['en'];
  const t = await getTranslations('projects');

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumbs */}
        <nav className="flex gap-2 text-sm text-gray-500 mb-8">
          <Link href="/projects" className="hover:text-stone-900 transition-colors">
            {t('title')}
          </Link>
          <span>/</span>
          <span className="text-stone-900">{tr.title}</span>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 mb-4">{tr.title}</h1>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-900 capitalize font-medium">
            {project.category}
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
            {project.industry}
          </span>
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
              {tech}
            </span>
          ))}
        </div>

        <div className="space-y-8 mb-12">
          <div>
            <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t('challenge')}</h2>
            <p className="text-gray-600 leading-relaxed">{tr.challenge}</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t('solution')}</h2>
            <p className="text-gray-600 leading-relaxed">{tr.solution}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-xl font-semibold text-stone-900 mb-3">{t('result')}</h2>
            <p className="text-blue-800 leading-relaxed">{tr.result}</p>
          </div>
        </div>

        <Lightbox images={project.images} alt={tr.title} />

        <div className="mt-16 text-center bg-blue-800 rounded-2xl p-8 text-white">
          <h3 className="font-heading text-xl font-semibold mb-2">
            {t('similarChallenge')}
          </h3>
          <Link
            href="/contact"
            className="mt-4 inline-block px-6 py-3 bg-white text-blue-800 hover:bg-blue-50 rounded font-medium transition-colors"
          >
            {t('letsTalk')}
          </Link>
        </div>
      </div>
    </div>
  );
}
