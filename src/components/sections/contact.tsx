import type { Locale, SiteContent } from "@/content/schema";
import { getDictionary } from "@/lib/dictionary";
import { ContactForm } from "@/components/contact-form";

export function Contact({ locale, content }: { locale: Locale; content: SiteContent }) {
  const dict = getDictionary(locale);
  const { profile } = content;

  return (
    <section id="contato" aria-labelledby="contact-heading" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h2 id="contact-heading" className="font-display text-3xl font-semibold text-foreground">
        {dict.contact.heading}
      </h2>
      <p className="mt-4 max-w-[65ch] text-foreground">
        {dict.contact.intro}{" "}
        <a href={`mailto:${profile.social.email}`} className="font-medium text-accent hover:underline">
          {profile.social.email}
        </a>
      </p>
      <div className="mt-8 max-w-lg">
        <ContactForm dict={dict.contact} />
      </div>
    </section>
  );
}
