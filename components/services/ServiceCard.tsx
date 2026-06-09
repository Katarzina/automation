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
      className="group relative bg-card border border-white/5 rounded-2xl p-6 hover:border-brand-500/30 transition-all hover:shadow-lg hover:shadow-brand-500/5 flex flex-col"
    >
      <div className="text-3xl mb-4">{icons[service.icon] ?? '✨'}</div>
      <h3 className="font-heading text-lg font-semibold text-white mb-2">{tr.title}</h3>
      <p className="text-sm text-muted leading-relaxed flex-1">{tr.description}</p>
      <span className="mt-4 inline-block text-sm text-brand-400 group-hover:text-accent transition-colors">
        {learnMoreLabel} →
      </span>
    </Link>
  );
}
