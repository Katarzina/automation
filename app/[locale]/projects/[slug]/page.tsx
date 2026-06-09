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
    <div className="pt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumbs */}
        <nav className="flex gap-2 text-sm text-muted mb-8">
          <Link href="/projects" className="hover:text-white transition-colors">
            {t('title')}
          </Link>
          <span>/</span>
          <span className="text-white">{tr.title}</span>
        </nav>

        <h1 className="font-heading text-4xl font-bold text-white mb-4">{tr.title}</h1>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="px-3 py-1 text-xs rounded-full bg-brand-500/20 text-brand-400 capitalize">
            {project.category}
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted">
            {project.industry}
          </span>
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted">
              {tech}
            </span>
          ))}
        </div>

        <div className="space-y-8 mb-12">
          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-3">{t('challenge')}</h2>
            <p className="text-muted leading-relaxed">{tr.challenge}</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-3">{t('solution')}</h2>
            <p className="text-muted leading-relaxed">{tr.solution}</p>
          </div>
          <div className="bg-card border border-white/5 rounded-2xl p-6">
            <h2 className="font-heading text-xl font-semibold text-white mb-3">{t('result')}</h2>
            <p className="text-accent leading-relaxed">{tr.result}</p>
          </div>
        </div>

        <Lightbox images={project.images} alt={tr.title} />

        <div className="mt-16 text-center bg-card border border-white/5 rounded-2xl p-8">
          <h3 className="font-heading text-xl font-semibold text-white mb-2">
            {t('similarChallenge')}
          </h3>
          <Link
            href="/contact"
            className="mt-4 inline-block px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-all"
          >
            {t('letsTalk')}
          </Link>
        </div>
      </div>
    </div>
  );
}
