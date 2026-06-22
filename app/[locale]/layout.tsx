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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://automation-studio.com';

export const metadata: Metadata = {
  title: {
    default: 'AI Automation Studio',
    template: '%s | AI Automation Studio',
  },
  description: 'AI-powered automation and software development studio. We build Telegram bots, lead qualification systems, landing pages, and full automation solutions.',
  metadataBase: new URL(siteUrl),
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

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white text-stone-900 flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
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
