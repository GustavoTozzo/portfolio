"use client";

import { useEffect, useRef, useState } from "react";

type ContactDict = {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submit: string;
  sending: string;
  success: string;
  errors: Record<string, string>;
};

export function ContactForm({ dict }: { dict: ContactDict }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const startedAtRef = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Recorded post-render (not during it, which the linter treats as an
  // impure render) - marks when the form actually became interactive, used
  // server-side as a naive "too fast to be human" bot check.
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      honeypot: String(formData.get("company") ?? ""),
      startedAt: startedAtRef.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body: { error?: string } = await response.json().catch(() => ({}));
        const key = body.error ?? "generic";
        setStatus("error");
        setErrorMessage(dict.errors[key] ?? dict.errors.generic ?? null);
        return;
      }

      setStatus("success");
      formRef.current?.reset();
      startedAtRef.current = Date.now();
    } catch {
      setStatus("error");
      setErrorMessage(dict.errors.generic ?? null);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          {dict.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-foreground focus-visible:border-accent focus-visible:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          {dict.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-foreground focus-visible:border-accent focus-visible:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          {dict.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-foreground focus-visible:border-accent focus-visible:outline-none"
        />
      </div>

      <div className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center rounded border border-foreground px-5 text-sm font-medium text-foreground hover:bg-foreground hover:text-background disabled:opacity-50"
      >
        {status === "sending" ? dict.sending : dict.submit}
      </button>

      <p aria-live="polite" className="text-sm">
        {status === "success" ? (
          <span className="text-foreground">{dict.success}</span>
        ) : status === "error" && errorMessage ? (
          <span className="text-accent-2">{errorMessage}</span>
        ) : null}
      </p>
    </form>
  );
}
