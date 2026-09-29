import type { Locale } from "@/content/schema";
import { getDictionary } from "@/lib/dictionary";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {year} Gustavo Tozzo Campos</p>
        <a
          href="https://github.com/GustavoTozzo/portfolio"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          {dict.footer.sourceCode}
        </a>
      </div>
    </footer>
  );
}
