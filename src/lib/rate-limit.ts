// In-memory only: resets on cold start and isn't shared across serverless
// instances, so this is a soft limit on Vercel, not a hard guarantee. Good
// enough for a low-traffic contact form; swap for Upstash Ratelimit (Redis)
// if abuse becomes a real problem.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_REQUESTS;
}
