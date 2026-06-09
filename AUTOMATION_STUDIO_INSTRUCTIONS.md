# AI Automation Studio — Next.js Website Instructions

> Verze: 1.0 | Datum: 2026-06-09
> Deploy: Vercel | Framework: Next.js 14+ (App Router) | CMS: GitHub (JSON + public/images)
> Primary language: **English**

---

## 1. Project Overview

Landing/presentation website for an AI Automation Studio — selling AI automation, AI agents, custom software development and landing page services to international clients (SMB, logistics, manufacturing, insurance, accounting).

**Languages:** 🇬🇧 English (primary) · 🇨🇿 Czech · 🇺🇦 Ukrainian · 🇷🇺 Russian
**Pages:** Home · Services · Projects · About · Contact · Cookie Settings

---

## 2. Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14+ | Framework (App Router) |
| TypeScript | 5+ | Type safety |
| Tailwind CSS | 3+ | Styling |
| next-intl | 3+ | i18n (4 languages) |
| Framer Motion | 11+ | Animations |
| yet-another-react-lightbox | latest | Image viewer for cases |
| sharp | latest | Image optimization |

---

## 3. Project Structure

```
automation/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx                        # Home
│       ├── services/
│       │   ├── page.tsx                    # All services
│       │   └── [slug]/
│       │       └── page.tsx                # Service detail
│       ├── projects/
│       │   ├── page.tsx                    # Cases grid
│       │   └── [slug]/
│       │       └── page.tsx                # Case detail + lightbox
│       ├── about/
│       │   └── page.tsx
│       ├── contact/
│       │   └── page.tsx
│       └── cookies/
│           └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── CookieBanner.tsx
│   ├── home/
│   │   ├── HeroSection.tsx                 # Full-screen hero with CTA
│   │   ├── ServicesPreview.tsx             # 4 service cards
│   │   ├── ProjectsPreview.tsx             # 3 featured cases
│   │   ├── TechStack.tsx                   # Technology logos grid
│   │   ├── StatsBar.tsx                    # Numbers: clients, automations, hours saved
│   │   └── CtaBanner.tsx                   # Bottom CTA: "Let's automate your business"
│   ├── services/
│   │   ├── ServiceCard.tsx
│   │   └── ServiceDetail.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   └── Lightbox.tsx
│   └── ui/
│       ├── LanguageSwitcher.tsx
│       ├── SectionTitle.tsx
│       └── ContactForm.tsx
│
├── data/
│   ├── projects.json                       # 8 case studies
│   └── services.json                       # 4 services
│
├── messages/
│   ├── en.json                             # Primary
│   ├── cs.json
│   ├── uk.json
│   └── ru.json
│
├── public/
│   └── images/
│       ├── hero/
│       │   └── hero-bg.jpg
│       ├── projects/
│       │   ├── project-1/
│       │   │   ├── cover.jpg
│       │   │   ├── 01.jpg ... 05.jpg
│       │   └── project-8/
│       ├── services/
│       │   ├── ai-automation.jpg
│       │   ├── ai-agents.jpg
│       │   ├── custom-software.jpg
│       │   └── landing-pages.jpg
│       └── logos/                          # Tech stack logos (SVG)
│
├── lib/
│   ├── getProjects.ts
│   └── getServices.ts
│
├── i18n.ts
├── middleware.ts
├── next.config.ts
└── tailwind.config.ts
```

---

## 4. Color Palette & Design Direction

Dark, tech-forward aesthetic — inspired by modern AI/SaaS products.

```typescript
// tailwind.config.ts
colors: {
  brand: {
    50:  '#eef2ff',
    100: '#e0e7ff',
    400: '#818cf8',
    500: '#6366f1',   // primary — indigo
    600: '#4f46e5',
    700: '#4338ca',
    900: '#1e1b4b',
  },
  accent: '#06b6d4',   // cyan — for highlights
  dark:   '#0a0a0f',   // near black background
  card:   '#12121a',   // card background
  muted:  '#6b7280',
}
```

**Font pairing:**
```typescript
import { Inter, Space_Grotesk } from 'next/font/google';
// Space Grotesk — headings (techy, modern)
// Inter — body text
```

**Design principles:**
- Dark background (`#0a0a0f`) with indigo/cyan accents
- Subtle gradient glows behind key sections
- Glass-morphism cards (`backdrop-blur + border opacity`)
- Animated gradient hero text
- Grid/dot pattern background textures

---

## 5. Pages Description

### 5.1 Home (`/[locale]/page.tsx`)

**Sections (top to bottom):**

1. **HeroSection** — full screen (100vh), dark background
   - Animated gradient heading: `"Automate. Scale. Grow."`
   - Subheading: `"We build AI-powered automation systems that eliminate repetitive work and unlock growth for your business."`
   - Two CTA buttons: `"See Our Work"` + `"Get Free Consultation"`
   - Background: subtle animated gradient or particle effect
   - Placeholder image: `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920`

