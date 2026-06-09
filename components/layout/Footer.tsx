import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <span className="font-heading font-bold text-lg text-stone-900">AI Automation Studio</span>
            <p className="mt-2 text-sm text-gray-500">{t('footer.tagline')}</p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-gray-500">
            <Link href="/services" className="hover:text-stone-900 transition-colors">{t('nav.services')}</Link>
            <Link href="/projects" className="hover:text-stone-900 transition-colors">{t('nav.projects')}</Link>
            <Link href="/about" className="hover:text-stone-900 transition-colors">{t('nav.about')}</Link>
            <Link href="/contact" className="hover:text-stone-900 transition-colors">{t('nav.contact')}</Link>
            <Link href="/cookies" className="hover:text-stone-900 transition-colors">{t('footer.cookieSettings')}</Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500">
          © {year} AI Automation Studio. {t('footer.rights')}.
        </div>
      </div>
    </footer>
  );
}
