import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        <div style={{ display: "flex", fontSize: 26, color: "#8891a0" }}>gustavotozzocampos.vercel.app</div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 20 }}>Gustavo Tozzo Campos</div>
        <div style={{ display: "flex", fontSize: 36, color: "#8891a0", marginTop: 16 }}>
          Desenvolvedor Back-end Júnior
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {["Java", "Spring Boot", "TypeScript", "SQL"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                border: "2px solid #232b36",
                borderRadius: 8,
                padding: "10px 22px",
                fontSize: 26,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
