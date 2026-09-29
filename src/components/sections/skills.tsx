import type { Locale, SiteContent } from "@/content/schema";
import { getDictionary } from "@/lib/dictionary";

const categoryLabels: Record<string, { pt: string; en: string }> = {
  linguagens: { pt: "Linguagens", en: "Languages" },
  frontend: { pt: "Front-end", en: "Front-end" },
  backend: { pt: "Back-end", en: "Back-end" },
  dados: { pt: "Dados", en: "Data" },
  ferramentas: { pt: "Ferramentas", en: "Tools" },
};

export function Skills({ locale, content }: { locale: Locale; content: SiteContent }) {
  const dict = getDictionary(locale);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h2 id="skills-heading" className="font-display text-3xl font-semibold text-foreground">
        {dict.nav.skills}
      </h2>
      <div className="mt-6 space-y-6">
        {content.skills.map((group) => (
          <div key={group.category} className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="w-32 shrink-0 text-sm font-semibold text-foreground">
              {categoryLabels[group.category]?.[locale] ?? group.category}
            </p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.name}>
                  <span
                    className="inline-flex items-center rounded border border-border px-3 py-1 text-sm text-foreground transition-colors hover:border-accent hover:bg-accent/10"
                    title={item.usageContext}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
