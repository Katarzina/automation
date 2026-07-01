import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getAllBlogPosts, getBlogPostTranslation } from '@/lib/getBlogPosts';
import { buildAlternates } from '@/lib/alternates';
import { calcReadingTime } from '@/lib/readingTime';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates('/blog'),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-stone-900 mb-4">{t('title')}</h1>
          <p className="text-stone-500 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const tr = getBlogPostTranslation(post, locale);
            const categoryLabel = t(`category.${post.category}` as any) ?? post.category;
            const minutes = calcReadingTime(tr.blocks);

            return (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="h-full bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={tr.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full bg-indigo-600 text-white">
                      {categoryLabel}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-stone-400 mb-3 flex items-center gap-2">
                      <span>{t('postedOn')} {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>·</span>
                      <span>{minutes} {t('readingTime')}</span>
                    </p>
                    <h2 className="font-heading text-lg font-semibold text-stone-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {tr.title}
                    </h2>
                    <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 mb-4">{tr.excerpt}</p>
                    <span className="text-indigo-600 text-sm font-medium">{t('readMore')} →</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
