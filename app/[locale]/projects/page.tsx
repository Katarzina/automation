import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/getProjects';
import ProjectGrid from '@/components/projects/ProjectGrid';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.projects' });
  return { title: t('title'), description: t('description') };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');
  const projects = getAllProjects();

  const filters = [
    { value: 'all', label: t('filters.all') },
    { value: 'automation', label: t('filters.automation') },
    { value: 'agents', label: t('filters.agents') },
    { value: 'software', label: t('filters.software') },
    { value: 'landing', label: t('filters.landing') },
  ];

  return (
    <div className="pt-16">
      <div className="py-20 text-center px-4 bg-gradient-to-b from-brand-50 to-transparent">
        <h1 className="font-heading text-5xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <ProjectGrid
          projects={projects}
          locale={locale}
          filters={filters}
          viewCaseLabel={t('viewCase')}
        />
      </div>
    </div>
  );
}