2. **StatsBar** — dark stripe with 3 numbers:
   - `50+` Processes Automated
   - `30+` Hours Saved per Client/Month
   - `4` Countries Served

3. **ServicesPreview** — 4 cards in a 2×2 grid (desktop) / stack (mobile):
   - AI Automation
   - AI Agents
   - Custom Software Development
   - Landing Pages
   - Each card: icon + title + 2-line description + "Learn more" link

4. **ProjectsPreview** — 3 featured case cards + "See all projects" button

5. **TechStack** — logos row: Next.js · React · Node.js · NestJS · OpenAI · Anthropic · n8n · PostgreSQL · Docker

6. **CtaBanner** — full-width dark section:
   - `"Ready to automate your business?"`
   - Button: `"Book a Free Call"`

---

### 5.2 Services (`/[locale]/services/page.tsx`)

**Layout:** Page hero + 4 large service blocks (alternating image/text layout)

**4 Services:**

| Slug | Title | Icon |
|---|---|---|
| `ai-automation` | AI Automation | ⚙️ |
| `ai-agents` | AI Agents | 🤖 |
| `custom-software` | Custom Software Development | 💻 |
| `landing-pages` | Landing Pages | 🚀 |

Each service block contains:
- Title + description
- List of sub-services (bullets)
- Relevant image
- "Get started" CTA button

---

### 5.3 Projects / Case Studies (`/[locale]/projects/page.tsx`)

**Layout:** Page hero + filter buttons + grid of 8 case cards

**Filter categories:**

| Value | Label |
|---|---|
| `all` | All |
| `automation` | Automation |
| `agents` | AI Agents |
| `software` | Software |
| `landing` | Landing Pages |

**ProjectCard contains:**
- Cover image with hover zoom
- Category badge
- Project title
- Industry tag (e.g. "Logistics", "Insurance")
- Short result: `"Saved 40 hours/month"`
- "View case" button

---

### 5.4 Project Detail (`/[locale]/projects/[slug]/page.tsx`)

**Sections:**
1. Breadcrumbs
2. Project title + category + industry + tech stack used
3. **Challenge** — what problem the client had
4. **Solution** — what was built
5. **Result** — measurable outcome (hours saved, cost reduced, etc.)
6. Image gallery (5–6 screenshots/diagrams) + Lightbox
7. CTA: "Have a similar challenge? Let's talk."

---

### 5.5 About (`/[locale]/about/page.tsx`)

**Sections:**
1. Page hero — `"About AI Automation Studio"`
2. Mission statement
3. What we do — 4 service pillars
4. Technology stack visual grid
5. Target industries — icons grid: Logistics · Manufacturing · Insurance · Accounting · Marketing · SaaS · E-commerce
6. CTA — "Work with us"

---

### 5.6 Contact (`/[locale]/contact/page.tsx`)

**Layout:** 2 columns — contact info left, form right

**Contact info:**
```
AI Automation Studio
Based in Czech Republic
hello@automation-studio.com
Available: Mon–Fri 9:00–18:00 CET
```

**Form fields:**
- Name
- Email
- Company (optional)
- Service interested in (dropdown: AI Automation / AI Agents / Custom Software / Landing Pages / Other)
- Message
- Send button

**After submit:** success message, no page reload (Server Action).

---

### 5.7 Cookie Settings (`/[locale]/cookies/page.tsx`)

Same pattern as construction site:
- Necessary (always on)
- Analytics toggle
- Marketing toggle
- Save / Accept All / Reject All buttons
- State saved in `localStorage` as `cookie_consent`

---

## 6. Data Structure

### `data/services.json`

