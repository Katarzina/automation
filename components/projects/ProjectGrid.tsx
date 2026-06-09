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
                ? 'bg-brand-500 text-white'
                : 'border border-gray-200 text-muted hover:text-gray-900 hover:border-gray-300'
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
