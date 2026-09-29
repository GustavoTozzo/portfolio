"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

type NavLink = { href: string; label: string };

export function MobileNav({
  links,
  labels,
}: {
  links: NavLink[];
  labels: { open: string; close: string; nav: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded border border-border text-foreground"
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        <span className="sr-only">{open ? labels.close : labels.open}</span>
      </button>
      {open ? (
        <nav
          id="mobile-nav-panel"
          aria-label={labels.nav}
          className="absolute inset-x-0 top-full border-b border-border bg-background px-4 py-4 sm:px-6"
        >
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 text-base text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
