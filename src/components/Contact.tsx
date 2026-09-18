import { ArrowUpRight, Mail } from "lucide-react";
import { owner } from "@/lib/data";
import { Sparkle, StickerBadge, GithubIcon, LinkedinIcon } from "./Doodles";

export function Contact() {
  return (
    <footer id="contact" className="grain relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 lg:py-32">
        <div className="reveal flex flex-col items-start gap-8">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-ink">
            <span className="inline-block h-px w-8 bg-lime-strong" /> Contact
          </p>

          <h2 className="max-w-3xl font-display text-5xl font-bold leading-[0.98] sm:text-7xl">
            Let&apos;s build something{" "}
            <span className="text-lime-strong">good</span>.
            <Sparkle className="ml-2 inline h-8 w-8 align-top text-lime" />
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${owner.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-on-lime transition-transform hover:-translate-y-0.5"
            >
              <Mail size={16} /> {owner.email}
            </a>
            <a
              href={owner.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:bg-muted"
            >
              <GithubIcon size={16} /> GitHub <ArrowUpRight size={14} />
            </a>
            <a
              href={owner.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:bg-muted"
            >
              <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold">
              {owner.name}
              <span className="text-lime-strong">.</span>
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-ink">
              {owner.headlineTechnical} · {owner.grad}
            </p>
          </div>
          <StickerBadge className="h-20 w-20 rotate-6">Say hi</StickerBadge>
        </div>
      </div>
    </footer>
  );
}
