import blogData from '@/data/blog.json';

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export type BlogPost = {
  id: number;
  slug: string;
  category: string;
  date: string;
  cover: string;
  translations: Record<string, { title: string; excerpt: string; blocks: ContentBlock[] }>;
};

const posts = blogData as BlogPost[];

export function getAllBlogPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getBlogPostTranslation(post: BlogPost, locale: string) {
  return post.translations[locale] ?? post.translations['en'];
}
