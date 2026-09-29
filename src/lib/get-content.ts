import { content as pt } from "@/content/pt";
import { content as en } from "@/content/en";
import type { Locale } from "@/content/schema";

const contentByLocale = { pt, en } satisfies Record<Locale, unknown>;

export function getContent(locale: Locale) {
  return contentByLocale[locale];
}
