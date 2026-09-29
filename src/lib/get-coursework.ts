import { coursework as pt } from "@/content/coursework-pt";
import { coursework as en } from "@/content/coursework-en";
import type { Locale } from "@/content/schema";

const courseworkByLocale = { pt, en } satisfies Record<Locale, unknown>;

export function getCoursework(locale: Locale) {
  return courseworkByLocale[locale];
}
