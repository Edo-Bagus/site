import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { Squiggle } from "./Doodles";

// Convention: each project's card cover is public/projects/<slug>/cover.jpg|jpeg.
// Resolved on the server at render/build time so missing files fall back cleanly
// (no broken-image requests) and either extension works.
function resolveCover(slug: string): string | undefined {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (fs.existsSync(path.join(dir, `cover.${ext}`))) {
      return `/projects/${slug}/cover.${ext}`;
    }
  }
  return undefined;
}

function Thumb({ p }: { p: Project }) {
  // Real cover when available; otherwise placeholder art.
  const cover = p.cover ?? resolveCover(p.slug);
  return (
    <div className="grain relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted to-surface">
      {cover ? (
        /* full-bleed cover: fills the 16:10 frame, cropping as needed */
        <Image
          src={cover}
          alt={`${p.title} — ${p.role}`}
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6">
          <span className="text-center font-display text-2xl font-bold text-muted-ink/40">
            {p.title}
          </span>
        </div>
      )}
      <span className="absolute left-4 top-4 h-2 w-2 rounded-full bg-lime" />
      <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-lime text-on-lime opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Maximize2 size={14} />
      </span>
    </div>
  );
}

function Meta({ p }: { p: Project }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-muted-ink">
      {p.role} · {p.year}
    </p>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-ink"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function CardLink({ slug, title }: { slug: string; title: string }) {
  return (
    <Link
      href={`?project=${slug}`}
      scroll={false}
      aria-label={`Open case study: ${title}`}
      className="absolute inset-0 z-10 rounded-2xl"
    />
  );
}

function ExternalLinks({ p }: { p: Project }) {
  if (!p.links.length) return null;
  return (
    <div className="relative z-20 flex flex-wrap gap-3">
      {p.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-ink underline-offset-4 transition-colors hover:text-lime-strong hover:underline"
        >
          {l.label} <ArrowUpRight size={13} />
        </a>
      ))}
    </div>
  );
}

export function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="reveal mb-12 flex items-end justify-between gap-4">
        <div>
          <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-ink">
            <span className="inline-block h-px w-8 bg-lime-strong" /> Selected work
          </p>
          <h2 className="relative inline-block font-display text-4xl font-bold sm:text-5xl">
            Things I&apos;ve built
            <Squiggle className="absolute -bottom-3 left-0 w-40 text-lime" />
          </h2>
        </div>
        <span className="hidden font-mono text-xs uppercase tracking-widest text-muted-ink sm:block">
          {projects.length} projects
        </span>
      </div>

      {/* Featured */}
      <div className="grid gap-8 lg:grid-cols-3">
        {featured.map((p, i) => (
          <article
            key={p.slug}
            className="reveal group relative flex flex-col gap-4"
            data-reveal-delay={i * 80}
          >
            <CardLink slug={p.slug} title={p.title} />
            <Thumb p={p} />
            <div className="flex items-center gap-3">
              <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-lime-strong">
                {p.title}
              </h3>
              {p.metric && (
                <span className="rounded-full bg-lime px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-on-lime">
                  {p.metric}
                </span>
              )}
            </div>
            <Meta p={p} />
            <p className="text-sm leading-relaxed text-muted-ink">{p.blurb}</p>
            <div className="mt-auto flex flex-col gap-3 pt-2">
              <Tags tags={p.tags} />
              <ExternalLinks p={p} />
            </div>
          </article>
        ))}
      </div>

      {/* The rest */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <article
            key={p.slug}
            className="reveal group relative flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-lime-strong"
            data-reveal-delay={i * 60}
          >
            <CardLink slug={p.slug} title={p.title} />
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-bold transition-colors group-hover:text-lime-strong">
                {p.title}
              </h3>
              {p.metric && (
                <span className="rounded-full bg-lime px-2 py-0.5 font-mono text-[10px] font-medium uppercase text-on-lime">
                  {p.metric}
                </span>
              )}
            </div>
            <Meta p={p} />
            <p className="text-sm leading-relaxed text-muted-ink">{p.blurb}</p>
            <div className="mt-auto flex flex-col gap-3 pt-2">
              <Tags tags={p.tags} />
              <ExternalLinks p={p} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
