import type { Locale } from "@/content/schema";

const hrefFor: Record<Locale, string> = { pt: "/", en: "/en" };
const locales = ["pt", "en"] as const;

export function LocaleSwitch({ locale }: { locale: Locale }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {locales.map((l) => (
        // Plain <a>, not next/link: switching locale changes the root [lang]
        // layout, and a client-side transition skips the inline theme script,
        // dropping data-theme even though localStorage still has it.
        <a
          key={l}
          href={hrefFor[l]}
          aria-current={locale === l ? "true" : undefined}
          className={locale === l ? "text-foreground" : "text-muted hover:text-foreground"}
        >
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
