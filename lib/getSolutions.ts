import data from '@/data/solutions.json';

export type Solution = {
  id: string;
  slug: string;
  category: string;
  techStack: string[];
  demoUrl: string | null;
  status: 'live' | 'coming-soon';
  cover: string;
  translations: Record<string, { title: string; description: string }>;
};

export function getAllSolutions(): Solution[] {
  return data as Solution[];
}
