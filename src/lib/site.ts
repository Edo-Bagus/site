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

/**
 * Kept under ~160 characters (~965px at 13px Arial) so Google shows it whole
 * instead of truncating mid-sentence.
 */
export const siteDescription =
  "Portfolio of Eduardus Bagus W. (Edo Bagus), Software & AI Engineer in Yogyakarta. " +
  "Backend, AI and data work, from crash-detection ML to a live rental SaaS.";

export const absolute = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
