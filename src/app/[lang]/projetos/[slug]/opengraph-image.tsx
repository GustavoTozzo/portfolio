import { ImageResponse } from "next/og";
import { localeSchema } from "@/content/schema";
import { getContent } from "@/lib/get-content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const parsed = localeSchema.safeParse(lang);
  const locale = parsed.success ? parsed.data : "pt";
  const project = getContent(locale).projects.find((p) => p.slug === slug);
  const title = project?.title ?? "Gustavo Tozzo Campos";
  const stack = project?.stack ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#10151d",
          color: "#e7eaee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#8891a0" }}>Gustavo Tozzo Campos</div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, marginTop: 20 }}>{title}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 44 }}>
          {stack.slice(0, 5).map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                border: "2px solid #232b36",
                borderRadius: 8,
                padding: "10px 22px",
                fontSize: 26,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
