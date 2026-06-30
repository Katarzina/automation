import { SITE } from './config';
import { routing } from '@/routing';

export function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE.url}/${locale}${path}`;
  }
  return {
    canonical: `${SITE.url}/${routing.defaultLocale}${path}`,
    languages: { ...languages, 'x-default': `${SITE.url}/${routing.defaultLocale}${path}` },
  };
}
