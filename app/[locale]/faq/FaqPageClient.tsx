'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Plus, Minus } from 'lucide-react';

type FaqItem = { q: string; a: string };
type Category = { name: string; items: FaqItem[] };

export default function FaqPageClient() {
  const t = useTranslations('faqPage');
  const categories = t.raw('categories') as Category[];
  const [open, setOpen] = useState<string | null>(null);

  const key = (ci: number, qi: number) => `${ci}-${qi}`;

  return (
    <main className="min-h-screen bg-[#0a0a0f] pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-stone-400 text-lg">{t('subtitle')}</p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-5">
                {cat.name}
              </h2>
              <div className="space-y-2">
                {cat.items.map((item, qi) => {
                  const k = key(ci, qi);
                  return (
                    <div key={qi} className="border border-white/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpen(open === k ? null : k)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white/5 hover:bg-white/8 transition-colors"
                      >
                        <span className="text-white font-medium text-sm md:text-base">{item.q}</span>
                        <span className="shrink-0 text-indigo-400">
                          {open === k ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open === k && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="px-6 py-5 text-stone-400 text-sm leading-relaxed border-t border-white/10">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center border border-white/10 rounded-2xl p-10 bg-white/5"
        >
          <p className="text-white font-semibold text-lg mb-2">{t('title')}</p>
          <p className="text-stone-400 text-sm mb-6">{t('subtitle')}</p>
          <a
            href="https://cal.com/ai-automation-studio-brno/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Book a Free Call
          </a>
        </motion.div>
      </div>
    </main>
  );
}
