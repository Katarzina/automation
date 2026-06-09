# AI Automation Studio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete multilingual (EN/CS/UK/RU) marketing website for AI Automation Studio per `AUTOMATION_STUDIO_INSTRUCTIONS.md`.

**Architecture:** Next.js 16 App Router with `app/[locale]/` structure, next-intl 4 for i18n routing, JSON files as CMS (`data/`), Tailwind CSS v4 (CSS-based config via `@theme`), Framer Motion for animations.

**Tech Stack:** Next.js 16.2.7, React 19, TypeScript 5, Tailwind CSS 4 (`@tailwindcss/postcss`), next-intl 4.13, Framer Motion 12, yet-another-react-lightbox

---

## Critical API Notes (read before coding)

**Next.js 16:** `params` and `searchParams` are now `Promise<{...}>` — always `await params`.

**Tailwind v4:** No `tailwind.config.ts`. All theme tokens go in `globals.css` under `@theme { ... }`. Use `--color-*` CSS variables. Classes like `bg-brand-500`, `text-accent`, `bg-dark` work via these tokens.

**next-intl 4:**
- `defineRouting` from `next-intl/routing`
- `createMiddleware` (default export) from `next-intl/middleware`
- `NextIntlClientProvider` from `next-intl`
- `getMessages`, `getTranslations`, `setRequestLocale` from `next-intl/server`
- `useTranslations` from `next-intl` (client components)
- `createNavigation` from `next-intl/navigation` → typed `Link`, `useRouter`, `usePathname`
- Plugin: `createNextIntlPlugin` from `next-intl/plugin` in `next.config.ts`
- Config file: `i18n/request.ts` (default path the plugin looks for)

---

## File Map

```
# i18n / routing
routing.ts                                  defineRouting (locales config)
middleware.ts                               createMiddleware wrapper + matcher
i18n/request.ts                             getRequestConfig (load messages per locale)
i18n/navigation.ts                          createNavigation (typed Link, useRouter)

# messages
messages/en.json                            English (primary) — full content from spec §7
messages/cs.json                            Czech
messages/uk.json                            Ukrainian
messages/ru.json                            Russian

# data
data/services.json                          4 services — full structure from spec §6
data/projects.json                          8 projects — full structure from spec §6

# lib
lib/getServices.ts                          read + type data/services.json
lib/getProjects.ts                          read + type data/projects.json

# app root
next.config.ts                              add createNextIntlPlugin wrapper
app/globals.css                             Tailwind v4 @theme tokens + base styles
app/layout.tsx                              minimal root layout (no html wrapping — locale layout does it)
app/page.tsx                                redirect to /en

# locale layout + pages
app/[locale]/layout.tsx                     NextIntlClientProvider, Header, Footer, fonts
app/[locale]/page.tsx                       Home (all 6 sections)
app/[locale]/services/page.tsx             Services list
app/[locale]/services/[slug]/page.tsx      Service detail
app/[locale]/projects/page.tsx             Projects grid + filter
app/[locale]/projects/[slug]/page.tsx      Project detail + lightbox
app/[locale]/about/page.tsx               About
app/[locale]/contact/page.tsx             Contact form
app/[locale]/contact/actions.ts            Server Action for form submit
app/[locale]/cookies/page.tsx             Cookie settings

# SEO
app/sitemap.ts                             all locales × all pages × all slugs
app/robots.ts                              robots.txt

# layout components
components/layout/Header.tsx              nav + LanguageSwitcher
components/layout/Footer.tsx              links + copyright
components/layout/CookieBanner.tsx        bottom cookie consent bar

# ui components
components/ui/LanguageSwitcher.tsx        locale switcher dropdown
components/ui/SectionTitle.tsx            reusable section heading
components/ui/ContactForm.tsx             form with server action

# home sections
components/home/HeroSection.tsx           full-screen hero
components/home/StatsBar.tsx              3 stats strip
components/home/ServicesPreview.tsx       4-card services grid
components/home/ProjectsPreview.tsx       3 featured projects
components/home/TechStack.tsx            logos row
components/home/CtaBanner.tsx            bottom CTA strip

# service components
components/services/ServiceCard.tsx       card used on home + services list
components/services/ServiceDetail.tsx     full service block (alternating layout)

# project components
components/projects/ProjectCard.tsx       card with cover + overlay
components/projects/ProjectGrid.tsx       grid with client-side filter
components/projects/Lightbox.tsx          yet-another-react-lightbox wrapper
```

---

## Task 1: next.config.ts + i18n wiring

**Files:**
- Modify: `next.config.ts`
- Create: `routing.ts`
- Create: `i18n/request.ts`
- Create: `i18n/navigation.ts`
- Modify: `middleware.ts`

