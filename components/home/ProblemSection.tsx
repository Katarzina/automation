'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail, Copy, FileText, Headphones, Unplug } from 'lucide-react';

const ICONS = [Mail, Copy, FileText, Headphones, Unplug];

export default function ProblemSection() {
  const t = useTranslations('home.problem');
  const items = t.raw('items') as string[];

  return (
    <section className="bg-[#0d0d14] py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-bold text-white mb-16 max-w-3xl mx-auto"
        >
          {t('title')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-left"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-stone-300 text-sm leading-snug">{item}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl font-semibold text-indigo-400"
        >
          {t('footer')}
        </motion.p>
      </div>
    </section>
  );
}
