import { contentSchema } from "./schema";

export const content = contentSchema.parse({
  profile: {
    name: "Gustavo Tozzo Campos",
    role: "Junior Back-end Developer",
    location: "Maringá, PR — Brazil",
    availability: "Internship, remote/full-time, junior or freelance",
    positioning:
      "I build APIs and services in Java/Spring with a versioned, tested database, ready for a team to build on top of.",
    cvHref: "/cv/gustavo-tozzo-campos-cv.pdf",
    social: {
      github: "https://github.com/GustavoTozzo",
      linkedin: "https://www.linkedin.com/in/gustavotozzo/",
      email: "gustavotozzo21@gmail.com",
    },
    about: [
      "After almost 4 years as an SEO Analyst at Agência liveSEO — optimizing Core Web Vitals, editing front-end code, and automating data analysis for e-commerce clients — I'm moving into back-end development. I'm currently studying Systems Analysis and Development at Instituto Infnet, building APIs in Java and Spring Boot, like on MedSafe Senior.",
      "I bring a solid data foundation from SEO (SQL, Oracle PL/SQL, Power BI, Python) that I combine with what I'm learning in back-end now — including this portfolio itself, built in Next.js and TypeScript. I'm open to internship, remote or full-time roles, junior positions, and freelance work.",
    ],
    languages: ["English"],
  },
  skills: [
    {
      category: "linguagens",
      items: [
        { name: "Java", usageContext: "MedSafe Senior, Farmácia Encomendas" },
        { name: "Kotlin", usageContext: "MedSafe Senior (mobile)" },
        { name: "TypeScript", usageContext: "this portfolio" },
        { name: "Python", usageContext: "data automation and analysis, SEO Analyst role" },
      ],
    },
    {
      category: "backend",
      items: [
        { name: "Spring Boot", usageContext: "MedSafe Senior, Farmácia Encomendas" },
        { name: "Spring Data JPA", usageContext: "Farmácia Encomendas" },
        { name: "PostgreSQL", usageContext: "MedSafe Senior" },
        { name: "Flyway", usageContext: "MedSafe Senior, Farmácia Encomendas" },
      ],
    },
    {
      category: "frontend",
      items: [
        { name: "React", usageContext: "this portfolio" },
        { name: "Next.js", usageContext: "this portfolio" },
        { name: "Tailwind CSS", usageContext: "this portfolio" },
      ],
    },
    {
      category: "dados",
      items: [
        { name: "SQL", usageContext: "4 years as an SEO Analyst" },
        { name: "Oracle PL/SQL", usageContext: "SEO Analyst role" },
        { name: "Power BI", usageContext: "SEO Analyst role" },
        { name: "Looker Studio", usageContext: "SEO Analyst role" },
      ],
    },
    {
      category: "ferramentas",
      items: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "Maven" },
        { name: "pnpm" },
        { name: "Google Apps Script", usageContext: "SEO Analyst role" },
        { name: "WordPress", usageContext: "SEO Analyst role" },
      ],
    },
  ],
  projects: [
    {
      slug: "medsafe-senior",
      title: "MedSafe Senior",
      problem:
        "Elderly patients forget medication schedules, and caregivers have no visibility into history or home stock.",
      stack: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "Kotlin", "Jetpack Compose"],
      metrics: ["6 passing integration tests", "83h of documented process (Trello + GitHub)"],
      repoUrl: "https://github.com/GustavoTozzo/software-senior-backend",
      category: "fullstack",
      featured: true,
      caseStudy: {
        context:
          "A semester-long academic project (280h) to help elderly users stay on top of medication, with a backend caregivers and pharmacies use too.",
        decisions: [
          "Full CRUD for User, Medication, Intake History and Pharmacy, with business rules like automatic stock deduction and WhatsApp link generation to contact the pharmacy",
          "Versioned migrations with Flyway and separate datasource profiles for dev and test",
          "Global exception handling for consistent API error responses",
        ],
        challenges: [
          "Spring Boot 4 renamed the starters and moved Jackson's package (tools.jackson, not com.fasterxml) — had to verify every dependency with mvn compile instead of assuming from Boot 3 experience",
          "The repo, synced through OneDrive, had its .git internals corrupted (a stuck rebase-merge with no real conflict behind it) — needed a manual cleanup",
        ],
        retrospective:
          "Given more time, I'd add contract tests between the backend and mobile app before scaling up the business rules further.",
      },
    },
    {
      slug: "biblioteca-online",
      title: "Biblioteca Online",
      problem:
        "An academic digital-library project had stalled halfway — just a Java console app, no real API or authentication — and needed to become something that could actually be shown running.",
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS"],
      metrics: ["In production on Vercel", "8 phases + post-deploy polish"],
      repoUrl: "https://github.com/GustavoTozzo/biblioteca-online",
      demoUrl: "https://biblioteca-online-snowy.vercel.app",
      category: "fullstack",
      caseStudy: {
        context:
          "A full Next.js rewrite of an academic digital-library project (unit rentals + monthly/semestral/annual subscriptions) that only existed as an incomplete Java console app — no API, no real authentication.",
        decisions: [
          "Prisma 7 + the Neon adapter (WebSocket driver) for serverless Postgres on Vercel, with connection config moved to prisma.config.ts (Prisma 7 removed url/directUrl from schema.prisma)",
          "NextAuth v5 with Credentials + JWT; every sensitive action (price, book existence, owning user) is re-derived server-side, never trusting the client payload",
          "Simulated payment: the card number never leaves the browser beyond the last 4 digits",
          "The /gratuitos feature: 5 public-domain books manually verified against the Internet Archive (access status + a DRM-free PDF) before listing any as free",
        ],
        challenges: [
          "next/image injects style=\"color:transparent\" on every <img> — a strict CSP style-src with no unsafe-inline silently broke every book cover; only showed up in a real next build && next start, not next dev",
          "A production redirect-to-localhost bug survived ~20 minutes after removing the env var — a stale Edge Middleware bundle cached at a specific Vercel PoP, only fixed by a deploy with an actual code change",
        ],
        retrospective:
          "Formatting a birthdate and seeing the wrong day taught me to always test date formatting in a real browser (a date string parses as UTC midnight), not just read the code.",
      },
    },
    {
      slug: "seo-toolkit",
      title: "SEO Toolkit",
      problem:
        "Python scripts I used day-to-day as an SEO Analyst lived scattered across personal notebooks — no version control, no documentation, real client data mixed in.",
      stack: ["Python", "Next.js", "TypeScript", "Tailwind CSS"],
      metrics: ["7 documented tools", "live demo tested against a real 526-URL sitemap"],
      repoUrl: "https://github.com/GustavoTozzo/seo-toolkit",
      demoUrl: "https://seo-toolkit-nine.vercel.app",
      category: "fullstack",
      caseStudy: {
        context:
          "7 technical-SEO Python scripts I used at Agência liveSEO, scrubbed of any real client data and reorganized as a public repo with a Next.js documentation site and live demos.",
        decisions: [
          "Each tool is documented straight from its actual .py file (read at build time and highlighted with shiki) — the code shown on the site can never drift from the real source",
          "Only the sitemap extractor has a live, credential-free demo, with SSRF guards (blocks localhost/private IPs) and caps of 15 sitemaps / 500 URLs / 10s",
          "A mock SEO/GA4 dashboard with deterministic (fixed-seed) data, marked noindex — it must never look like real data to a crawler",
        ],
        challenges: [
          "Python's own stdlib robots.txt parser (urllib.robotparser) silently drops every 'User-agent: *' block after the first — a real CPython bug, confirmed by reproducing it against wordpress.org's robots.txt before and after the fix",
          "The first version of the validator flagged anthropic.com as 'blocks everything' because the site 403s urllib's generic User-Agent — fixed by fetching robots.txt with an identifiable User-Agent",
        ],
        retrospective:
          "Still missing the ideas already suggested on the site itself: a batch Core Web Vitals auditor and a keyword-cannibalization detector via Search Console.",
      },
    },
  ],
  experience: [
    {
      role: "SEO Analyst",
      company: "Agência liveSEO",
      period: { start: "Jun 2022", end: "Nov 2025" },
      bullets: [
        "Optimized technical performance (Core Web Vitals) and indexing across e-commerce platforms including VTEX, Shopify, WordPress, and Nuvemshop",
        "Implemented front-end code changes (HTML, CSS, JS) for new components and UX improvements",
        "Automated spreadsheet data analysis with complex formulas and Google Apps Script",
      ],
    },
  ],
  education: [
    {
      institution: "Instituto Infnet",
      program: "B.Sc. in Systems Analysis and Development",
      period: { start: "Jul 2024", end: "Jun 2027" },
      status: "cursando",
    },
  ],
});