- [ ] **Step 1: Update next.config.ts**

```ts
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 2: Create routing.ts**

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'cs', 'uk', 'ru'] as const,
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];
```

- [ ] **Step 3: Create i18n/request.ts**

```ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from '../routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Create i18n/navigation.ts**

```ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from '../routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

- [ ] **Step 5: Update middleware.ts**

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

- [ ] **Step 6: Verify build compiles**

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors about next-intl config missing.

- [ ] **Step 7: Commit**

```bash
git add next.config.ts routing.ts middleware.ts i18n/
git commit -m "feat: wire next-intl 4 routing and middleware"
```

---

## Task 2: Message files

**Files:**
- Create: `messages/en.json`
- Create: `messages/cs.json`
- Create: `messages/uk.json`
- Create: `messages/ru.json`

- [ ] **Step 1: Create messages/en.json**

Copy the full JSON from spec §7 verbatim. The structure is:
`nav`, `home.hero`, `home.stats`, `home.services`, `home.projects`, `home.tech`, `home.cta`, `services`, `projects` (filters, labels), `about`, `contact.form`, `contact.info`, `cookies`, `cookieBanner`, `footer`, `meta`.

- [ ] **Step 2: Create cs.json, uk.json, ru.json**

Same keys as en.json. Translate all values using the translations provided in `data/services.json` and `data/projects.json` in the spec (those include cs/uk/ru for service/project content). For nav, home, about, contact, cookies, footer, meta keys — translate directly from the English spec structure.

The Czech/Ukrainian/Russian nav and UI strings are:
- cs: nav.home=Domů, nav.services=Služby, nav.projects=Projekty, nav.about=O nás, nav.contact=Kontakt, nav.getStarted=Začít
- uk: nav.home=Головна, nav.services=Послуги, nav.projects=Проекти, nav.about=Про нас, nav.contact=Контакт, nav.getStarted=Розпочати
- ru: nav.home=Главная, nav.services=Услуги, nav.projects=Проекты, nav.about=О нас, nav.contact=Контакт, nav.getStarted=Начать

Keep the same key structure as en.json for all locales.

- [ ] **Step 3: Commit**

```bash
git add messages/
git commit -m "feat: add i18n message files for 4 locales"
```

---

## Task 3: Data files + lib helpers

**Files:**
- Create: `data/services.json`
- Create: `data/projects.json`
- Create: `lib/getServices.ts`
- Create: `lib/getProjects.ts`

- [ ] **Step 1: Create data/services.json**

Copy verbatim from spec §6. Array of 4 objects, each with:
`slug`, `icon`, `color`, `subServices[]`, `translations.{en,cs,uk,ru}.{title,description,longDescription}`

- [ ] **Step 2: Create data/projects.json**

Copy verbatim from spec §6. Array of 8 objects, each with:
`id`, `slug`, `category`, `industry`, `techStack[]`, `result`, `cover`, `images[]`, `translations.{en,cs,uk,ru}.{title,challenge,solution,result}`

- [ ] **Step 3: Create lib/getServices.ts**

```ts
import servicesData from '@/data/services.json';

export type ServiceTranslation = {
  title: string;
  description: string;
  longDescription: string;
};

export type Service = {
  slug: string;
  icon: string;
  color: string;
  subServices: string[];
  translations: Record<string, ServiceTranslation>;
};

export function getAllServices(): Service[] {
  return servicesData as Service[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getAllServices().find((s) => s.slug === slug);
}
```

- [ ] **Step 4: Create lib/getProjects.ts**

```ts
import projectsData from '@/data/projects.json';

export type ProjectTranslation = {
  title: string;
  challenge: string;
  solution: string;
  result: string;
};

export type Project = {
  id: string;
  slug: string;
  category: string;
  industry: string;
  techStack: string[];
  result: string;
  cover: string;
  images: string[];
  translations: Record<string, ProjectTranslation>;
};

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
```

- [ ] **Step 5: Commit**

```bash
git add data/ lib/
git commit -m "feat: add data files and lib helpers"
```

---

## Task 4: Tailwind v4 theme + global styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css**

```css
@import "tailwindcss";

@theme {
  /* Brand colors */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-400: #818cf8;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-900: #1e1b4b;

  /* Accent + neutral */
  --color-accent: #06b6d4;
  --color-dark: #0a0a0f;
  --color-card: #12121a;
  --color-muted: #6b7280;

  /* Fonts */
  --font-heading: var(--font-space-grotesk);
  --font-body: var(--font-inter);
}

* {
  box-sizing: border-box;
}

html {
  background-color: #0a0a0f;
  color: #f9fafb;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-inter), system-ui, sans-serif;
  background-color: #0a0a0f;
  color: #f9fafb;
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-space-grotesk), system-ui, sans-serif;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: configure Tailwind v4 theme tokens"
```

