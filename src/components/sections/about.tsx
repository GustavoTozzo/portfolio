import type { Locale, SiteContent } from "@/content/schema";
import { getDictionary } from "@/lib/dictionary";

export function About({ locale, content }: { locale: Locale; content: SiteContent }) {
  const dict = getDictionary(locale);
  const { profile } = content;

  return (
    <section id="sobre" aria-labelledby="about-heading" className="bg-panel">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 id="about-heading" className="font-display text-3xl font-semibold text-foreground">
          {dict.nav.about}
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_auto]">
          <div className="max-w-[65ch] space-y-4 text-foreground">
            {profile.about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <dl className="grid gap-4 text-sm md:w-56">
            <div>
              <dt className="text-muted">{dict.about.location}</dt>
              <dd className="mt-0.5 text-base font-medium text-foreground">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-muted">{dict.about.availability}</dt>
              <dd className="mt-0.5 text-base font-medium text-foreground">{profile.availability}</dd>
            </div>
            {profile.languages && profile.languages.length > 0 ? (
              <div>
                <dt className="text-muted">{dict.about.languages}</dt>
                <dd className="mt-0.5 text-base font-medium text-foreground">{profile.languages.join(", ")}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </section>
  );
}
