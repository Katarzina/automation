import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Service } from '@/lib/getServices';

const serviceImages: Record<string, string> = {
  'ai-automation': '/images/services/ai-automation.png',
  'ai-agents': '/images/services/ai-agents.png',
  'custom-software': '/images/services/custom-software.png',
  'chatbots': '/images/services/chatbots.png',
  'landing-pages': '/images/services/landing-pages.png',
};

type Props = {
  service: Service;
  locale: string;
  index: number;
  getStartedLabel: string;
  priority?: boolean;
};

export default function ServiceDetail({ service, locale, index, getStartedLabel, priority = false }: Props) {
  const tr = service.translations[locale] ?? service.translations['en'];

  return (
    <div className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className={`relative h-80 rounded-2xl overflow-hidden ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
        <Image
          src={serviceImages[service.slug] ?? 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'}
          alt={tr.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="font-heading text-3xl font-bold text-stone-900 mb-4">{tr.title}</h2>
        <p className="text-gray-500 mb-4 leading-relaxed">{tr.description}</p>
        <p className="text-gray-600 mb-6 leading-relaxed">{tr.longDescription}</p>
        <ul className="space-y-2 mb-8">
          {service.subServices.map((s) => (
            <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-blue-800">✓</span> {s}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded transition-colors inline-block"
        >
          {getStartedLabel}
        </Link>
      </div>
    </div>
  );
}
