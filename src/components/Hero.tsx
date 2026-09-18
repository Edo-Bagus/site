import { ArrowUpRight, MapPin } from "lucide-react";
import { owner, stats } from "@/lib/data";
import { Squiggle, Sparkle, Scribble, StickerBadge, GithubIcon, LinkedinIcon } from "./Doodles";

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden border-b border-border">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-24 lg:pt-20">
        {/* Left: copy */}
        <div className="reveal flex flex-col justify-center">
          <p className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-ink">
            <span className="inline-block h-px w-8 bg-lime-strong" />
            Hi, I&apos;m {owner.shortName}
          </p>

          <h1 className="font-display text-[13vw] font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Software &amp;{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">AI Engineer</span>
              <Squiggle className="absolute -bottom-2 left-0 w-full text-lime" />
            </span>{" "}
            <Sparkle className="inline h-7 w-7 align-top text-lime-strong" />
            <span className="block text-muted-ink">Backend &amp; Data.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-ink">
            {owner.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-on-lime transition-transform hover:-translate-y-0.5"
            >
              View my work <ArrowUpRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:bg-muted"
            >
              Get in touch
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={owner.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:bg-muted"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={owner.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:bg-muted"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          <p className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-ink">
            <MapPin size={14} /> {owner.location}
          </p>
        </div>

        {/* Right: cutout-photo placeholder on a tilted lime shape */}
        <div className="reveal relative mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-none">
          <Scribble className="pointer-events-none absolute -left-6 top-4 hidden h-28 w-36 text-lime-strong lg:block" />
          <div className="relative aspect-[4/5] w-full max-w-[22rem]">
            {/* lime backdrop shape */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-[2rem] bg-lime" />
            {/* photo card */}
            <div className="grain absolute inset-0 -rotate-2 overflow-hidden rounded-[2rem] border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.jpg"
                alt={owner.name}
                className="h-full w-full object-cover"
              />
            </div>
            <StickerBadge className="absolute -bottom-5 -left-5 h-24 w-24 rotate-[-8deg]">
              Open to work
            </StickerBadge>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-border">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-border sm:grid-cols-4 sm:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-5 py-6">
              <dt className="font-display text-3xl font-bold sm:text-4xl">{s.value}</dt>
              <dd className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-ink">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
