'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      <Image
        src="/images/hero-bg.jpg"
        alt="AI Automation"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.25em] text-indigo-400 mb-6 font-medium"
        >
          {t('tagline')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-8 text-white"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-stone-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://cal.com/ai-automation-studio-brno/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {t('cta')}
          </a>
          <Link
            href="/solutions"
            className="px-8 py-4 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            {t('ctaSecondary')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
