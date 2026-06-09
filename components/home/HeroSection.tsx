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
