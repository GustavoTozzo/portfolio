import type { Locale, SiteContent } from "@/content/schema";
import { getDictionary } from "@/lib/dictionary";

export function Hero({ locale, content }: { locale: Locale; content: SiteContent }) {
  const dict = getDictionary(locale);
  const { profile } = content;
  const home = locale === "pt" ? "" : "/en";

  return (
    <section aria-labelledby="hero-heading" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 id="hero-heading" className="font-display text-5xl font-semibold text-foreground sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-2 text-xl text-muted">{profile.role}</p>

      <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-2/40 bg-accent-2/10 px-4 py-1.5 text-sm font-medium text-foreground">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-2" />
        {dict.hero.availabilityLabel}: {profile.availability} — {profile.location}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href={`${home || "/"}#projetos`}
          className="inline-flex h-11 items-center rounded border border-foreground px-5 text-sm font-medium text-foreground hover:bg-foreground hover:text-background"
        >
          {dict.hero.viewProjects}
        </a>
        <a
          href={profile.social.github}
          className="inline-flex h-11 items-center rounded border border-border px-5 text-sm font-medium text-foreground hover:border-accent"
        >
          GitHub
        </a>
        {profile.social.linkedin ? (
          <a
            href={profile.social.linkedin}
            className="inline-flex h-11 items-center rounded border border-border px-5 text-sm font-medium text-foreground hover:border-accent"
          >
            LinkedIn
          </a>
        ) : null}
        <div className="flex items-center gap-4 text-sm text-muted">
          {profile.cvHref ? (
            <a href={profile.cvHref} className="hover:text-foreground hover:underline">
              {dict.hero.downloadCv}
            </a>
          ) : null}
          <a href={`mailto:${profile.social.email}`} className="hover:text-foreground hover:underline">
            {profile.social.email}
          </a>
        </div>
      </div>
    </section>
  );
}
