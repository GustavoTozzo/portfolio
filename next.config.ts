import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV === "development";

// script-src needs 'unsafe-inline': Next's App Router streams RSC payloads via
// inline <script> tags whose content is per-page and can't be hash-allowlisted
// (a fixed hash only covers our own static theme-init script, not Next's own
// hydration data scripts) - true nonce-based CSP would fix this but requires
// dynamic rendering on every page, which conflicts with full SSG. Verified
// empirically (next build && next start): a strict script-src with no
// unsafe-inline and no nonce throws InvariantError / React error #412 at
// runtime, it's not just a lint-level concern. style-src stays strict since
// nothing here (no Radix, no next-themes) writes inline style attributes.
const cspDirectives = isDev
  ? [
      `default-src 'self'`,
      `script-src 'self' 'unsafe-eval' 'unsafe-inline'`,
      `style-src 'self' 'unsafe-inline'`,
      `img-src 'self' data: blob:`,
      `font-src 'self'`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
    ]
  : [
      `default-src 'self'`,
      `script-src 'self' 'unsafe-inline'`,
      `style-src 'self'`,
      `img-src 'self' data:`,
      `font-src 'self'`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `frame-ancestors 'none'`,
      `upgrade-insecure-requests`,
    ];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspDirectives.join("; ") },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/", destination: "/pt" },
      { source: "/projetos/:slug", destination: "/pt/projetos/:slug" },
      { source: "/projetos/:slug/opengraph-image", destination: "/pt/projetos/:slug/opengraph-image" },
      { source: "/estudos", destination: "/pt/estudos" },
    ];
  },
};

export default nextConfig;
