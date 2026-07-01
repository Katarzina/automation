import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getAllBlogPosts, getBlogPostBySlug, getBlogPostTranslation } from '@/lib/getBlogPosts';
import type { ContentBlock } from '@/lib/getBlogPosts';
import { buildAlternates } from '@/lib/alternates';
import { calcReadingTime } from '@/lib/readingTime';
import ShareButtons from '@/components/blog/ShareButtons';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const tr = getBlogPostTranslation(post, locale);
  const { SITE } = await import('@/lib/config');
  const url = `${SITE.url}/${locale}/blog/${slug}`;
  const ogImage = post.cover.startsWith('http') ? post.cover : `${SITE.url}${post.cover}`;

  return {
    title: `${tr.title} | AI Automation Studio`,
    description: tr.excerpt,
    openGraph: {
      title: tr.title,
      description: tr.excerpt,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: ['Kateryna Parfenova'],
      images: [{ url: ogImage, width: 1200, height: 630, alt: tr.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tr.title,
      description: tr.excerpt,
      images: [ogImage],
    },
    alternates: buildAlternates(`/blog/${slug}`),
  };
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i} className="font-heading text-xl md:text-2xl font-bold text-stone-900 mt-10 mb-4">{block.text}</h2>;
    case 'p':
      return <p key={i} className="text-stone-600 leading-relaxed mb-5">{block.text}</p>;
    case 'ul':
      return (
        <ul key={i} className="mb-5 space-y-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-stone-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const tr = getBlogPostTranslation(post, locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const categoryLabel = t(`category.${post.category}` as any) ?? post.category;
  const minutes = calcReadingTime(tr.blocks);

  const allPosts = getAllBlogPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1) - (b.category === post.category ? -1 : 1))
    .slice(0, 3);
  const { SITE } = await import('@/lib/config');
  const ogImage = post.cover.startsWith('http') ? post.cover : `${SITE.url}${post.cover}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: tr.title,
    description: tr.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Kateryna Parfenova', url: SITE.url },
    publisher: { '@type': 'Organization', name: 'AI Automation Studio', url: SITE.url },
    image: ogImage,
    url: `${SITE.url}/${locale}/blog/${post.slug}`,
    inLanguage: locale,
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-2xl mx-auto px-6 pt-16">

        {/* Back link */}
        <Link href="/blog" className="inline-block mt-8 text-sm text-stone-400 hover:text-indigo-600 transition-colors">
          {t('backToBlog')}
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mt-6 mb-6 flex-wrap">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
            {categoryLabel}
          </span>
          <span className="text-xs text-stone-400">
            {t('postedOn')} {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="text-xs text-stone-300">·</span>
          <span className="text-xs text-stone-400">{minutes} {t('readingTime')}</span>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-10 leading-tight">
          {tr.title}
        </h1>

        {/* Content */}
        <div className="border-t border-stone-200 pt-10">
          {tr.blocks.map((block, i) => renderBlock(block, i))}
        </div>

        {/* Share */}
        <ShareButtons
          title={tr.title}
          shareLabel={t('share')}
          copyLabel={t('copyLink')}
          copiedLabel={t('copied')}
        />

        {/* CTA */}
        <div className="mt-12 text-center border border-indigo-100 rounded-2xl p-10 bg-indigo-50">
          <p className="text-stone-900 font-semibold text-lg mb-6">{t('ctaTitle')}</p>
          <a
            href="https://cal.com/ai-automation-studio-brno/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {t('ctaButton')}
          </a>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16 pb-8">
            <h2 className="font-heading text-xl font-bold text-stone-900 mb-6">{t('relatedPosts')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((rp) => {
                const rtr = getBlogPostTranslation(rp, locale);
                const rMinutes = calcReadingTime(rtr.blocks);
                return (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="group block bg-white border border-stone-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <p className="text-xs text-stone-400 mb-2">{rMinutes} {t('readingTime')}</p>
                    <p className="text-sm font-semibold text-stone-800 group-hover:text-indigo-600 transition-colors line-clamp-3 leading-snug">
                      {rtr.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
