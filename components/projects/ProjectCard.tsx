import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Project } from '@/lib/getProjects';

type Props = {
  project: Project;
  locale: string;
  viewCaseLabel: string;
};

const categoryBadge: Record<string, string> = {
  automation: 'bg-blue-100 text-blue-800',
  agents: 'bg-purple-100 text-purple-800',
  software: 'bg-emerald-100 text-emerald-800',
  landing: 'bg-orange-100 text-orange-800',
};

export default function ProjectCard({ project, locale, viewCaseLabel }: Props) {
  const tr = project.translations[locale] ?? project.translations['en'];
  const badge = categoryBadge[project.category] ?? 'bg-gray-100 text-gray-700';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.cover}
          alt={tr.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs rounded-full capitalize font-medium ${badge}`}>
          {project.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-base font-semibold text-stone-900 mb-1">{tr.title}</h3>
        <p className="text-xs text-gray-400 mb-3">{project.industry}</p>
        <p className="text-sm text-indigo-600 flex-1">{project.result}</p>
        <span className="mt-3 inline-block text-sm text-indigo-600 group-hover:text-indigo-700 transition-colors">
          {viewCaseLabel} →
        </span>
      </div>
    </Link>
  );
}
