import type { Metadata } from "next";

const ogImage = {
  url: "/og-image.jpg",
  type: "image/jpeg",
  width: 1200,
  height: 630,
  alt: "AP3X Operations LLC logo and ap3xoperations.com on a dark navy banner.",
};

// Per-page title, description, canonical URL and link-preview tags.
// Next.js replaces (rather than merges) openGraph per page, so the image is repeated here.
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  const fullTitle = `${title} | AP3X Operations LLC`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "AP3X Operations LLC",
      url: path,
      title: fullTitle,
      description,
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.jpg"],
    },
  };
}
