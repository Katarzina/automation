import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/getProjects';
import { getAllServices } from '@/lib/getServices';
import { getAllBlogPosts } from '@/lib/getBlogPosts';
import { routing } from '@/routing';
import { SITE } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const staticPaths = ['', '/services', '/solutions', '/pricing', '/about', '/contact', '/faq', '/blog', '/cookies'];
  const projectSlugs = getAllProjects().map((p) => `/projects/${p.slug}`);
  const serviceSlugs = getAllServices().map((s) => `/services/${s.slug}`);
  const blogPosts = getAllBlogPosts();
  const blogSlugs = blogPosts.map((p) => `/blog/${p.slug}`);

  const allPaths = [...staticPaths, ...projectSlugs, ...serviceSlugs];

  const staticEntries = locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: `${SITE.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path === '/blog' ? 0.9 : 0.8,
    }))
  );

  const blogEntries = locales.flatMap((locale) =>
    blogPosts.map((post, i) => ({
      url: `${SITE.url}/${locale}/blog/${blogSlugs[i].replace('/blog/', '')}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...blogEntries];
}
