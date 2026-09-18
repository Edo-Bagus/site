import { owner, projects } from "@/lib/data";
import { absolute, siteDescription, siteName, siteUrl } from "@/lib/site";

/**
 * Structured data for the single-page portfolio. One @graph so search engines see
 * the site, the page and the person as connected nodes rather than three loose blobs.
 * Projects are emitted as CreativeWork so the case studies can surface on their own.
 */
export function JsonLd() {
  const personId = `${siteUrl}/#person`;

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      description: siteDescription,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#webpage`,
      url: `${siteUrl}/`,
      name: `${owner.name} · ${owner.headlineTechnical}`,
      description: siteDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": personId,
      name: owner.name,
      alternateName: owner.shortName,
      givenName: "Eduardus Bagus",
      familyName: "Wicaksono",
      url: `${siteUrl}/`,
      image: absolute("/profile.jpg"),
      email: `mailto:${owner.email}`,
      jobTitle: owner.headlineTechnical,
      description: owner.summary,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Yogyakarta",
        addressCountry: "ID",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universitas Gadjah Mada",
        sameAs: "https://ugm.ac.id/",
      },
      knowsAbout: [
        "Backend Engineering",
        "Artificial Intelligence",
        "Machine Learning",
        "Data Engineering",
        "Signal Processing",
        "Internet of Things",
      ],
      sameAs: [owner.github, owner.linkedin],
      seeks: {
        "@type": "Demand",
        name: "Software, AI, backend and data engineering roles",
      },
    },
    ...projects.map((p) => ({
      "@type": "CreativeWork",
      "@id": `${siteUrl}/#project-${p.slug}`,
      name: p.title,
      headline: p.title,
      description: p.blurb,
      url: absolute(`/?project=${p.slug}`),
      dateCreated: p.year,
      inLanguage: "en",
      keywords: p.tags.join(", "),
      creator: { "@id": personId },
      author: { "@id": personId },
      isPartOf: { "@id": `${siteUrl}/#webpage` },
      ...(p.gallery.find((g) => g.src)
        ? { image: absolute(p.gallery.find((g) => g.src)!.src!) }
        : {}),
    })),
  ];

  return (
    <script
      type="application/ld+json"
      // Values come from our own content module, so there is no untrusted input here.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
