import projectsData from '@/data/projects.json';

export type ProjectTranslation = {
  title: string;
  challenge: string;
  solution: string;
  result: string;
};

export type Project = {
  id: string;
  slug: string;
  category: string;
  industry: string;
  techStack: string[];
  result: string;
  cover: string;
  images: string[];
  translations: Record<string, ProjectTranslation>;
};

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