---

## Task 5: Root layout + locale layout

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Create: `app/[locale]/layout.tsx`

- [ ] **Step 1: Simplify app/layout.tsx (root — no HTML wrapper, locale layout handles it)**

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 2: Update app/page.tsx to redirect to default locale**

```tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en');
}
```

- [ ] **Step 3: Create app/[locale]/layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import '@/app/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';

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

export const metadata: Metadata = {
  title: 'AI Automation Studio',
  description: 'AI-powered automation and software development studio',
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
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-dark text-gray-100 flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev 2>&1 &
sleep 5
curl -s http://localhost:3000 -o /dev/null -w "%{http_code}"
```

Expected: 200 (or 307 redirect to /en)

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/page.tsx app/[locale]/layout.tsx
git commit -m "feat: set up locale layout with fonts and providers"
```

---

## Task 6: Layout components (Header, Footer, CookieBanner)

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/CookieBanner.tsx`
- Create: `components/ui/LanguageSwitcher.tsx`

- [ ] **Step 1: Create components/ui/LanguageSwitcher.tsx**

Client component. Uses `useRouter`, `usePathname` from `i18n/navigation`. Renders 4 locale buttons (EN / CS / UK / RU).

```tsx
'use client';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const locales = ['en', 'cs', 'uk', 'ru'] as const;

  return (
    <div className="flex gap-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`px-2 py-1 text-xs rounded uppercase transition-colors ${
            locale === l
              ? 'bg-brand-500 text-white'
              : 'text-muted hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create components/layout/Header.tsx**

Client component (needs locale-aware Link and mobile menu state). Nav links: Home (`/`), Services (`/services`), Projects (`/projects`), About (`/about`), Contact (`/contact`). CTA button "Get Started" → `/contact`. Include hamburger menu for mobile.

```tsx
'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-dark/80 backdrop-blur border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-lg text-white">
          AI Automation Studio
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm text-muted hover:text-white transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {t('getStarted')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-white/5 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Create components/layout/Footer.tsx**

Server component. Shows logo, tagline (`footer.tagline`), nav links, cookie settings link, copyright (`footer.rights`).

```tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <span className="font-heading font-bold text-lg text-white">AI Automation Studio</span>
            <p className="mt-2 text-sm text-muted">{t('footer.tagline')}</p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-muted">
            <Link href="/services" className="hover:text-white transition-colors">{t('nav.services')}</Link>
            <Link href="/projects" className="hover:text-white transition-colors">{t('nav.projects')}</Link>
            <Link href="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
            <Link href="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">{t('footer.cookieSettings')}</Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-xs text-muted">
          © {year} AI Automation Studio. {t('footer.rights')}.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Create components/layout/CookieBanner.tsx**

Client component. Reads `localStorage.cookie_consent`. Shows bottom banner with Accept All / Customize buttons. On accept, writes to localStorage and hides. Customize links to `/cookies`.

```tsx
'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function CookieBanner() {
  const t = useTranslations('cookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-card border-t border-white/10 p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {t('text')}{' '}
          <Link href="/cookies" className="text-brand-400 hover:underline">{t('link')}</Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <Link href="/cookies" className="px-4 py-2 text-sm border border-white/10 rounded-lg text-muted hover:text-white transition-colors">
            {t('settings')}
          </Link>
          <button onClick={accept} className="px-4 py-2 text-sm bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/
git commit -m "feat: add Header, Footer, CookieBanner, LanguageSwitcher"
```

---

## Task 7: Shared UI components

**Files:**
- Create: `components/ui/SectionTitle.tsx`

- [ ] **Step 1: Create components/ui/SectionTitle.tsx**

```tsx
type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function SectionTitle({ title, subtitle, center = true }: Props) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/SectionTitle.tsx
git commit -m "feat: add SectionTitle UI component"
```

---

## Task 8: Home page — HeroSection + StatsBar

**Files:**
- Create: `components/home/HeroSection.tsx`
- Create: `components/home/StatsBar.tsx`

- [ ] **Step 1: Create components/home/HeroSection.tsx**

Client component (Framer Motion animations). Full-screen with animated gradient heading "Automate. Scale. Grow.", subtext, two CTA buttons ("See Our Work" → `/projects`, "Get Free Consultation" → `/contact`). Background: dark with gradient glow.

```tsx
'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
      {/* Dot grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-brand-400 via-accent to-brand-400 bg-clip-text text-transparent">
              {t('tagline')}
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-all hover:scale-105"
            >
              {t('ctaWork')}
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-white/10 hover:border-brand-500/50 text-white font-medium rounded-xl transition-all backdrop-blur hover:bg-white/5"
            >
              {t('ctaConsult')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create components/home/StatsBar.tsx**

```tsx
import { getTranslations } from 'next-intl/server';

export default async function StatsBar() {
  const t = await getTranslations('home.stats');

  const stats = [
    { value: '50+', label: t('processes') },
    { value: '30+', label: t('hours') },
    { value: '4', label: t('countries') },
  ];

  return (
    <section className="bg-card border-y border-white/5 py-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-heading text-4xl font-bold text-brand-400">{s.value}</div>
            <div className="mt-2 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/HeroSection.tsx components/home/StatsBar.tsx
git commit -m "feat: add HeroSection and StatsBar"
```

---

## Task 9: ServiceCard + ServicesPreview

**Files:**
- Create: `components/services/ServiceCard.tsx`
- Create: `components/home/ServicesPreview.tsx`

- [ ] **Step 1: Create components/services/ServiceCard.tsx**

```tsx
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
      className="group relative bg-card border border-white/5 rounded-2xl p-6 hover:border-brand-500/30 transition-all hover:shadow-lg hover:shadow-brand-500/5"
    >
      <div className="text-3xl mb-4">{icons[service.icon] ?? '✨'}</div>
      <h3 className="font-heading text-lg font-semibold text-white mb-2">{tr.title}</h3>
      <p className="text-sm text-muted leading-relaxed">{tr.description}</p>
      <span className="mt-4 inline-block text-sm text-brand-400 group-hover:text-accent transition-colors">
        {learnMoreLabel} →
      </span>
    </Link>
  );
}
```

- [ ] **Step 2: Create components/home/ServicesPreview.tsx**

Server component. Loads all services, renders 2×2 grid on desktop.

```tsx
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { getAllServices } from '@/lib/getServices';
import ServiceCard from '@/components/services/ServiceCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { Link } from '@/i18n/navigation';

export default async function ServicesPreview() {
  const t = await getTranslations('home.services');
  const locale = await getLocale();
  const services = getAllServices();

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <SectionTitle title={t('title')} subtitle={t('subtitle')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} locale={locale} learnMoreLabel="Learn more" />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/services/ServiceCard.tsx components/home/ServicesPreview.tsx
git commit -m "feat: add ServiceCard and ServicesPreview"
```

---

## Task 10: ProjectCard + ProjectsPreview + TechStack + CtaBanner

**Files:**
- Create: `components/projects/ProjectCard.tsx`
- Create: `components/home/ProjectsPreview.tsx`
- Create: `components/home/TechStack.tsx`
- Create: `components/home/CtaBanner.tsx`

- [ ] **Step 1: Create components/projects/ProjectCard.tsx**

```tsx
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Project } from '@/lib/getProjects';

type Props = {
  project: Project;
  locale: string;
  viewCaseLabel: string;
};

export default function ProjectCard({ project, locale, viewCaseLabel }: Props) {
  const tr = project.translations[locale] ?? project.translations['en'];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-brand-500/30 transition-all"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.cover}
          alt={tr.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/20 capitalize">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-base font-semibold text-white mb-1">{tr.title}</h3>
        <p className="text-xs text-muted mb-3">{project.industry}</p>
        <p className="text-sm text-accent">{project.result}</p>
        <span className="mt-3 inline-block text-sm text-brand-400 group-hover:text-accent transition-colors">
          {viewCaseLabel} →
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create components/home/ProjectsPreview.tsx**

Server component. Shows first 3 projects from `getAllProjects()`.

```tsx
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { getAllProjects } from '@/lib/getProjects';
import ProjectCard from '@/components/projects/ProjectCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { Link } from '@/i18n/navigation';

export default async function ProjectsPreview() {
  const t = await getTranslations('home.projects');
  const locale = await getLocale();
  const projects = getAllProjects().slice(0, 3);

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} viewCaseLabel={t('seeAll').replace('See All', 'View case')} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/projects" className="px-6 py-3 border border-white/10 hover:border-brand-500/50 text-white rounded-xl transition-all">
            {t('seeAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create components/home/TechStack.tsx**

```tsx
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
              className="px-5 py-2 bg-card border border-white/5 rounded-full text-sm text-muted hover:text-white hover:border-brand-500/30 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create components/home/CtaBanner.tsx**

```tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function CtaBanner() {
  const t = await getTranslations('home.cta');

  return (
    <section className="py-24 px-4 bg-gradient-to-r from-brand-900/50 to-dark border-y border-white/5">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">{t('title')}</h2>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
        <Link
          href="/contact"
          className="mt-8 inline-block px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-all hover:scale-105"
        >
          {t('button')}
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/projects/ProjectCard.tsx components/home/
git commit -m "feat: add ProjectCard, ProjectsPreview, TechStack, CtaBanner"
```

---

## Task 11: Home page assembly

**Files:**
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: Create app/[locale]/page.tsx**

Server component. `setRequestLocale`, `generateMetadata`, assemble all 6 sections.

```tsx
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import TechStack from '@/components/home/TechStack';
import CtaBanner from '@/components/home/CtaBanner';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return { title: t('title'), description: t('description') };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesPreview />
      <ProjectsPreview />
      <TechStack />
      <CtaBanner />
    </>
  );
}
```

- [ ] **Step 2: Verify home page renders at localhost:3000/en**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000/en | grep -c "Automate"
```

Expected: `1` (h1 content present in HTML)

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: assemble home page with all sections"
```

---

## Task 12: Services pages

**Files:**
- Create: `components/services/ServiceDetail.tsx`
- Create: `app/[locale]/services/page.tsx`
- Create: `app/[locale]/services/[slug]/page.tsx`

- [ ] **Step 1: Create components/services/ServiceDetail.tsx**

Full service block with alternating image/text layout. Shows title, description, `longDescription`, `subServices` list, and "Get started" CTA. Even-index = image left; odd-index = image right.

```tsx
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
  const imageLeft = index % 2 === 0;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 ${imageLeft ? '' : 'lg:[direction:rtl]'}`}>
      <div className="relative h-80 rounded-2xl overflow-hidden lg:[direction:ltr]">
        <Image src={serviceImages[service.slug] || ''} alt={tr.title} fill className="object-cover" />
      </div>
      <div className="lg:[direction:ltr]">
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
          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-all"
        >
          {getStartedLabel}
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create app/[locale]/services/page.tsx**

```tsx
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAllServices } from '@/lib/getServices';
import ServiceDetail from '@/components/services/ServiceDetail';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.services' });
  return { title: t('title'), description: t('description') };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const services = getAllServices();

  return (
    <div className="pt-16">
      <div className="py-20 text-center px-4 bg-gradient-to-b from-brand-900/20 to-transparent">
        <h1 className="font-heading text-5xl font-bold text-white">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 divide-y divide-white/5">
        {services.map((service, i) => (
          <ServiceDetail key={service.slug} service={service} locale={locale} index={i} getStartedLabel={t('getStarted')} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create app/[locale]/services/[slug]/page.tsx**

```tsx
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getAllServices, getServiceBySlug } from '@/lib/getServices';
import { routing } from '@/routing';
import ServiceDetail from '@/components/services/ServiceDetail';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllServices().map((s) => ({ locale, slug: s.slug }))
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const t = await getTranslations('services');

  return (
    <div className="pt-16 max-w-6xl mx-auto px-4">
      <ServiceDetail service={service} locale={locale} index={0} getStartedLabel={t('getStarted')} />
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/services/ServiceDetail.tsx app/[locale]/services/
git commit -m "feat: add services pages"
```

---

## Task 13: Projects pages

**Files:**
- Create: `components/projects/ProjectGrid.tsx`
- Create: `components/projects/Lightbox.tsx`
- Create: `app/[locale]/projects/page.tsx`
- Create: `app/[locale]/projects/[slug]/page.tsx`

- [ ] **Step 1: Create components/projects/ProjectGrid.tsx**

Client component with filter state. Receives all projects as props, filters client-side by category.

```tsx
'use client';
import { useState } from 'react';
import type { Project } from '@/lib/getProjects';
import ProjectCard from './ProjectCard';

type Props = {
  projects: Project[];
  locale: string;
  filters: { value: string; label: string }[];
  viewCaseLabel: string;
};

export default function ProjectGrid({ projects, locale, filters, viewCaseLabel }: Props) {
  const [active, setActive] = useState('all');
  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-5 py-2 rounded-full text-sm transition-all ${
              active === f.value
                ? 'bg-brand-500 text-white'
                : 'border border-white/10 text-muted hover:text-white hover:border-white/30'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} locale={locale} viewCaseLabel={viewCaseLabel} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create components/projects/Lightbox.tsx**

Client component wrapping `yet-another-react-lightbox`.

```tsx
'use client';
import { useState } from 'react';
import YARLightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';

type Props = { images: string[]; alt: string };

export default function Lightbox({ images, alt }: Props) {
  const [index, setIndex] = useState(-1);
  const slides = images.map((src) => ({ src }));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button key={src} onClick={() => setIndex(i)} className="relative h-48 rounded-xl overflow-hidden group">
            <Image src={src} alt={`${alt} ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform" />
          </button>
        ))}
      </div>
      <YARLightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </>
  );
}
```

- [ ] **Step 3: Create app/[locale]/projects/page.tsx**

```tsx
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/getProjects';
import ProjectGrid from '@/components/projects/ProjectGrid';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.projects' });
  return { title: t('title'), description: t('description') };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');
  const projects = getAllProjects();

  const filters = [
    { value: 'all', label: t('filters.all') },
    { value: 'automation', label: t('filters.automation') },
    { value: 'agents', label: t('filters.agents') },
    { value: 'software', label: t('filters.software') },
    { value: 'landing', label: t('filters.landing') },
  ];

  return (
    <div className="pt-16">
      <div className="py-20 text-center px-4 bg-gradient-to-b from-brand-900/20 to-transparent">
        <h1 className="font-heading text-5xl font-bold text-white">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <ProjectGrid projects={projects} locale={locale} filters={filters} viewCaseLabel={t('viewCase')} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create app/[locale]/projects/[slug]/page.tsx**

```tsx
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getAllProjects, getProjectBySlug } from '@/lib/getProjects';
import { routing } from '@/routing';
import { Link } from '@/i18n/navigation';
import Lightbox from '@/components/projects/Lightbox';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProjects().map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const tr = project.translations[locale] ?? project.translations['en'];
  const t = await getTranslations('projects');

  return (
    <div className="pt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumbs */}
        <nav className="flex gap-2 text-sm text-muted mb-8">
          <Link href="/projects" className="hover:text-white transition-colors">{t('title')}</Link>
          <span>/</span>
          <span className="text-white">{tr.title}</span>
        </nav>

        <h1 className="font-heading text-4xl font-bold text-white mb-4">{tr.title}</h1>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="px-3 py-1 text-xs rounded-full bg-brand-500/20 text-brand-400 capitalize">{project.category}</span>
          <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted">{project.industry}</span>
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted">{tech}</span>
          ))}
        </div>

        <div className="space-y-8 mb-12">
          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-3">{t('challenge')}</h2>
            <p className="text-muted leading-relaxed">{tr.challenge}</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-white mb-3">{t('solution')}</h2>
            <p className="text-muted leading-relaxed">{tr.solution}</p>
          </div>
          <div className="bg-card border border-white/5 rounded-2xl p-6">
            <h2 className="font-heading text-xl font-semibold text-white mb-3">{t('result')}</h2>
            <p className="text-accent leading-relaxed">{tr.result}</p>
          </div>
        </div>

        <Lightbox images={project.images} alt={tr.title} />

        <div className="mt-16 text-center bg-card border border-white/5 rounded-2xl p-8">
          <h3 className="font-heading text-xl font-semibold text-white mb-2">{t('similarChallenge')}</h3>
          <Link href="/contact" className="mt-4 inline-block px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-all">
            {t('letsTalk')}
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/projects/ app/[locale]/projects/
git commit -m "feat: add projects pages with lightbox and filter"
```

---

## Task 14: About page

**Files:**
- Create: `app/[locale]/about/page.tsx`

- [ ] **Step 1: Create app/[locale]/about/page.tsx**

Sections: hero, mission, 4 service pillars, tech stack grid, industries grid, CTA.

```tsx
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return { title: t('title'), description: t('description') };
}

const industries = [
  { icon: '🚚', name: 'Logistics' },
  { icon: '🏭', name: 'Manufacturing' },
  { icon: '🛡️', name: 'Insurance' },
  { icon: '📊', name: 'Accounting' },
  { icon: '📣', name: 'Marketing' },
  { icon: '☁️', name: 'SaaS' },
  { icon: '🛒', name: 'E-commerce' },
];

const techs = ['Next.js', 'React', 'Node.js', 'NestJS', 'OpenAI', 'Anthropic', 'n8n', 'PostgreSQL', 'Docker'];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="pt-16">
      <div className="py-20 text-center px-4 bg-gradient-to-b from-brand-900/20 to-transparent">
        <h1 className="font-heading text-5xl font-bold text-white">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-20">
        {/* Mission */}
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-white mb-4">{t('mission.title')}</h2>
          <p className="text-muted leading-relaxed">{t('mission.text')}</p>
        </div>

        {/* Industries */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-white text-center mb-8">{t('industries.title')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <div key={ind.name} className="bg-card border border-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{ind.icon}</div>
                <div className="text-sm text-muted">{ind.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-white text-center mb-8">{t('tech.title')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech) => (
              <span key={tech} className="px-5 py-2 bg-card border border-white/5 rounded-full text-sm text-muted">{tech}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/contact" className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-all">
            {t('cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/about/page.tsx
git commit -m "feat: add about page"
```

---

## Task 15: Contact page + Server Action

**Files:**
- Create: `components/ui/ContactForm.tsx`
- Create: `app/[locale]/contact/actions.ts`
- Create: `app/[locale]/contact/page.tsx`

- [ ] **Step 1: Create app/[locale]/contact/actions.ts**

Server Action. Uses Resend API if `RESEND_API_KEY` is set, otherwise logs to console (dev fallback).

```ts
'use server';

export type FormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string;
  const service = formData.get('service') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  const emailTo = process.env.EMAIL_TO ?? 'hello@automation-studio.com';
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: emailTo,
        subject: `New contact: ${name} — ${service}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\n\n${message}`,
      }),
    });
    if (!res.ok) return { success: false, message: 'Something went wrong. Please try again.' };
  } else {
    console.log('[Contact form]', { name, email, company, service, message });
  }

  return { success: true, message: 'Message sent! We'll be in touch within 24 hours.' };
}
```

- [ ] **Step 2: Create components/ui/ContactForm.tsx**

Client component using `useActionState` (React 19) with the Server Action.

```tsx
'use client';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { submitContactForm, type FormState } from '@/app/[locale]/contact/actions';

const initial: FormState = { success: false, message: '' };

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [state, action, pending] = useActionState(submitContactForm, initial);

  if (state.success) {
    return (
      <div className="bg-card border border-white/5 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <p className="text-white font-medium">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-muted mb-1">{t('name')} *</label>
          <input name="name" required className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500" />
        </div>
        <div>
          <label className="block text-sm text-muted mb-1">{t('email')} *</label>
          <input name="email" type="email" required className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-muted mb-1">{t('company')}</label>
        <input name="company" className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500" />
      </div>
      <div>
        <label className="block text-sm text-muted mb-1">{t('service')}</label>
        <select name="service" className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500">
          <option value="automation">{t('serviceOptions.automation')}</option>
          <option value="agents">{t('serviceOptions.agents')}</option>
          <option value="software">{t('serviceOptions.software')}</option>
          <option value="landing">{t('serviceOptions.landing')}</option>
          <option value="other">{t('serviceOptions.other')}</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-muted mb-1">{t('message')} *</label>
        <textarea name="message" rows={5} required className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 resize-none" />
      </div>
      {state.message && !state.success && (
        <p className="text-red-400 text-sm">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-medium rounded-xl transition-all"
      >
        {pending ? t('sending') : t('send')}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Create app/[locale]/contact/page.tsx**

```tsx
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactForm from '@/components/ui/ContactForm';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return { title: t('title'), description: t('description') };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <div className="pt-16">
      <div className="py-20 text-center px-4 bg-gradient-to-b from-brand-900/20 to-transparent">
        <h1 className="font-heading text-5xl font-bold text-white">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold text-white mb-4">AI Automation Studio</h3>
              <div className="space-y-3 text-sm text-muted">
                <p>📍 {t('info.location')}</p>
                <p>✉️ {t('info.email')}</p>
                <p>🕐 {t('info.hours')}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/ContactForm.tsx app/[locale]/contact/
git commit -m "feat: add contact page with server action"
```

---

## Task 16: Cookies page

**Files:**
- Create: `app/[locale]/cookies/page.tsx`

- [ ] **Step 1: Create app/[locale]/cookies/page.tsx**

Client component with toggle state for analytics + marketing. Saves to `localStorage.cookie_consent`.

```tsx
'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Prefs = { necessary: boolean; analytics: boolean; marketing: boolean };

export default function CookiesPage() {
  const t = useTranslations('cookies');
  const [prefs, setPrefs] = useState<Prefs>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cookie_consent');
      if (saved) setPrefs(JSON.parse(saved));
    } catch {}
  }, []);

  const save = (next: Prefs) => {
    setPrefs(next);
    localStorage.setItem('cookie_consent', JSON.stringify(next));
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${value ? 'bg-brand-500' : 'bg-white/10'}`}
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform mt-1 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="pt-16 max-w-2xl mx-auto px-4 py-20">
      <h1 className="font-heading text-4xl font-bold text-white mb-4">{t('title')}</h1>
      <p className="text-muted mb-10">{t('intro')}</p>

      <div className="space-y-4">
        {/* Necessary */}
        <div className="bg-card border border-white/5 rounded-2xl p-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white">{t('necessary.title')}</h3>
            <p className="text-sm text-muted mt-1">{t('necessary.desc')}</p>
          </div>
          <Toggle value={true} onChange={() => {}} />
        </div>

        {/* Analytics */}
        <div className="bg-card border border-white/5 rounded-2xl p-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white">{t('analytics.title')}</h3>
            <p className="text-sm text-muted mt-1">{t('analytics.desc')}</p>
          </div>
          <Toggle value={prefs.analytics} onChange={(v) => save({ ...prefs, analytics: v })} />
        </div>

        {/* Marketing */}
        <div className="bg-card border border-white/5 rounded-2xl p-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white">{t('marketing.title')}</h3>
            <p className="text-sm text-muted mt-1">{t('marketing.desc')}</p>
          </div>
          <Toggle value={prefs.marketing} onChange={(v) => save({ ...prefs, marketing: v })} />
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={() => save({ necessary: true, analytics: true, marketing: true })} className="px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white text-sm rounded-xl transition-all">
          {t('acceptAll')}
        </button>
        <button onClick={() => save({ necessary: true, analytics: false, marketing: false })} className="px-5 py-3 border border-white/10 hover:border-white/30 text-muted hover:text-white text-sm rounded-xl transition-all">
          {t('rejectAll')}
        </button>
        <button onClick={() => save(prefs)} className="px-5 py-3 border border-white/10 hover:border-brand-500/50 text-white text-sm rounded-xl transition-all">
          {t('saveSettings')}
        </button>
      </div>
    </div>
  );
}
```

**Note:** The page component itself must be a Server Component wrapper because next-intl's `setRequestLocale` is server-only. Wrap the client component:

```tsx
// app/[locale]/cookies/page.tsx (server wrapper)
import { setRequestLocale } from 'next-intl/server';
import CookiesPageClient from './CookiesPageClient';

type Props = { params: Promise<{ locale: string }> };

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookiesPageClient />;
}
```

Create `app/[locale]/cookies/CookiesPageClient.tsx` with the client component code above (add `'use client'` directive).

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/cookies/
git commit -m "feat: add cookies settings page"
```

---

## Task 17: SEO — sitemap + robots + next.config images

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Create app/sitemap.ts**

```ts
import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/getProjects';
import { getAllServices } from '@/lib/getServices';
import { routing } from '@/routing';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://automation-studio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const staticPaths = ['', '/services', '/projects', '/about', '/contact', '/cookies'];
  const projectSlugs = getAllProjects().map((p) => `/projects/${p.slug}`);
  const serviceSlugs = getAllServices().map((s) => `/services/${s.slug}`);
  const allPaths = [...staticPaths, ...projectSlugs, ...serviceSlugs];

  return locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  );
}
```

- [ ] **Step 2: Create app/robots.ts**

```ts
import type { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://automation-studio.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Update next.config.ts to allow Unsplash images**

```ts
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 4: Run production build to verify no errors**

```bash
npm run build 2>&1 | tail -30
```

Expected: `✓ Compiled successfully` (or similar success output)

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts app/robots.ts next.config.ts
git commit -m "feat: add sitemap, robots.txt, and Unsplash image domain"
```

---

## Self-Review Checklist

- [x] **i18n routing** — defineRouting, middleware, getRequestConfig, NextIntlClientProvider — Task 1
- [x] **4 locale message files** — all keys from spec §7 — Task 2
- [x] **data/services.json + data/projects.json** — exact structure from spec §6 — Task 3
- [x] **Tailwind v4 @theme tokens** — all brand/accent/dark/card/muted colors — Task 4
- [x] **Root layout → locale layout** — fonts, html lang, providers — Task 5
- [x] **Header** — logo, nav, LanguageSwitcher, mobile menu — Task 6
- [x] **Footer** — nav links, cookie settings link, copyright — Task 6
- [x] **CookieBanner** — localStorage, accept/customize — Task 6
- [x] **HeroSection** — animated gradient h1, 2 CTAs, bg glow — Task 8
- [x] **StatsBar** — 3 stats — Task 8
- [x] **ServicesPreview** — 4 cards grid — Task 9
- [x] **ProjectsPreview** — 3 cards + see all — Task 10
- [x] **TechStack** — 9 tech pills — Task 10
- [x] **CtaBanner** — CTA strip — Task 10
- [x] **Home page** — all 6 sections + generateMetadata — Task 11
- [x] **Services list** — 4 alternating blocks + generateMetadata — Task 12
- [x] **Service detail** — single service page — Task 12
- [x] **Projects list** — grid + filter + generateMetadata — Task 13
- [x] **Project detail** — challenge/solution/result + lightbox + CTA — Task 13
- [x] **About** — mission, industries, tech, CTA — Task 14
- [x] **Contact** — form, server action, Resend — Task 15
- [x] **Cookie settings** — toggles, localStorage — Task 16
- [x] **sitemap.ts** — all locales × all pages — Task 17
- [x] **robots.ts** — Task 17
- [x] **next.config.ts images** — Unsplash remote pattern — Task 17

**Spec coverage gap:** Placeholder images for projects (project-1 through project-8) do not exist in `public/`. The spec notes these should be replaced with real images. Until then, use the Unsplash placeholders from spec §8 as fallback in `ProjectCard` when the local path 404s, or swap `cover` values in `data/projects.json` to Unsplash URLs temporarily.
