import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ProblemSection from '@/components/home/ProblemSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import HowItWorks from '@/components/home/HowItWorks';
import FaqSection from '@/components/home/FaqSection';
import LeadCaptureSection from '@/components/home/LeadCaptureSection';
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
      <TechStack />
      <ProblemSection />
      <ServicesPreview />
      <HowItWorks />
      <LeadCaptureSection locale={locale} />
      <ProjectsPreview />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
