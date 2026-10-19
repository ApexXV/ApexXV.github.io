import type { NextConfig } from "next";

// Platform-independent static output; no Next/Vinext server is required to host out/.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
