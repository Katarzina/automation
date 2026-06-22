import type { Metadata } from 'next';
import { Clock, Target, BellRing, Database, Link2, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Telegram Bot for Business — Qualify Leads 24/7',
  description: 'An AI-powered Telegram bot that qualifies your leads automatically, scores them hot/warm/cold, and sends you instant notifications.',
};

const steps = [
  {
    n: '01',
    title: 'Client writes to your bot',
    desc: 'Share your bot link anywhere — website, Instagram, business card. Client starts the conversation anytime.',
  },
  {
    n: '02',
    title: 'AI asks the right questions',
    desc: 'The bot collects name, business need, budget, and email — naturally, in a conversation.',
  },
  {
    n: '03',
    title: 'You get an instant notification',
    desc: 'Groq AI scores the lead as 🔥 hot, 🌡️ warm, or ❄️ cold and sends you a summary in Telegram — immediately.',
  },
];

const benefits = [
  { icon: Clock, color: 'text-blue-700 bg-blue-50', text: 'Works 24/7 — no missed leads at night or on weekends' },
  { icon: Target, color: 'text-red-700 bg-red-50', text: 'AI scoring — focus on hot leads first' },
  { icon: BellRing, color: 'text-violet-700 bg-violet-50', text: 'Instant Telegram notification with full context' },
  { icon: Database, color: 'text-emerald-700 bg-emerald-50', text: 'Every lead saved to your database + admin dashboard' },
  { icon: Link2, color: 'text-orange-700 bg-orange-50', text: 'Connects to your CRM, email, or any webhook' },
  { icon: Globe, color: 'text-sky-700 bg-sky-50', text: 'Works in any language your clients speak' },
];

export default function TelegramBotLanding() {
  return (
    <div className="font-sans">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs uppercase tracking-widest text-blue-300 mb-6">AI Automation Studio</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
            Qualify leads 24/7<br />while you sleep
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-xl mx-auto">
            An AI-powered Telegram bot that asks the right questions, scores your leads, and sends you instant notifications — fully automated.
          </p>
          <a
            href="https://t.me/Automat_studio_bot?start=landing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
          >
            Try the live demo →
          </a>
          <p className="mt-4 text-blue-300 text-sm">No registration. Just open Telegram and write /start</p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-stone-900 mb-14">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.n} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="text-4xl font-heading font-bold text-blue-100 mb-4">{step.n}</div>
                <h3 className="font-heading text-lg font-semibold text-stone-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-stone-900 mb-14">What you get</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map(({ icon: Icon, color, text }) => (
              <div key={text} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Want this for your business?</h2>
          <p className="text-blue-200 mb-10 text-lg">Book a free 30-minute call — we'll set it up together.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://cal.com/ai-automation-studio-brno/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Book a Free Call
            </a>
            <a
              href="https://t.me/Automat_studio_bot?start=landing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Try the Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <div className="py-6 text-center text-xs text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} AI Automation Studio · <a href="/en" className="hover:text-stone-700">automation-studio.eu</a>
      </div>

    </div>
  );
}
