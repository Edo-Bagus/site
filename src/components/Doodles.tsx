import type { SVGProps } from "react";

/** GitHub mark (lucide dropped brand icons). */
export function GithubIcon({ size = 18, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

/** LinkedIn mark. */
export function LinkedinIcon({ size = 18, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

/** Hand-drawn underline stroke — place under a highlighted word. */
export function Squiggle({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      aria-hidden
      className={className}
      {...props}
    >
      <path
        d="M3 12C40 5 70 5 96 9c26 4 40 6 70 1 22-4 44-6 68-3"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Four-point sparkle/star accent. */
export function Sparkle({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} {...props}>
      <path
        d="M12 1c.6 5.6 4.4 9.4 10 10-5.6.6-9.4 4.4-10 10-.6-5.6-4.4-9.4-10-10C7.6 10.4 11.4 6.6 12 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Loose hand-drawn circle/scribble — decorative accent behind elements. */
export function Scribble({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={className} {...props}>
      <path
        d="M92 12C56 6 22 24 16 54c-6 30 26 54 62 54 30 0 66-16 66-48 0-26-28-44-58-46-24-2-48 8-58 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/** Sticker-style starburst badge with centered text. */
export function StickerBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-grid place-items-center ${className ?? ""}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
        <path
          fill="var(--lime)"
          d="M60 2l9 13 15-7 3 16 16 3-7 15 13 9-13 9 7 15-16 3-3 16-15-7-9 13-9-13-15 7-3-16-16-3 7-15L2 60l13-9-7-15 16-3 3-16 15 7z"
        />
      </svg>
      <span className="absolute w-[3.4rem] text-center font-mono text-[9px] font-medium uppercase leading-[1.15] tracking-wide text-on-lime">
        {children}
      </span>
    </span>
  );
}
