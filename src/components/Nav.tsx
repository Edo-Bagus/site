"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { owner } from "@/lib/data";

const links = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          {owner.shortName}
          <span className="text-lime-strong">.</span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-1 hidden items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-ink sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-2 transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink transition-colors hover:bg-muted"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-lime px-4 py-2 font-mono text-xs font-medium uppercase tracking-widest text-on-lime transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            Let&apos;s talk
          </a>
        </div>
      </nav>
    </header>
  );
}
