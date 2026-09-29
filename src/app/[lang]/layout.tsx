import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { localeSchema } from "@/content/schema";
import { themeInitScript } from "@/lib/theme-script";
import { getDictionary } from "@/lib/dictionary";
import { getContent } from "@/lib/get-content";
import { SITE_URL } from "@/lib/site-config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Gustavo Tozzo Campos",
    default: "Gustavo Tozzo Campos — Desenvolvedor Back-end Júnior",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "pt" }, { lang: "en" }];
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const parsed = localeSchema.safeParse(lang);
  if (!parsed.success) notFound();
  const locale = parsed.data;
  const dict = getDictionary(locale);
  const { profile, skills } = getContent(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: SITE_URL,
    email: `mailto:${profile.social.email}`,
    sameAs: [profile.social.github, profile.social.linkedin].filter(
      (value): value is string => Boolean(value),
    ),
    knowsAbout: skills.flatMap((group) => group.items.map((item) => item.name)),
  };

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${plexSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="font-sans antialiased">
        <SkipLink label={dict.skip} />
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
