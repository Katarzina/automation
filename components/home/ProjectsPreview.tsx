import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { getAllProjects } from '@/lib/getProjects';
import ProjectCard from '@/components/projects/ProjectCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { Link } from '@/i18n/navigation';

export default async function ProjectsPreview() {
  const t = await getTranslations('home.projects');
  const locale = await getLocale();
  const projects = getAllProjects().slice(0, 3);

  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} viewCaseLabel="View case" />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="px-6 py-3 border border-stone-300 text-stone-700 hover:bg-stone-900 hover:text-white rounded transition-colors inline-block"
          >
            {t('seeAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
