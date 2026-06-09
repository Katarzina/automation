'use client';
import { useState } from 'react';
import type { Project } from '@/lib/getProjects';
import ProjectCard from './ProjectCard';

type Filter = { value: string; label: string };

type Props = {
  projects: Project[];
  locale: string;
  filters: Filter[];
  viewCaseLabel: string;
};

export default function ProjectGrid({ projects, locale, filters, viewCaseLabel }: Props) {
  const [active, setActive] = useState('all');
  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-5 py-2 rounded-full text-sm transition-all ${
              active === f.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} locale={locale} viewCaseLabel={viewCaseLabel} />
        ))}
      </div>
    </div>
  );
}
