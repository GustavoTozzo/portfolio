import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { localeSchema } from "@/content/schema";
import { getContent } from "@/lib/get-content";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

const descriptions = {
  pt: "Portfólio de Gustavo Tozzo Campos — desenvolvedor back-end em transição da área de SEO técnico, com projetos reais em Java/Spring, Next.js e SQL.",
  en: "Portfolio of Gustavo Tozzo Campos — back-end developer transitioning from technical SEO, with real projects in Java/Spring, Next.js, and SQL.",
} as const;

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const parsed = localeSchema.safeParse(lang);
  const locale = parsed.success ? parsed.data : "pt";
  const description = descriptions[locale];
  const path = locale === "pt" ? "/" : "/en";

  return {
    title: "Gustavo Tozzo Campos",
    description,
    alternates: {
      canonical: path,
      languages: { pt: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: "Gustavo Tozzo Campos",
      description,
      url: path,
      type: "profile",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gustavo Tozzo Campos",
      description,
      images: ["/opengraph-image"],
    },
  };
}

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
