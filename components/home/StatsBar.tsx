import { getTranslations } from 'next-intl/server';

export default async function StatsBar() {
  const t = await getTranslations('home.stats');

  const stats = [
    { value: '50+', label: t('processes') },
    { value: '30+', label: t('hours') },
    { value: '4', label: t('countries') },
  ];

  return (
    <section className="bg-gray-50 border-y border-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-heading text-4xl font-bold text-brand-600">{s.value}</div>
            <div className="mt-2 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