```json
[
  {
    "slug": "ai-automation",
    "icon": "automation",
    "color": "#6366f1",
    "subServices": [
      "Business process automation",
      "Workflow automation using n8n",
      "CRM integrations",
      "Email automation",
      "Lead qualification systems"
    ],
    "translations": {
      "en": {
        "title": "AI Automation",
        "description": "We automate repetitive business processes using AI and workflow tools, freeing your team to focus on what matters.",
        "longDescription": "From CRM integrations to complex multi-step workflows, we design and implement automation systems tailored to your operations."
      },
      "cs": {
        "title": "AI Automatizace",
        "description": "Automatizujeme opakující se firemní procesy pomocí AI a workflow nástrojů.",
        "longDescription": "Od CRM integrací po komplexní vícekrokové workflow — navrhujeme a implementujeme automatizační systémy šité na míru."
      },
      "uk": {
        "title": "AI Автоматизація",
        "description": "Автоматизуємо повторювані бізнес-процеси за допомогою AI та інструментів автоматизації.",
        "longDescription": "Від CRM інтеграцій до складних багатоетапних workflows — проектуємо системи автоматизації під ваші процеси."
      },
      "ru": {
        "title": "AI Автоматизация",
        "description": "Автоматизируем повторяющиеся бизнес-процессы с помощью AI и инструментов автоматизации.",
        "longDescription": "От CRM интеграций до сложных многошаговых workflow — проектируем системы автоматизации под ваши процессы."
      }
    }
  },
  {
    "slug": "ai-agents",
    "icon": "agents",
    "color": "#06b6d4",
    "subServices": [
      "Customer support agents",
      "Internal company assistants",
      "Sales agents",
      "Research agents",
      "Multi-agent workflows"
    ],
    "translations": {
      "en": {
        "title": "AI Agents",
        "description": "Custom AI agents that handle customer support, sales, research and internal operations — 24/7, without extra staff.",
        "longDescription": "We build intelligent agents powered by OpenAI and Anthropic APIs that integrate with your existing tools and workflows."
      },
      "cs": {
        "title": "AI Agenti",
        "description": "Vlastní AI agenti pro zákaznickou podporu, prodej, výzkum a interní operace — nonstop, bez extra personálu.",
        "longDescription": "Vytváříme inteligentní agenty na bázi OpenAI a Anthropic API, kteří se integrují do vašich stávajících nástrojů."
      },
      "uk": {
        "title": "AI Агенти",
        "description": "Власні AI агенти для підтримки клієнтів, продажів, досліджень та внутрішніх операцій — цілодобово.",
        "longDescription": "Розробляємо інтелектуальних агентів на базі OpenAI та Anthropic API, що інтегруються з вашими інструментами."
      },
      "ru": {
        "title": "AI Агенты",
        "description": "Собственные AI агенты для поддержки клиентов, продаж, исследований и внутренних операций — круглосуточно.",
        "longDescription": "Разрабатываем интеллектуальных агентов на базе OpenAI и Anthropic API, интегрированных с вашими инструментами."
      }
    }
  },
  {
    "slug": "custom-software",
    "icon": "software",
    "color": "#10b981",
    "subServices": [
      "SaaS platforms",
      "Internal dashboards",
      "Business applications",
      "MVP development",
      "API integrations"
    ],
    "translations": {
      "en": {
        "title": "Custom Software Development",
        "description": "We build SaaS platforms, internal tools and business applications using modern full-stack technologies.",
        "longDescription": "Next.js frontends, NestJS backends, PostgreSQL/MongoDB databases — scalable, production-ready software built to last."
      },
      "cs": {
        "title": "Vývoj na míru",
        "description": "Vyvíjíme SaaS platformy, interní nástroje a firemní aplikace pomocí moderních full-stack technologií.",
        "longDescription": "Next.js frontend, NestJS backend, PostgreSQL/MongoDB databáze — škálovatelný software připravený pro produkci."
      },
      "uk": {
        "title": "Розробка ПЗ на замовлення",
        "description": "Розробляємо SaaS платформи, внутрішні інструменти та бізнес-додатки на сучасному full-stack стеку.",
        "longDescription": "Next.js frontend, NestJS backend, PostgreSQL/MongoDB — масштабоване ПЗ, готове до продакшену."
      },
      "ru": {
        "title": "Разработка ПО на заказ",
        "description": "Разрабатываем SaaS платформы, внутренние инструменты и бизнес-приложения на современном full-stack стеке.",
        "longDescription": "Next.js frontend, NestJS backend, PostgreSQL/MongoDB — масштабируемое ПО, готовое к продакшену."
      }
    }
  },
  {
    "slug": "landing-pages",
    "icon": "landing",
    "color": "#f59e0b",
    "subServices": [
      "High-converting landing pages",
      "SEO optimization",
      "Analytics integration",
      "Marketing websites"
    ],
    "translations": {
      "en": {
        "title": "Landing Pages",
        "description": "High-converting landing pages and marketing websites built with Next.js, optimized for SEO and performance.",
        "longDescription": "We design and build fast, beautiful landing pages that convert visitors into leads — with analytics and A/B testing ready."
      },
      "cs": {
        "title": "Landing Pages",
        "description": "Vysoce konverzní landing pages a marketingové weby v Next.js, optimalizované pro SEO a výkon.",
        "longDescription": "Navrhujeme a stavíme rychlé, krásné landing pages, které mění návštěvníky v leady — s analytics a A/B testováním."
      },
      "uk": {
        "title": "Landing Pages",
        "description": "Ефективні landing pages та маркетингові сайти на Next.js, оптимізовані для SEO та швидкодії.",
        "longDescription": "Проектуємо та розробляємо швидкі, красиві landing pages, що конвертують відвідувачів у ліди."
      },
      "ru": {
        "title": "Landing Pages",
        "description": "Высококонверсионные landing pages и маркетинговые сайты на Next.js, оптимизированные для SEO и производительности.",
        "longDescription": "Проектируем и разрабатываем быстрые, красивые landing pages, конвертирующие посетителей в лиды."
      }
    }
  }
]
```

---

### `data/projects.json`

