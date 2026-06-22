import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Car, Landmark, Shield, BarChart2, Megaphone, Cloud, ShoppingCart, Bike } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return { title: t('title'), description: t('description') };
}

const industries = [
  { icon: Car, name: 'Automotive', color: 'text-blue-700 bg-blue-50' },
  { icon: Landmark, name: 'Banking', color: 'text-emerald-700 bg-emerald-50' },
  { icon: Shield, name: 'Insurance', color: 'text-violet-700 bg-violet-50' },
  { icon: BarChart2, name: 'Accounting', color: 'text-orange-700 bg-orange-50' },
  { icon: Megaphone, name: 'Marketing', color: 'text-pink-700 bg-pink-50' },
  { icon: Cloud, name: 'SaaS', color: 'text-sky-700 bg-sky-50' },
  { icon: ShoppingCart, name: 'E-commerce', color: 'text-amber-700 bg-amber-50' },
  { icon: Bike, name: 'Food Delivery', color: 'text-red-700 bg-red-50' },
];

const techs = ['Next.js', 'React', 'React Native', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'MongoDB', 'Docker', 'OpenAI', 'Claude', 'n8n', 'Groq'];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const experienceItems: string[] = t.raw('experience.items') as string[];
  const qa = [
    { q: t('qa.q1'), a: t('qa.a1') },
    { q: t('qa.q2'), a: t('qa.a2') },
    { q: t('qa.q3'), a: t('qa.a3') },
    { q: t('qa.q4'), a: t('qa.a4') },
  ];

  return (
    <div>
      <div className="bg-gray-50 border-b border-gray-100 py-16 text-center px-4">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-stone-900">{t('title')}</h1>
        <p className="mt-4 text-lg text-gray-500">{t('subtitle')}</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-20 pt-16">

        {/* Bio + photo */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="shrink-0">
              <Image
                src="/images/kateryna.png"
                alt="Kateryna Parfenova"
                width={120}
                height={120}
                className="rounded-2xl object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-stone-900 mb-3">{t('bio.greeting')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('bio.text')}</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {experienceItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-blue-800 mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Q&A chat */}
        <div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 text-center mb-10">
            {t('mission.title')}
          </h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            {qa.map(({ q, a }) => (
              <div key={q} className="space-y-2">
                {/* User question */}
                <div className="flex justify-end">
                  <div className="bg-blue-800 text-white text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-xs md:max-w-sm">
                    {q}
                  </div>
                </div>
                {/* Kateryna answer */}
                <div className="flex items-end gap-3">
                  <Image
                    src="/images/kateryna.png"
                    alt="Kateryna"
                    width={32}
                    height={32}
                    className="rounded-full object-cover shrink-0 mb-0.5"
                  />
                  <div className="bg-gray-100 text-gray-700 text-sm px-4 py-3 rounded-2xl rounded-tl-sm max-w-xs md:max-w-sm">
                    {a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 text-center mb-8">
            {t('industries.title')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industries.map(({ icon: Icon, name, color }) => (
              <div key={name} className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-sm text-gray-600">{name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 text-center mb-8">
            {t('tech.title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech) => (
              <span
                key={tech}
                className="px-5 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-900 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://cal.com/ai-automation-studio-brno/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded transition-colors inline-block"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </div>
  );
}
