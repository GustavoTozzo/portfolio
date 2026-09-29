import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { localeSchema, type Locale } from "@/content/schema";
import { getContent } from "@/lib/get-content";
import { getDictionary } from "@/lib/dictionary";
import { SITE_URL } from "@/lib/site-config";

const breadcrumbLabels = {
  pt: { home: "Início", projects: "Projetos" },
  en: { home: "Home", projects: "Projects" },
} as const;

function projectsWithCaseStudy(locale: Locale) {
  return getContent(locale).projects.filter((p) => p.caseStudy);
}

export async function generateStaticParams() {
  const locales: Locale[] = ["pt", "en"];
  return locales.flatMap((lang) => projectsWithCaseStudy(lang).map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projetos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const parsed = localeSchema.safeParse(lang);
  const locale = parsed.success ? parsed.data : "pt";
  const project = getContent(locale).projects.find((p) => p.slug === slug);
  if (!project) return {};
  const path = locale === "pt" ? `/projetos/${slug}` : `/en/projetos/${slug}`;

  return {
    title: project.title,
    description: project.problem,
    alternates: {
      canonical: path,
      languages: {
        pt: `/projetos/${slug}`,
        en: `/en/projetos/${slug}`,
        "x-default": `/projetos/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.problem,
      url: path,
      images: [`${path}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.problem,
      images: [`${path}/opengraph-image`],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps<"/[lang]/projetos/[slug]">) {
  const { lang, slug } = await params;
  const parsed = localeSchema.safeParse(lang);
  if (!parsed.success) notFound();
  const locale = parsed.data;
  const dict = getDictionary(locale);
  const project = getContent(locale).projects.find((p) => p.slug === slug);
  if (!project || !project.caseStudy) notFound();
  const { caseStudy } = project;
  const home = locale === "pt" ? "/" : "/en";
  const labels = breadcrumbLabels[locale];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.home, item: `${SITE_URL}${home}` },
      { "@type": "ListItem", position: 2, name: labels.projects, item: `${SITE_URL}${home}#projetos` },
      { "@type": "ListItem", position: 3, name: project.title },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <a href={`${home}#projetos`} className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={14} aria-hidden="true" />
        {dict.projectDetail.backHome}
      </a>

      <h1 className="mt-8 font-display text-3xl font-semibold text-foreground sm:text-4xl">{project.title}</h1>
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <span className="inline-flex items-center rounded border border-border px-3 py-1 text-sm text-foreground">
              {tech}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-[65ch] text-lg text-foreground">{project.problem}</p>
      {project.metrics.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          {project.metrics.map((metric) => (
            <li key={metric}>{metric}</li>
          ))}
        </ul>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        {project.repoUrl ? (
          <a href={project.repoUrl} className="font-medium text-accent hover:underline">
            {dict.projectDetail.repo}
          </a>
        ) : null}
        {project.demoUrl ? (
          <a href={project.demoUrl} className="font-medium text-accent hover:underline">
            {dict.projectDetail.demo}
          </a>
        ) : null}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold text-foreground">{dict.projectDetail.context}</h2>
        <p className="mt-2 max-w-[65ch] text-foreground">{caseStudy.context}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-foreground">{dict.projectDetail.decisions}</h2>
        <ul className="mt-3 space-y-2">
          {caseStudy.decisions.map((decision) => (
            <li key={decision} className="max-w-[65ch] text-foreground">
              {decision}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-foreground">{dict.projectDetail.challenges}</h2>
        <ul className="mt-3 space-y-2">
          {caseStudy.challenges.map((challenge) => (
            <li key={challenge} className="max-w-[65ch] text-foreground">
              {challenge}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-foreground">{dict.projectDetail.retrospective}</h2>
        <p className="mt-2 max-w-[65ch] text-foreground">{caseStudy.retrospective}</p>
      </section>
    </div>
  );
}
