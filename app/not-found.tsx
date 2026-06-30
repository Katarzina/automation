import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="cs">
      <body className="bg-[#0a0a0f] min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <span className="text-[160px] font-bold leading-none text-indigo-500/20 block">404</span>
          <h1 className="text-2xl font-bold text-white mb-4">Page not found</h1>
          <p className="text-stone-400 mb-8">This page doesn&apos;t exist or has been moved.</p>
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
