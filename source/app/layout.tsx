import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://ap3xoperations.com";
const siteTitle = "AP3X Operations LLC | Operations, Technology & 3D Printing";
const siteDescription =
  "Practical business operations, technology support, and 3D printing for small businesses and project teams. Based in Franklin, NY. Available for remote work anywhere.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "AP3X Operations LLC",
    url: "/",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "AP3X Operations LLC logo and ap3xoperations.com on a dark navy banner.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  other: {
    "geo.region": "US-NY",
    "geo.placename": "Franklin, New York",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0A1D28",
};

// Structured data for search engines: a local service business with remote reach.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#business`,
  name: "AP3X Operations LLC",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/brand/ap3x-symbol.png`,
  image: `${siteUrl}/og-image.jpg`,
  description: siteDescription,
  email: "sebastien@ap3xoperations.com",
  founder: { "@type": "Person", name: "Sebastien Gifford" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Franklin",
    addressRegion: "NY",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Place", name: "Remote / worldwide" },
  ],
  knowsAbout: [
    "Business operations",
    "Technology support",
    "Additive manufacturing",
    "3D printing",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Business Operations",
        description:
          "Process documentation, coordination, reporting, and day-to-day administrative systems.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Technology Support",
        description:
          "Setup, troubleshooting, cloud-service configuration, and lightweight workflow improvements.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Additive Manufacturing / 3D Printing",
        description:
          "Design preparation, prototyping, and custom prints for reviewed, non-safety-critical applications.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </body>
    </html>
  );
}
