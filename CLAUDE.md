# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Autonomous Execution

`AUTOMATION_STUDIO_INSTRUCTIONS.md` is the single source of truth. When implementing anything covered by the spec (design, copy, colors, structure, data), proceed directly without asking for confirmation. Only ask if the spec is genuinely silent on something AND getting it wrong would require significant rework.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Critical Version Notes

This project uses **Next.js 16.2.7**, **React 19**, **Tailwind CSS 4**, and **next-intl 4** — all major versions with breaking changes from training data. Read `node_modules/next/dist/docs/` before writing Next.js-specific code.

## Architecture

**App Router with locale prefix** — every page lives under `app/[locale]/`. There is no top-level `app/page.tsx` for content; the root `app/page.tsx` only handles the base redirect.

**i18n** — `next-intl` handles routing via `middleware.ts`. Translations live in `messages/{en,cs,uk,ru}.json`. Always use `useTranslations()` in client components and `getTranslations()` in server components. The locale is a dynamic route param, not a query string.

**Content/CMS** — all data is in JSON files, not a database:
- `data/projects.json` — 8 case studies with `translations` object per locale
- `data/services.json` — 4 services with `translations` object per locale

Data is read by `lib/getProjects.ts` and `lib/getServices.ts`. Adding content means editing these JSON files only.

**Images** — stored in `public/images/` with strict conventions:
- Project covers: `public/images/projects/project-{n}/cover.jpg` (1200×800px, max 300KB)
- Project gallery: `public/images/projects/project-{n}/01.jpg`…`05.jpg` (1600×900px, max 500KB)
- Service images: `public/images/services/{slug}.jpg`

## Styling

Tailwind CSS 4 (PostCSS plugin). Color tokens are defined in `tailwind.config.ts`:
- `brand-500` (`#6366f1`) — primary indigo
- `accent` (`#06b6d4`) — cyan highlights
- `dark` (`#0a0a0f`) — page background
- `card` (`#12121a`) — card backgrounds

Fonts: `Space_Grotesk` for headings, `Inter` for body (both via `next/font/google`).

Design language: dark background, glass-morphism cards (`backdrop-blur` + border opacity), gradient glow effects, subtle grid/dot textures.

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://automation-studio.com
RESEND_API_KEY=re_...
EMAIL_TO=hello@automation-studio.com
```

Contact form uses Resend API via a Server Action (no page reload on submit).

## Deploy

Vercel — auto-deploys on push to GitHub (`git@github.com:Katarzina/automation.git`). No build config needed; Vercel auto-detects Next.js.
