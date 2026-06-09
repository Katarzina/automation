import { setRequestLocale } from 'next-intl/server';
import CookiesPageClient from './CookiesPageClient';

type Props = { params: Promise<{ locale: string }> };

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="pt-16">
      <CookiesPageClient />
    </div>
  );
}
