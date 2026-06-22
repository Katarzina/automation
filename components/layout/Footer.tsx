import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { SITE } from '@/lib/config';

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const links = [
    { href: '/' as const, label: t('nav.home') },
    { href: '/services' as const, label: t('nav.services') },
    { href: '/solutions' as const, label: t('nav.projects') },
    { href: '/about' as const, label: t('nav.about') },
    { href: '/contact' as const, label: t('nav.contact') },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100 text-gray-500">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + tagline */}
        <div className="flex flex-col gap-4">
          <Link href="/">
            <Image src="/logo.png" alt="AI Automation Studio" width={140} height={48} className="h-12 w-auto rounded-lg" />
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">{t('footer.tagline')}</p>
        </div>

        {/* Menu */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Menu</p>
          <ul className="space-y-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm hover:text-stone-900 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>{SITE.location}</li>
            <li>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-stone-900 transition-colors">{SITE.phone}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-stone-900 transition-colors">{SITE.email}</a>
            </li>
            <li className="text-gray-600 pt-1">{t('footer.hours')}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>© {year} AI Automation Studio. {t('footer.rights')}.</span>
          <div className="flex gap-4">
            <Link href="/cookies" className="hover:text-stone-900 transition-colors">{t('footer.cookieSettings')}</Link>
            <Link href="/privacy" className="hover:text-stone-900 transition-colors">{t('footer.privacyPolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
