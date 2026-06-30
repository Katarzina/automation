'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Step = { number: string; title: string; desc: string };

export default function HowItWorks() {
  const t = useTranslations('home.howItWorks');
  const steps = t.raw('steps') as Step[];

  return (
    <section className="bg-[#0a0a0f] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-16"
        >
          {t('title')}
        </motion.h2>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-20 h-20 rounded-full bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-indigo-400">{step.number}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
