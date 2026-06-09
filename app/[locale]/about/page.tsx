import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return { title: t('title'), description: t('description') };
}

const industries = [
  { icon: '🚚', name: 'Logistics' },
  { icon: '🏭', name: 'Manufacturing' },
  { icon: '🛡️', name: 'Insurance' },
  { icon: '📊', name: 'Accounting' },
  { icon: '📣', name: 'Marketing' },
  { icon: '☁️', name: 'SaaS' },
  { icon: '🛒', name: 'E-commerce' },
];

const techs = ['Next.js', 'React', 'Node.js', 'NestJS', 'OpenAI', 'Anthropic', 'n8n', 'PostgreSQL', 'Docker'];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="pt-16">
      <div className="py-20 text-center px-4 bg-gradient-to-b from-brand-50 to-transparent">
        <h1 className="font-heading text-5xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-20">
        {/* Mission */}
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{t('mission.title')}</h2>
          <p className="text-muted leading-relaxed max-w-2xl mx-auto">{t('mission.text')}</p>
        </div>

        {/* Industries */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 text-center mb-8">
            {t('industries.title')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <div key={ind.name} className="bg-card border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{ind.icon}</div>
                <div className="text-sm text-muted">{ind.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-900 text-center mb-8">
            {t('tech.title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech) => (
              <span
                key={tech}
                className="px-5 py-2 bg-card border border-gray-200 rounded-full text-sm text-muted hover:text-gray-900 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-all inline-block"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
