import { getTranslations } from 'next-intl/server';
import SectionTitle from '@/components/ui/SectionTitle';

const techs = ['Next.js', 'React', 'Node.js', 'NestJS', 'OpenAI', 'Anthropic', 'n8n', 'PostgreSQL', 'Docker'];

export default async function TechStack() {
  const t = await getTranslations('home.tech');

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title={t('title')} />
        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((tech) => (
            <span
              key={tech}
              className="px-5 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-muted hover:text-gray-900 hover:border-brand-500/30 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
