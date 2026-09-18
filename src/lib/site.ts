import { owner } from "./data";

/**
 * Single source of truth for the deployed origin. Override per-environment with
 * NEXT_PUBLIC_SITE_URL (Vercel preview deploys, staging, a future domain change).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://edo-bagus.my.id"
).replace(/\/$/, "");

export const siteName = `${owner.shortName} · Portfolio`;

/** Keeps the tab title, OG title and structured data saying the same thing. */
export const siteTitle = `${owner.name} · ${owner.headlineTechnical}`;

export const siteDescription =
  "Portfolio of Eduardus Bagus Wicaksono (Edo Bagus), a Software & AI Engineer in Yogyakarta " +
  "focused on backend and data. Crash-detection ML at 99.5% recall, a Wi-Fi CSI people-counting " +
  "thesis at 93.6% accuracy, and a rental SaaS running in 10 businesses.";

export const absolute = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
