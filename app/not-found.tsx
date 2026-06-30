import Link from 'next/link';
import { Inter, Space_Grotesk } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export default function GlobalNotFound() {
  return (
    <html lang="cs" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#0a0a0f] min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="relative mb-8 select-none">
            <span className="text-[160px] md:text-[200px] font-heading font-bold leading-none bg-gradient-to-b from-indigo-500/30 to-indigo-500/5 bg-clip-text text-transparent">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Page not found
          </h1>
          <p className="text-stone-400 mb-10 leading-relaxed">
            This page doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/cs"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
