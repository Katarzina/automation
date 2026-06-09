import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Project } from '@/lib/getProjects';

type Props = {
  project: Project;
  locale: string;
  viewCaseLabel: string;
};

export default function ProjectCard({ project, locale, viewCaseLabel }: Props) {
  const tr = project.translations[locale] ?? project.translations['en'];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-brand-500/30 transition-all flex flex-col"
    >
      <div className="relative h-48 overflow-hidden bg-card">
        <Image
          src={project.cover}
          alt={tr.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/20 capitalize">
          {project.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-base font-semibold text-white mb-1">{tr.title}</h3>
        <p className="text-xs text-muted mb-3">{project.industry}</p>
        <p className="text-sm text-accent flex-1">{project.result}</p>
        <span className="mt-3 inline-block text-sm text-brand-400 group-hover:text-accent transition-colors">
          {viewCaseLabel} →
        </span>
      </div>
    </Link>
  );
}
