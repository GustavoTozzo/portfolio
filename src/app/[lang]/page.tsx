import { notFound } from "next/navigation";
import { localeSchema } from "@/content/schema";
import { getContent } from "@/lib/get-content";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const parsed = localeSchema.safeParse(lang);
  if (!parsed.success) notFound();
  const locale = parsed.data;
  const content = getContent(locale);

  return (
    <>
      <Hero locale={locale} content={content} />
      <About locale={locale} content={content} />
      <Skills locale={locale} content={content} />
      <Projects locale={locale} content={content} />
      <Experience locale={locale} content={content} />
      <Education locale={locale} content={content} />
      <Contact locale={locale} content={content} />
    </>
  );
}
