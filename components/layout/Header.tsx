'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { SITE } from '@/lib/config';

export default function Header() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/' as const, label: t('home') },
    { href: '/services' as const, label: t('services') },
    { href: '/solutions' as const, label: t('projects') },
    { href: '/about' as const, label: t('about') },
    { href: '/pricing' as const, label: t('pricing') },
    { href: '/contact' as const, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="AI Automation Studio" width={140} height={48} className="h-12 w-auto rounded-lg" priority />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-heading font-bold text-base tracking-wide text-stone-900">AI Automation</span>
            <span className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase">Studio</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm text-gray-500 hover:text-stone-800 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-800 transition-colors group"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
              <svg className="w-3.5 h-3.5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <span className="font-heading font-semibold text-base tracking-wide">{SITE.phone}</span>
          </a>
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
          >
            {t('getStarted')}
          </Link>
        </div>

        {/* Mobile: language switcher + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            className="text-stone-800 hover:text-stone-900"
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
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-600 hover:bg-stone-50 px-2 py-1 rounded transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
