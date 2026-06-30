'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA_ID = 'G-VJZWRFBRJ2';

function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem('cookie_consent');
    if (!raw) return false;
    return JSON.parse(raw)?.analytics === true;
  } catch {
    return false;
  }
}

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (hasAnalyticsConsent()) {
      setEnabled(true);
      return;
    }
    // Watch for consent being granted later (user clicks Accept in banner)
    function onStorage(e: StorageEvent) {
      if (e.key === 'cookie_consent') setEnabled(hasAnalyticsConsent());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
