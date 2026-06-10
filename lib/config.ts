export const SITE = {
  name: 'AI Automation Studio',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://automation-studio.com',
  email: process.env.EMAIL_TO ?? 'hello@automation-studio.com',
  location: 'Czech Republic',
  hours: 'Mon–Fri: 9:00–18:00 CET',
} as const;