```json
[
  {
    "id": "logistics-automation-crm",
    "slug": "logistics-crm-automation",
    "category": "automation",
    "industry": "Logistics",
    "techStack": ["n8n", "OpenAI API", "CRM", "Gmail API"],
    "result": "Saved 45 hours/month on manual data entry",
    "cover": "/images/projects/project-1/cover.jpg",
    "images": [
      "/images/projects/project-1/01.jpg",
      "/images/projects/project-1/02.jpg",
      "/images/projects/project-1/03.jpg",
      "/images/projects/project-1/04.jpg",
      "/images/projects/project-1/05.jpg"
    ],
    "translations": {
      "en": {
        "title": "CRM Automation for Logistics Company",
        "challenge": "The client's team manually entered shipment data into CRM from emails, taking 3+ hours daily.",
        "solution": "Built an n8n workflow that reads incoming emails, extracts shipment data using OpenAI, and automatically creates/updates CRM records.",
        "result": "Eliminated 45 hours of manual work per month. Zero data entry errors. Team refocused on client relationships."
      },
      "cs": {
        "title": "CRM automatizace pro logistickou firmu",
        "challenge": "Tým klienta ručně zadával data zásilek do CRM z e-mailů — 3+ hodiny denně.",
        "solution": "Vytvořili jsme n8n workflow, který čte příchozí e-maily, extrahuje data zásilek pomocí OpenAI a automaticky vytváří/aktualizuje záznamy v CRM.",
        "result": "Eliminováno 45 hodin manuální práce měsíčně. Nulové chyby při zadávání. Tým se znovu zaměřil na vztahy s klienty."
      },
      "uk": {
        "title": "Автоматизація CRM для логістичної компанії",
        "challenge": "Команда клієнта вручну вносила дані відправлень у CRM з електронних листів — 3+ години на день.",
        "solution": "Побудували n8n workflow, який читає вхідні листи, витягує дані за допомогою OpenAI та автоматично створює/оновлює записи в CRM.",
        "result": "Усунено 45 годин ручної роботи на місяць. Нуль помилок введення. Команда зосередилась на клієнтах."
      },
      "ru": {
        "title": "Автоматизация CRM для логистической компании",
        "challenge": "Команда клиента вручную вносила данные отправлений в CRM из писем — 3+ часа в день.",
        "solution": "Построили n8n workflow, который читает входящие письма, извлекает данные с OpenAI и автоматически создаёт/обновляет записи в CRM.",
        "result": "Устранено 45 часов ручной работы в месяц. Ноль ошибок ввода. Команда сосредоточилась на клиентах."
      }
    }
  },
  {
    "id": "insurance-support-agent",
    "slug": "insurance-support-agent",
    "category": "agents",
    "industry": "Insurance",
    "techStack": ["Anthropic API", "Next.js", "PostgreSQL", "Slack"],
    "result": "Handled 70% of support queries automatically",
    "cover": "/images/projects/project-2/cover.jpg",
    "images": [
      "/images/projects/project-2/01.jpg",
      "/images/projects/project-2/02.jpg",
      "/images/projects/project-2/03.jpg",
      "/images/projects/project-2/04.jpg",
      "/images/projects/project-2/05.jpg"
    ],
    "translations": {
      "en": {
        "title": "AI Support Agent for Insurance Company",
        "challenge": "Support team overwhelmed with repetitive policy questions. Average response time: 4 hours.",
        "solution": "Deployed Claude-powered support agent trained on policy documents. Routes complex cases to human agents via Slack.",
        "result": "70% of queries resolved automatically. Response time dropped from 4 hours to under 2 minutes. Support team handles only complex cases."
      },
      "cs": { "title": "AI agent podpory pro pojišťovnu", "challenge": "Tým podpory zahlcen opakujícími se dotazy k pojistkám. Průměrná doba odpovědi: 4 hodiny.", "solution": "Nasadili jsme agenta na bázi Claude natrénovaného na dokumentech pojistek. Složité případy routuje na lidské agenty přes Slack.", "result": "70 % dotazů vyřešeno automaticky. Doba odpovědi klesla ze 4 hodin na méně než 2 minuty." },
      "uk": { "title": "AI агент підтримки для страхової компанії", "challenge": "Команда підтримки перевантажена повторюваними питаннями щодо полісів. Середній час відповіді: 4 години.", "solution": "Розгорнули агента на базі Claude, навченого на документах полісів. Складні випадки маршрутизує до людей через Slack.", "result": "70% запитів вирішено автоматично. Час відповіді впав з 4 годин до 2 хвилин." },
      "ru": { "title": "AI агент поддержки для страховой компании", "challenge": "Команда поддержки перегружена повторяющимися вопросами по полисам. Среднее время ответа: 4 часа.", "solution": "Развернули агента на базе Claude, обученного на документах полисов. Сложные случаи маршрутизирует к людям через Slack.", "result": "70% запросов решается автоматически. Время ответа упало с 4 часов до 2 минут." }
    }
  },
  {
    "id": "accounting-invoice-automation",
    "slug": "accounting-invoice-automation",
    "category": "automation",
    "industry": "Accounting",
    "techStack": ["n8n", "OpenAI API", "Google Sheets", "Email"],
    "result": "Invoice processing time reduced by 80%",
    "cover": "/images/projects/project-3/cover.jpg",
    "images": ["/images/projects/project-3/01.jpg", "/images/projects/project-3/02.jpg", "/images/projects/project-3/03.jpg", "/images/projects/project-3/04.jpg", "/images/projects/project-3/05.jpg"],
    "translations": {
      "en": { "title": "Invoice Processing Automation", "challenge": "Accounting firm processed 200+ invoices monthly by hand. Error-prone, time-consuming.", "solution": "AI extracts invoice data from PDFs, validates against client database, exports to Google Sheets and triggers payment reminders.", "result": "Processing time reduced 80%. Errors eliminated. Staff handles exceptions only." },
      "cs": { "title": "Automatizace zpracování faktur", "challenge": "Účetní firma zpracovávala 200+ faktur měsíčně ručně.", "solution": "AI extrahuje data faktur z PDF, ověřuje vůči databázi klientů, exportuje do Google Sheets a spouští upomínky plateb.", "result": "Čas zpracování snížen o 80 %. Chyby eliminovány." },
      "uk": { "title": "Автоматизація обробки рахунків", "challenge": "Бухгалтерська фірма вручну обробляла 200+ рахунків на місяць.", "solution": "AI витягує дані рахунків з PDF, перевіряє базу клієнтів, експортує в Google Sheets та запускає нагадування про оплату.", "result": "Час обробки скорочено на 80%. Помилки усунено." },
      "ru": { "title": "Автоматизация обработки счетов", "challenge": "Бухгалтерская фирма вручную обрабатывала 200+ счетов в месяц.", "solution": "AI извлекает данные счетов из PDF, проверяет базу клиентов, экспортирует в Google Sheets и запускает напоминания об оплате.", "result": "Время обработки сокращено на 80%. Ошибки устранены." }
    }
  },
  {
    "id": "manufacturing-dashboard",
    "slug": "manufacturing-dashboard",
    "category": "software",
    "industry": "Manufacturing",
    "techStack": ["Next.js", "NestJS", "PostgreSQL", "Docker"],
    "result": "Real-time production visibility across 3 plants",
    "cover": "/images/projects/project-4/cover.jpg",
    "images": ["/images/projects/project-4/01.jpg", "/images/projects/project-4/02.jpg", "/images/projects/project-4/03.jpg", "/images/projects/project-4/04.jpg", "/images/projects/project-4/05.jpg"],
    "translations": {
      "en": { "title": "Production Dashboard for Manufacturer", "challenge": "Operations team had no real-time visibility into production KPIs across 3 factories.", "solution": "Built a custom internal dashboard pulling data from machines, ERP and manual inputs. Real-time charts, alerts, shift reports.", "result": "Management now has live visibility into all 3 plants. Downtime detection improved by 60%." },
      "cs": { "title": "Výrobní dashboard pro výrobce", "challenge": "Operační tým neměl přehled o výrobních KPI v reálném čase napříč 3 závody.", "solution": "Vytvořili jsme interní dashboard čerpající data ze strojů, ERP a manuálních vstupů.", "result": "Management má přehled o všech 3 závodech v reálném čase. Detekce prostojů zlepšena o 60 %." },
      "uk": { "title": "Виробничий дашборд для виробника", "challenge": "Операційна команда не мала даних про виробничі KPI в реальному часі по 3 заводах.", "solution": "Побудували внутрішній дашборд, що агрегує дані зі станків, ERP та ручних введень.", "result": "Керівництво бачить всі 3 заводи в реальному часі. Виявлення простоїв покращено на 60%." },
      "ru": { "title": "Производственный дашборд", "challenge": "Операционная команда не имела данных о KPI производства в реальном времени по 3 заводам.", "solution": "Построили внутренний дашборд, агрегирующий данные со станков, ERP и ручных вводов.", "result": "Руководство видит все 3 завода в реальном времени. Обнаружение простоев улучшено на 60%." }
    }
  },
  {
    "id": "saas-mvp-development",
    "slug": "saas-mvp-development",
    "category": "software",
    "industry": "SaaS",
    "techStack": ["Next.js", "NestJS", "PostgreSQL", "Stripe", "OpenAI API"],
    "result": "MVP launched in 6 weeks, first paying customers in week 8",
    "cover": "/images/projects/project-5/cover.jpg",
    "images": ["/images/projects/project-5/01.jpg", "/images/projects/project-5/02.jpg", "/images/projects/project-5/03.jpg", "/images/projects/project-5/04.jpg", "/images/projects/project-5/05.jpg"],
    "translations": {
      "en": { "title": "SaaS MVP for Content Startup", "challenge": "Startup needed an AI-powered content tool MVP fast, with limited budget.", "solution": "Built full-stack SaaS in 6 weeks: auth, subscription billing via Stripe, AI content generation, user dashboard.", "result": "Launched on time and budget. First paying customers in week 8. Raised pre-seed funding." },
      "cs": { "title": "SaaS MVP pro content startup", "challenge": "Startup potřeboval rychle MVP AI content nástroje s omezeným rozpočtem.", "solution": "Vybudovali jsme full-stack SaaS za 6 týdnů: auth, předplatné přes Stripe, AI generování obsahu, dashboard.", "result": "Spuštěno včas a v rozpočtu. První platící zákazníci v 8. týdnu." },
      "uk": { "title": "SaaS MVP для контент-стартапу", "challenge": "Стартапу потрібен був швидкий MVP AI контент-інструменту з обмеженим бюджетом.", "solution": "Побудували full-stack SaaS за 6 тижнів: авторизація, підписка через Stripe, AI генерація контенту, дашборд.", "result": "Запущено вчасно і в бюджеті. Перші платні клієнти на 8-му тижні." },
      "ru": { "title": "SaaS MVP для контент-стартапа", "challenge": "Стартапу нужен был быстрый MVP AI контент-инструмента с ограниченным бюджетом.", "solution": "Построили full-stack SaaS за 6 недель: авторизация, подписка через Stripe, AI генерация контента, дашборд.", "result": "Запущено вовремя и в бюджете. Первые платящие клиенты на 8-й неделе." }
    }
  },
  {
    "id": "ecommerce-lead-agent",
    "slug": "ecommerce-lead-agent",
    "category": "agents",
    "industry": "E-commerce",
    "techStack": ["OpenAI API", "n8n", "Shopify API", "WhatsApp API"],
    "result": "35% increase in recovered abandoned carts",
    "cover": "/images/projects/project-6/cover.jpg",
    "images": ["/images/projects/project-6/01.jpg", "/images/projects/project-6/02.jpg", "/images/projects/project-6/03.jpg", "/images/projects/project-6/04.jpg", "/images/projects/project-6/05.jpg"],
    "translations": {
      "en": { "title": "Sales Agent for E-commerce Store", "challenge": "High cart abandonment rate (78%). Manual follow-up not scalable.", "solution": "AI agent monitors abandoned carts, sends personalized WhatsApp follow-ups with dynamic offers, handles objections.", "result": "35% cart recovery rate increase. Fully automated. Runs 24/7 without staff." },
      "cs": { "title": "Prodejní agent pro e-shop", "challenge": "Vysoká míra opuštění košíku (78 %). Manuální follow-up neškálovatelný.", "solution": "AI agent sleduje opuštěné košíky, posílá personalizované WhatsApp follow-upy s dynamickými nabídkami.", "result": "Nárůst míry obnovy košíku o 35 %. Plně automatizováno. Běží 24/7." },
      "uk": { "title": "Торговий агент для інтернет-магазину", "challenge": "Висока частота покинутих кошиків (78%). Ручний follow-up не масштабується.", "solution": "AI агент відстежує покинуті кошики, надсилає персоналізовані WhatsApp повідомлення з динамічними пропозиціями.", "result": "Зростання відновлення кошиків на 35%. Повна автоматизація." },
      "ru": { "title": "Торговый агент для интернет-магазина", "challenge": "Высокий процент брошенных корзин (78%). Ручной follow-up не масштабируется.", "solution": "AI агент отслеживает брошенные корзины, отправляет персонализированные WhatsApp сообщения с динамическими предложениями.", "result": "Рост восстановления корзин на 35%. Полная автоматизация." }
    }
  },
  {
    "id": "marketing-agency-landing",
    "slug": "marketing-agency-landing",
    "category": "landing",
    "industry": "Marketing",
    "techStack": ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    "result": "Landing page conversion rate: 8.4%",
    "cover": "/images/projects/project-7/cover.jpg",
    "images": ["/images/projects/project-7/01.jpg", "/images/projects/project-7/02.jpg", "/images/projects/project-7/03.jpg", "/images/projects/project-7/04.jpg", "/images/projects/project-7/05.jpg"],
    "translations": {
      "en": { "title": "High-Converting Landing for Marketing Agency", "challenge": "Agency's old landing page had 1.2% conversion rate. Slow, no mobile optimization.", "solution": "Redesigned and rebuilt from scratch: hero optimization, social proof, speed-first development (99 Lighthouse score).", "result": "Conversion rate jumped from 1.2% to 8.4%. Page speed 99/100. Lead cost reduced 60%." },
      "cs": { "title": "Vysoce konverzní landing pro marketingovou agenturu", "challenge": "Stará landing page agentury měla konverzní poměr 1,2 %. Pomalá, bez mobilní optimalizace.", "solution": "Přepracovali a přestavěli od základu: optimalizace hero sekce, sociální důkazy, vývoj zaměřený na rychlost (99 Lighthouse).", "result": "Konverzní poměr vzrostl z 1,2 % na 8,4 %. Rychlost stránky 99/100." },
      "uk": { "title": "Ефективний лендінг для маркетингового агентства", "challenge": "Старий лендінг агентства мав конверсію 1.2%. Повільний, без мобільної оптимізації.", "solution": "Повністю переробили: оптимізація hero, соціальні докази, розробка з фокусом на швидкість (99 Lighthouse).", "result": "Конверсія зросла з 1.2% до 8.4%. Швидкість сторінки 99/100." },
      "ru": { "title": "Высококонверсионный лендинг для маркетингового агентства", "challenge": "Старый лендинг агентства имел конверсию 1.2%. Медленный, без мобильной оптимизации.", "solution": "Полностью переработали: оптимизация hero, социальные доказательства, разработка с фокусом на скорость (99 Lighthouse).", "result": "Конверсия выросла с 1.2% до 8.4%. Скорость страницы 99/100." }
    }
  },
  {
    "id": "research-agent-realestate",
    "slug": "research-agent-realestate",
    "category": "agents",
    "industry": "Real Estate",
    "techStack": ["Anthropic API", "n8n", "Airtable", "Gmail"],
    "result": "Research time per property reduced from 3h to 8min",
    "cover": "/images/projects/project-8/cover.jpg",
    "images": ["/images/projects/project-8/01.jpg", "/images/projects/project-8/02.jpg", "/images/projects/project-8/03.jpg", "/images/projects/project-8/04.jpg", "/images/projects/project-8/05.jpg"],
    "translations": {
      "en": { "title": "Property Research Agent for Real Estate Firm", "challenge": "Analysts spent 3 hours per property gathering market data, comparables and risk factors.", "solution": "AI research agent autonomously gathers data from multiple sources, generates structured property reports and stores in Airtable.", "result": "Research time reduced from 3 hours to 8 minutes. Analysts focus on deals, not data gathering." },
      "cs": { "title": "Výzkumný agent pro realitní firmu", "challenge": "Analytici trávili 3 hodiny na nemovitost shromažďováním tržních dat.", "solution": "AI výzkumný agent autonomně shromažďuje data z více zdrojů, generuje strukturované zprávy a ukládá do Airtable.", "result": "Čas výzkumu snížen ze 3 hodin na 8 minut." },
      "uk": { "title": "Агент дослідження нерухомості", "challenge": "Аналітики витрачали 3 години на нерухомість для збору ринкових даних.", "solution": "AI агент автономно збирає дані з кількох джерел, генерує структуровані звіти та зберігає в Airtable.", "result": "Час дослідження скорочено з 3 годин до 8 хвилин." },
      "ru": { "title": "Агент исследования недвижимости", "challenge": "Аналитики тратили 3 часа на объект для сбора рыночных данных.", "solution": "AI агент автономно собирает данные из нескольких источников, генерирует структурированные отчёты и сохраняет в Airtable.", "result": "Время исследования сокращено с 3 часов до 8 минут." }
    }
  }
]
```

