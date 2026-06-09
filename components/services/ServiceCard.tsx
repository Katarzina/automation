import { Link } from '@/i18n/navigation';
import type { Service } from '@/lib/getServices';

type Props = {
  service: Service;
  locale: string;
  learnMoreLabel: string;
};

const icons: Record<string, string> = {
  automation: '⚙️',
  agents: '🤖',
  software: '💻',
  landing: '🚀',
};

export default function ServiceCard({ service, locale, learnMoreLabel }: Props) {
  const tr = service.translations[locale] ?? service.translations['en'];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
    >
      <div className="text-3xl mb-4">{icons[service.icon] ?? '✨'}</div>
      <h3 className="font-heading text-lg font-semibold text-stone-900 mb-2">{tr.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed flex-1">{tr.description}</p>
      <span className="mt-4 inline-block text-sm text-indigo-600 group-hover:text-indigo-700 font-medium transition-colors">
        {learnMoreLabel} →
      </span>
    </Link>
  );
}
