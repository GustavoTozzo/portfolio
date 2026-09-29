import Link from "next/link";
import type { Locale } from "@/content/schema";
import { getDictionary } from "@/lib/dictionary";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const home = locale === "pt" ? "" : "/en";

  const links = [
    { href: `${home || "/"}#sobre`, label: dict.nav.about },
    { href: `${home || "/"}#skills`, label: dict.nav.skills },
    { href: `${home || "/"}#projetos`, label: dict.nav.projects },
    { href: `${home || "/"}#experiencia`, label: dict.nav.experience },
    { href: `${home || "/"}#educacao`, label: dict.nav.education },
    { href: `${home || "/"}#contato`, label: dict.nav.contact },
  ];

  return (
    <header className="relative border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href={home || "/"} className="font-display text-lg font-semibold text-foreground">
          {dict.brand}
        </Link>
        <nav aria-label={dict.ui.navLabel} className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm text-foreground">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitch locale={locale} />
          <ThemeToggle labels={{ light: dict.ui.lightTheme, dark: dict.ui.darkTheme }} />
          <MobileNav
            links={links}
            labels={{ open: dict.ui.openMenu, close: dict.ui.closeMenu, nav: dict.ui.navLabel }}
          />
        </div>
      </div>
    </header>
  );
}
