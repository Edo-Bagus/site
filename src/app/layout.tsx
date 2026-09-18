import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd } from "@/components/JsonLd";
import { owner } from "@/lib/data";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  // Makes every relative URL below (and in child routes) resolve absolutely.
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${owner.shortName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: owner.name, url: siteUrl }],
  creator: owner.name,
  publisher: owner.name,
  keywords: [
    owner.name,
    owner.shortName,
    "Software Engineer",
    "AI Engineer",
    "Backend Engineer",
    "Data Engineer",
    "Machine Learning",
    "Portfolio",
    "Universitas Gadjah Mada",
    "UGM",
    "Yogyakarta",
    "Indonesia",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    siteName,
    title: siteTitle,
    description: siteDescription,
    url: "/",
    locale: "en_US",
    firstName: "Eduardus Bagus",
    lastName: "Wicaksono",
    username: "Edo-Bagus",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${owner.name} — ${owner.headlineTechnical}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

// Icons resolve from the file conventions in src/app: favicon.ico, icon.svg, apple-icon.png.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0a" },
  ],
};

// Set theme before paint to avoid flash; drop the no-js guard.
const themeScript = `(function(){try{document.documentElement.classList.remove('no-js');var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`no-js ${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <JsonLd />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