---

## 7. Translations Structure (`messages/en.json`)

```json
{
  "nav": {
    "home": "Home",
    "services": "Services",
    "projects": "Projects",
    "about": "About",
    "contact": "Contact",
    "getStarted": "Get Started"
  },
  "home": {
    "hero": {
      "tagline": "Automate. Scale. Grow.",
      "subtitle": "We build AI-powered automation systems that eliminate repetitive work and unlock growth for your business.",
      "ctaWork": "See Our Work",
      "ctaConsult": "Get Free Consultation"
    },
    "stats": {
      "processes": "Processes Automated",
      "hours": "Hours Saved / Month",
      "countries": "Countries Served"
    },
    "services": {
      "title": "What We Do",
      "subtitle": "End-to-end AI automation and software solutions"
    },
    "projects": {
      "title": "Recent Work",
      "subtitle": "Real results for real businesses",
      "seeAll": "See All Projects"
    },
    "tech": {
      "title": "Our Technology Stack"
    },
    "cta": {
      "title": "Ready to automate your business?",
      "subtitle": "Book a free 30-minute consultation. No commitment.",
      "button": "Book a Free Call"
    }
  },
  "services": {
    "title": "Our Services",
    "subtitle": "From automation to full software products",
    "getStarted": "Get Started"
  },
  "projects": {
    "title": "Our Projects",
    "subtitle": "Case studies with real, measurable results",
    "filters": {
      "all": "All",
      "automation": "Automation",
      "agents": "AI Agents",
      "software": "Software",
      "landing": "Landing Pages"
    },
    "industry": "Industry",
    "result": "Result",
    "techStack": "Tech Stack",
    "challenge": "The Challenge",
    "solution": "Our Solution",
    "viewCase": "View Case Study",
    "backToProjects": "Back to Projects",
    "similarChallenge": "Have a similar challenge?",
    "letsTalk": "Let's Talk"
  },
  "about": {
    "title": "About Us",
    "subtitle": "A small studio with big automation capabilities",
    "mission": {
      "title": "Our Mission",
      "text": "Help businesses automate repetitive processes, reduce operational costs and improve productivity through AI-powered solutions."
    },
    "industries": {
      "title": "Industries We Serve"
    },
    "tech": {
      "title": "Our Stack"
    },
    "cta": "Work With Us"
  },
  "contact": {
    "title": "Get In Touch",
    "subtitle": "Tell us about your project. We'll get back within 24 hours.",
    "form": {
      "name": "Full Name",
      "email": "Email Address",
      "company": "Company (optional)",
      "service": "Service Interested In",
      "serviceOptions": {
        "automation": "AI Automation",
        "agents": "AI Agents",
        "software": "Custom Software",
        "landing": "Landing Page",
        "other": "Other / Not Sure"
      },
      "message": "Tell us about your project",
      "send": "Send Message",
      "sending": "Sending...",
      "success": "Message sent! We'll be in touch within 24 hours.",
      "error": "Something went wrong. Please try again."
    },
    "info": {
      "email": "hello@automation-studio.com",
      "location": "Czech Republic",
      "hours": "Mon–Fri: 9:00–18:00 CET"
    }
  },
  "cookies": {
    "title": "Cookie Settings",
    "intro": "We use cookies to improve your experience on our website.",
    "necessary": {
      "title": "Necessary Cookies",
      "desc": "Required for the website to function. Cannot be disabled."
    },
    "analytics": {
      "title": "Analytics Cookies",
      "desc": "Help us understand how visitors use the site (Google Analytics)."
    },
    "marketing": {
      "title": "Marketing Cookies",
      "desc": "Used to show relevant advertisements."
    },
    "saveSettings": "Save Settings",
    "acceptAll": "Accept All",
    "rejectAll": "Reject All"
  },
  "cookieBanner": {
    "text": "We use cookies to improve your experience. See our",
    "link": "cookie settings",
    "accept": "Accept All",
    "settings": "Customize"
  },
  "footer": {
    "tagline": "Automating businesses with AI.",
    "rights": "All rights reserved",
    "cookieSettings": "Cookie Settings"
  },
  "meta": {
    "home": {
      "title": "AI Automation Studio | Automate. Scale. Grow.",
      "description": "We build AI-powered automation systems, AI agents and custom software for SMBs. Eliminate repetitive work and grow faster."
    },
    "services": {
      "title": "Services | AI Automation Studio",
      "description": "AI Automation, AI Agents, Custom Software Development and Landing Pages for businesses ready to scale."
    },
    "projects": {
      "title": "Projects | AI Automation Studio",
      "description": "Real case studies: logistics CRM automation, AI support agents, manufacturing dashboards and more."
    },
    "about": {
      "title": "About | AI Automation Studio",
      "description": "A small but powerful AI automation studio helping businesses across logistics, manufacturing, insurance and more."
    },
    "contact": {
      "title": "Contact | AI Automation Studio",
      "description": "Book a free consultation or send us a message. We respond within 24 hours."
    }
  }
}
```

