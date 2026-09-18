# SEO

## Where things live

| Concern | File |
| --- | --- |
| Base URL, shared title/description | `src/lib/site.ts` |
| Meta, Open Graph, Twitter, canonical, robots directives | `src/app/layout.tsx` |
| Structured data (JSON-LD) | `src/components/JsonLd.tsx` |
| `sitemap.xml` | `src/app/sitemap.ts` |
| `robots.txt` | `src/app/robots.ts` |
| Social share card (1200x630) | `src/app/opengraph-image.tsx` |
| Favicon / touch icon | `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` |

## Changing the domain

One place: `siteUrl` in `src/lib/site.ts`, or set `NEXT_PUBLIC_SITE_URL` in the
environment (Vercel project settings) to override without a code change.
Everything else derives from it.

## Notes

- **Canonical is always `/`.** Project modals are `?project=<slug>` URLs on the
  same page. They are listed in the sitemap because they are shareable, but they
  canonicalise to `/` so ranking signals are not split across nine near-duplicates.
- **The OG card is generated at build time** by `opengraph-image.tsx` using real
  Space Grotesk, subset to Latin and instanced to static weights in
  `src/app/_fonts/` (~16KB each). Satori cannot use variable fonts or woff2, which
  is why those static TTFs are committed rather than reusing next/font.
  The card reads from `owner` and `stats` in `data.ts`, so it stays in sync.
- **Structured data is one `@graph`** (WebSite -> ProfilePage -> Person, plus a
  CreativeWork per project) so the nodes reference each other by `@id` instead of
  sitting as unconnected blobs. Projects are generated from `data.ts`; adding a
  project to that array adds it to the graph and the sitemap automatically.

## After deploying

1. Verify the share card at https://www.opengraph.xyz/ (paste the live URL).
2. Test structured data at https://validator.schema.org/.
3. Add the property in Google Search Console and submit
   `https://edo-bagus.my.id/sitemap.xml`.
