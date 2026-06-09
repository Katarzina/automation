import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/getProjects';
import { getAllServices } from '@/lib/getServices';
import { routing } from '@/routing';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://automation-studio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const staticPaths = ['', '/services', '/projects', '/about', '/contact', '/cookies'];
  const projectSlugs = getAllProjects().map((p) => `/projects/${p.slug}`);
  const serviceSlugs = getAllServices().map((s) => `/services/${s.slug}`);
  const allPaths = [...staticPaths, ...projectSlugs, ...serviceSlugs];

  return locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  );
}
