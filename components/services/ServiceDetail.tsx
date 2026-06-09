import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Service } from '@/lib/getServices';

const serviceImages: Record<string, string> = {
  'ai-automation': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'ai-agents': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
  'custom-software': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  'landing-pages': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
};

type Props = {
  service: Service;
  locale: string;
  index: number;
  getStartedLabel: string;
};

export default function ServiceDetail({ service, locale, index, getStartedLabel }: Props) {
  const tr = service.translations[locale] ?? service.translations['en'];

  return (
    <div className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className={`relative h-80 rounded-2xl overflow-hidden ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
        <Image
          src={serviceImages[service.slug] ?? 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'}
          alt={tr.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="font-heading text-3xl font-bold text-white mb-4">{tr.title}</h2>
        <p className="text-muted mb-4 leading-relaxed">{tr.description}</p>
        <p className="text-gray-300 mb-6 leading-relaxed">{tr.longDescription}</p>
        <ul className="space-y-2 mb-8">
          {service.subServices.map((s) => (
            <li key={s} className="flex items-center gap-2 text-sm text-muted">
              <span className="text-brand-400">✓</span> {s}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-all inline-block"
        >
          {getStartedLabel}
        </Link>
      </div>
    </div>
  );
}
