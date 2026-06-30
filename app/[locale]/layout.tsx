import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import '@/app/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import ChatWidget from '@/components/chat/ChatWidget';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';
import { SITE } from '@/lib/config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE.url}/${l}`;
  }
  return {
    title: {
      default: 'AI Automation Studio',
      template: '%s | AI Automation Studio',
    },
    description: 'AI-powered automation and software development studio. We build Telegram bots, lead qualification systems, landing pages, and full automation solutions.',
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: `${SITE.url}/${locale}`,
      languages: { ...languages, 'x-default': `${SITE.url}/${routing.defaultLocale}` },
    },
    openGraph: {
      type: 'website',
      siteName: 'AI Automation Studio',
      title: 'AI Automation Studio',
      description: 'AI-powered automation and software development studio.',
      images: [{ url: '/og.jpg', width: 1200, height: 632, alt: 'AI Automation Studio' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Automation Studio',
      description: 'AI-powered automation and software development studio.',
      images: ['/og.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    address: { '@type': 'PostalAddress', addressCountry: 'CZ' },
    openingHours: 'Mo-Fr 09:00-18:00',
    description: 'AI automation studio building Telegram bots, CRM automation, and custom software for SMBs.',
    areaServed: ['CZ', 'SK', 'UA'],
  };

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white text-stone-900 flex flex-col min-h-screen">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget locale={locale} />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
