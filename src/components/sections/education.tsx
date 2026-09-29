import { ArrowRight } from "lucide-react";
import type { Locale, SiteContent } from "@/content/schema";
import { getDictionary } from "@/lib/dictionary";

export function Education({ locale, content }: { locale: Locale; content: SiteContent }) {
  const dict = getDictionary(locale);
  const courseworkHref = locale === "pt" ? "/estudos" : "/en/estudos";

  return (
    <section id="educacao" aria-labelledby="education-heading" className="bg-panel">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 id="education-heading" className="font-display text-3xl font-semibold text-foreground">
          {dict.education.heading}
        </h2>
        <ul className="mt-6 space-y-6 border-l border-border pl-6">
          {content.education.map((entry) => (
            <li key={`${entry.institution}-${entry.program}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-panel bg-accent-2"
              />
              <p className="text-sm text-muted">
                {entry.period.start} — {entry.period.end ?? dict.present}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{entry.program}</h3>
              <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <span className="font-medium">{entry.institution}</span>
                <span className="rounded border border-border px-2 py-0.5 text-xs">
                  {entry.status === "cursando" ? dict.education.inProgress : dict.education.completed}
                </span>
              </p>
            </li>
          ))}
        </ul>
        <a
          href={courseworkHref}
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          {dict.education.viewCoursework}
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
