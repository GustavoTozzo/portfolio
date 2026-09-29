import type { Locale, SiteContent } from "@/content/schema";
import { getDictionary } from "@/lib/dictionary";

export function Experience({ locale, content }: { locale: Locale; content: SiteContent }) {
  const dict = getDictionary(locale);
  if (content.experience.length === 0) return null;

  return (
    <section id="experiencia" aria-labelledby="experience-heading" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h2 id="experience-heading" className="font-display text-3xl font-semibold text-foreground">
        {dict.nav.experience}
      </h2>
      <ul className="mt-6 space-y-8 border-l border-border pl-6">
        {content.experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="relative">
            <span aria-hidden="true" className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-background bg-accent" />
            <p className="text-sm text-muted">
              {job.period.start} — {job.period.end ?? dict.present}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{job.role}</h3>
            <p className="text-sm font-medium text-muted">{job.company}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="max-w-[65ch]">
                  {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
