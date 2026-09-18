import { Globe } from "lucide-react";
import { techStack, capabilities } from "@/lib/data";
import { TechIcon } from "./TechIcons";

export function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <div className="reveal mb-12 flex items-center justify-between gap-4">
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-ink">
              <span className="inline-block h-px w-8 bg-lime-strong" /> Skills
            </p>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">The toolkit</h2>
          </div>
          <Globe
            className="spin-slow hidden h-14 w-14 shrink-0 text-lime-strong sm:block"
            aria-hidden
          />
        </div>

        {/* Tech-logo grid */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-11">
          {techStack.map((t, i) => (
            <div key={t.name} className="reveal" data-reveal-delay={i * 30}>
              <div className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-4 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-lime-strong">
                <span
                  className="floaty text-ink transition-colors group-hover:text-lime-strong"
                  style={{ animationDelay: `${(i % 6) * 0.35}s` }}
                >
                  <TechIcon name={t.icon} />
                </span>
                <span className="text-center font-mono text-[10px] uppercase tracking-wider text-muted-ink">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities (no logo — kept as text) */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {capabilities.map((group, i) => (
            <div key={group.title} className="reveal" data-reveal-delay={i * 80}>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-lime-strong">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-snug text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
