import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { localeSchema } from "@/content/schema";
import { getCoursework } from "@/lib/get-coursework";
import { getDictionary } from "@/lib/dictionary";

export default async function CourseworkPage({ params }: PageProps<"/[lang]/estudos">) {
  const { lang } = await params;
  const parsed = localeSchema.safeParse(lang);
  if (!parsed.success) notFound();
  const locale = parsed.data;
  const dict = getDictionary(locale);
  const coursework = getCoursework(locale);
  const home = locale === "pt" ? "/" : "/en";

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <a href={home} className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ArrowLeft size={14} aria-hidden="true" />
        {dict.coursework.backHome}
      </a>

      <h1 className="mt-8 font-display text-3xl font-semibold text-foreground sm:text-4xl">{coursework.discipline}</h1>
      <p className="mt-4 max-w-[65ch] text-lg text-foreground">{coursework.intro}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={coursework.repoUrl}
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          {dict.coursework.repo}
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {coursework.concepts.map((concept) => (
          <li key={concept}>
            <span className="inline-flex items-center rounded border border-border px-3 py-1 text-sm text-foreground">
              {concept}
            </span>
          </li>
        ))}
      </ul>

      {coursework.groups.map((group) => (
        <section key={group.slug} aria-labelledby={`group-${group.slug}`} className="mt-16">
          <h2 id={`group-${group.slug}`} className="font-display text-2xl font-semibold text-foreground">
            {group.title}
          </h2>
          <p className="mt-1 max-w-[65ch] text-sm text-muted">{group.focus}</p>

          <ul className="mt-6 space-y-4">
            {group.cases.map((c) => (
              <li key={c.title} className="border-y border-r border-l-2 border-border border-l-accent-2 py-4 pl-4 pr-4 sm:pl-6 sm:pr-6">
                <h3 className="font-display text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 max-w-[65ch] text-sm text-foreground">{c.context}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                  {c.points.map((point) => (
                    <li key={point} className="max-w-[65ch]">
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 max-w-[65ch] text-sm text-muted">{c.demonstrates}</p>
                {c.sourceUrl ? (
                  <a
                    href={c.sourceUrl}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    {dict.coursework.viewSource}
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
