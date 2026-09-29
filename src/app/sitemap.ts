import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { getContent } from "@/lib/get-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = getContent("pt")
    .projects.filter((p) => p.caseStudy)
    .map((p) => p.slug);
  const paths = ["/", "/estudos", ...projectSlugs.map((slug) => `/projetos/${slug}`)];
  const lastModified = new Date();

  return paths.flatMap((path) => [
    { url: `${SITE_URL}${path}`, lastModified },
    { url: `${SITE_URL}/en${path === "/" ? "" : path}`, lastModified },
  ]);
}
