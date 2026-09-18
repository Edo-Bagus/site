"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Lenis from "lenis";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getProject, type Project } from "@/lib/data";

const AUTO_ADVANCE_MS = 4000;

export function ProjectModal() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const slug = params.get("project");
  const project = getProject(slug);

  if (!project) return null;
  return (
    <Dialog
      key={project.slug}
      project={project}
      onClose={() => router.replace(pathname, { scroll: false })}
    />
  );
}

function Dialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [entered, setEntered] = useState(false);
  const [paused, setPaused] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const count = project.gallery.length;
  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  useEffect(() => {
    prevFocus.current = document.activeElement as HTMLElement;

    // Lock the background: fixed body preserves scroll position so closing
    // doesn't jump the page to the top (body-only overflow:hidden is unreliable
    // because the real scroller is often <html>).
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const raf = requestAnimationFrame(() => setEntered(true));
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") trapFocus(e, panelRef.current);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
      prevFocus.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-advance the carousel. Resets on any index change (including manual
  // nav), pauses on hover, and stands down for reduced-motion users.
  useEffect(() => {
    if (count <= 1 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      AUTO_ADVANCE_MS
    );
    return () => window.clearInterval(id);
  }, [count, paused, index]);

  // Give the modal its own Lenis so its scroll feels as smooth as the page.
  // data-lenis-prevent keeps the page-level Lenis out (it sees the attribute
  // on the panel); this scoped instance roots at the panel, so it doesn't.
  useEffect(() => {
    const wrapper = panelRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ wrapper, content, lerp: 0.1, wheelMultiplier: 1 });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* panel — the scroll container; overscroll-contain stops scroll chaining */}
      <div
        ref={panelRef}
        tabIndex={-1}
        data-lenis-prevent
        className={`modal-scroll relative z-10 max-h-[92dvh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-t-3xl border border-border bg-surface outline-none transition-all duration-300 ease-out sm:rounded-3xl ${
          entered ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/80 backdrop-blur transition-colors hover:bg-muted"
        >
          <X size={16} />
        </button>

        <div ref={contentRef} className="flex flex-col sm:flex-row-reverse">
          {/* Gallery column — right on desktop, sticky in view; top on mobile */}
          <div className="sm:w-[45%] sm:shrink-0">
            <div className="sm:sticky sm:top-0 sm:h-[92dvh]">
              <div
                className="relative aspect-[16/10] w-full overflow-hidden bg-muted sm:aspect-auto sm:h-full"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {project.gallery.map((g, i) => (
                  <div
                    key={i}
                    className="modal-slide absolute inset-0 grid place-items-center bg-gradient-to-br from-muted to-surface"
                    style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
                    aria-hidden={i !== index}
                  >
                    {g.src ? (
                      <>
                        {/* blurred fill so the frame is never empty */}
                        <Image
                          src={g.src}
                          alt=""
                          aria-hidden
                          fill
                          sizes="(max-width: 640px) 100vw, 640px"
                          className="scale-110 object-cover blur-2xl"
                        />
                        {/* sharp, fully-visible image on top */}
                        <Image
                          src={g.src}
                          alt={`${project.title}: ${g.caption}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 640px"
                          // Only the visible slide is worth fetching eagerly.
                          priority={i === 0}
                          className="relative object-contain"
                        />
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <span className="font-display text-xl font-bold text-muted-ink/40">
                          {project.title}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-widest text-muted-ink/60">
                          {g.caption}
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {count > 1 && (
                  <>
                    <button
                      onClick={() => go(-1)}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface/80 backdrop-blur transition-colors hover:bg-muted"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => go(1)}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface/80 backdrop-blur transition-colors hover:bg-muted"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                      {project.gallery.map((_, i) => (
                        <button
                          key={i}
                          aria-label={`Go to image ${i + 1}`}
                          onClick={() => setIndex(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === index ? "w-5 bg-lime" : "w-1.5 bg-ink/25"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Body column — left on desktop, scrolls */}
          <div className="flex min-w-0 flex-1 flex-col gap-5 p-6 sm:p-8">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-ink">
                {project.context}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <h2 id="modal-title" className="font-display text-3xl font-bold">
                  {project.title}
                </h2>
                {project.metric && (
                  <span className="rounded-full bg-lime px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-on-lime">
                    {project.metric}
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-ink">
                {project.role} · {project.year}
              </p>
            </div>

            <Block label="Problem">
              <p className="text-sm leading-relaxed text-muted-ink">{project.problem}</p>
            </Block>

            <Block label="What I did">
              <ul className="flex flex-col gap-2">
                {project.contributions.map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-strong" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Block>

            {project.results && (
              <Block label="Results">
                <ul className="flex flex-col gap-2">
                  {project.results.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-strong" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block label="Stack">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-ink"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Block>

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-1">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 font-mono text-xs font-medium uppercase tracking-widest text-on-lime transition-transform hover:-translate-y-0.5"
                  >
                    {l.label} <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-lime-strong">
        {label}
      </h3>
      {children}
    </div>
  );
}

function trapFocus(e: KeyboardEvent, container: HTMLElement | null) {
  if (!container) return;
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
