import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { localeSchema } from "@/content/schema";
import { themeInitScript } from "@/lib/theme-script";
import { getDictionary } from "@/lib/dictionary";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import "../globals.css";

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

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${plexSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <SkipLink label={dict.skip} />
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
