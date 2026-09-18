import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats; AVIF first, WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Cache optimized variants for a year. Source images are content-addressed
    // by path, so a changed photo means a changed filename.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
