import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { isRateLimited } from "@/lib/rate-limit";

const MIN_FILL_MS = 3000;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }
  const { name, email, message, honeypot, startedAt } = parsed.data;

  if (honeypot) {
    // Bot tripped the honeypot - pretend success so it doesn't learn to avoid this field.
    return NextResponse.json({ ok: true });
  }
  if (Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ error: "too_fast" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfólio Gustavo Tozzo <onboarding@resend.dev>",
      to: toEmail,
      reply_to: email,
      subject: `Novo contato de ${name}`,
      text: `${message}\n\n—\n${name} <${email}>`,
    }),
  });

  if (!emailResponse.ok) {
    console.error("Resend error", await emailResponse.text());
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
