import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Deductions — AP3X",
  description: "Owner-only AP3X mobile deductions intake shell.",
  alternates: {
    canonical: "/deductions",
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [
      {
        url: "/deductions-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/deductions-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/deductions-icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/deductions.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Deductions",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#0b0913",
};

export default function DeductionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      {children}
    </>
  );
}
