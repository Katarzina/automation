import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Mail, Calendar } from 'lucide-react';
import { SITE } from '@/lib/config';

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: '/' as const, label: t('nav.home') },
    { href: '/services' as const, label: t('nav.services') },
    { href: '/solutions' as const, label: t('nav.projects') },
    { href: '/pricing' as const, label: t('nav.pricing') },
    { href: '/about' as const, label: t('nav.about') },
    { href: '/contact' as const, label: t('nav.contact') },
  ];

  const resourceLinks = [
    { href: '/blog' as const, label: t('footer.blog') },
    { href: '/faq' as const, label: t('footer.faq') },
    { href: '/privacy' as const, label: t('footer.privacyPolicy') },
  ];

  const socials = [
    {
      href: 'https://www.linkedin.com/in/kateryna-parfenova-581235153/',
      label: 'LinkedIn',
      svg: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
    },
    {
      href: 'https://www.facebook.com/katjabrno',
      label: 'Facebook',
      svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    },
    {
      href: 'https://www.youtube.com/@katrinparfenova4955',
      label: 'YouTube',
      svg: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0d0d14" /></>,
    },
  ];

  return (
    <footer className="bg-[#0d0d14] border-t border-white/10 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Logo + tagline + socials */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <Link href="/">
            <Image src="/logo.jpg" alt="AI Automation Studio" width={140} height={48} className="h-10 w-auto rounded-lg" />
          </Link>
          <p className="text-sm leading-relaxed">{t('footer.tagline')}</p>
          <div className="flex gap-3">
            {socials.map(({ href, label, svg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600/20 hover:border-indigo-500/40 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5] text-stone-400" strokeLinecap="round" strokeLinejoin="round">
                  {svg}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-5">{t('footer.menu')}</p>
          <ul className="space-y-3">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-5">{t('footer.resources')}</p>
          <ul className="space-y-3">
            {resourceLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-5">{t('footer.contact')}</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                {SITE.email}
              </a>
            </li>
            <li className="text-stone-500 text-xs pt-1">{t('footer.hours')}</li>
            <li className="pt-2">
              <a
                href="https://cal.com/ai-automation-studio-brno/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                {t('footer.bookCall')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <span>© {year} AI Automation Studio. {t('footer.rights')}.</span>
          <Link href="/cookies" className="hover:text-stone-400 transition-colors">{t('footer.cookieSettings')}</Link>
        </div>
      </div>
    </footer>
  );
}
