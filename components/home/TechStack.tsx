import { getTranslations } from 'next-intl/server';
import SectionTitle from '@/components/ui/SectionTitle';

const techs = ['Next.js', 'React', 'Node.js', 'NestJS', 'OpenAI', 'Anthropic', 'n8n', 'PostgreSQL', 'Docker'];

export default async function TechStack() {
  const t = await getTranslations('home.tech');

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title={t('title')} />
        <div className="flex flex-wrap justify-center gap-4">
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
    </section>
  );
}
