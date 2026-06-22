import type { ReactNode } from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white text-stone-900">
        {children}
      </body>
    </html>
  );
}
