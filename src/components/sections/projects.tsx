import { ArrowRight } from "lucide-react";
import type { Locale, SiteContent } from "@/content/schema";
import { getDictionary } from "@/lib/dictionary";

export function Projects({ locale, content }: { locale: Locale; content: SiteContent }) {
  const dict = getDictionary(locale);
  const home = locale === "pt" ? "" : "/en";

  return (
    <section id="projetos" aria-labelledby="projects-heading" className="bg-panel">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 id="projects-heading" className="font-display text-3xl font-semibold text-foreground">
          {dict.nav.projects}
        </h2>
        <ul className="mt-6 space-y-4">
          {content.projects.map((project) => (
            <li
              key={project.slug}
              className="border-y border-r border-l-2 border-border border-l-accent bg-background py-5 pl-4 pr-4 transition-colors hover:border-accent sm:pl-6 sm:pr-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="flex flex-wrap gap-2 text-xs text-muted">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </p>
              </div>
              <p className="mt-2 max-w-[65ch] text-sm text-foreground">{project.problem}</p>
              {project.metrics.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.metrics.map((metric) => (
                    <li key={metric}>
                      <span className="inline-flex items-center rounded border border-accent-2/40 bg-accent-2/10 px-3 py-1 text-sm font-medium text-foreground">
                        {metric}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              {project.caseStudy ? (
                <a
                  href={`${home}/projetos/${project.slug}`}
                  className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                >
                  {dict.projects.viewCase}
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              ) : null}
              {project.repoUrl ? (
                <a href={project.repoUrl} className="text-muted hover:text-foreground">
                  {dict.projects.repo}
                </a>
              ) : null}
              {project.demoUrl ? (
                <a href={project.demoUrl} className="text-muted hover:text-foreground">
                  {dict.projects.demo}
                </a>
              ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