---

## 8. Placeholder Images (temporary)

| Section | URL |
|---|---|
| Hero background | `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80` |
| AI Automation service | `https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80` |
| AI Agents service | `https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80` |
| Custom Software | `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80` |
| Landing Pages | `https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80` |
| Project — automation | `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80` |
| Project — software | `https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80` |
| Project — agents | `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80` |

---

## 9. SEO

Same pattern as construction site:
- `generateMetadata` per page with locale-aware title/description
- `sitemap.ts` covering all locales × all pages × all project slugs
- `robots.ts`
- `hreflang` via next-intl alternates
- **Structured data (JSON-LD)** — add `Organization` schema on homepage:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Automation Studio',
  url: 'https://automation-studio.com',
  description: 'AI-powered automation and software development studio',
  serviceType: ['AI Automation', 'AI Agents', 'Custom Software', 'Landing Pages'],
};
```

---

## 10. GitHub CMS — Adding a New Project

Same workflow as construction site:

**Via github.com (no code needed):**
1. Upload images to `public/images/projects/project-9/`
2. Edit `data/projects.json` — add new object with translations
3. Commit → Vercel auto-deploys in ~2 minutes

**Image specs:**
- `cover.jpg` — 1200×800px, max 300KB
- Gallery images — 1600×900px, max 500KB (16:9 ratio suits screenshots/diagrams better for tech projects)

---

## 11. Deploy — Vercel Setup

Same as construction site:
1. Push code to GitHub (`git@github.com:Katarzina/automation.git`)
2. vercel.com → New Project → import from GitHub
3. Auto-detects Next.js — deploy
4. Add env variables:

```env
NEXT_PUBLIC_SITE_URL=https://automation-studio.com
RESEND_API_KEY=re_...
EMAIL_TO=hello@automation-studio.com
```

---

## 12. Checklist Before Launch

- [ ] Replace placeholder images with real screenshots/diagrams
- [ ] Update company name, email, location in `messages/en.json`
- [ ] Set up contact form (Resend API)
- [ ] Add real project cases (or keep fictional ones until real ones are ready)
- [ ] Connect custom domain on Vercel
- [ ] Run Lighthouse audit (target: Performance 90+, SEO 100)
- [ ] Test language switcher across all 4 locales
- [ ] Test contact form submission
- [ ] Test lightbox on project detail pages
- [ ] Verify cookie banner + cookie settings page

---

*Created: 2026-06-09 | Project: AI Automation Studio | Next.js 14 + Vercel + GitHub CMS*
