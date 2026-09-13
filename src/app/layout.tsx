import type { Metadata } from "next";
import { Urbanist, Zilla_Slab } from "next/font/google";
import "./globals.css";
import { siteMeta } from "@/content/site";

// Fonts pulled from Figma (node 1:2): Urbanist (Regular/Light/Italic weights)
// for body/subheads, Zilla Slab (Bold Italic) for section headings.
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-urbanist",
  display: "swap",
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
  variable: "--font-zilla-slab",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: `%s | ${siteMeta.siteName}`,
  },
  description: siteMeta.description,
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: siteMeta.siteName,
    type: "website",
    images: ["/images/og-image.png"], // PLACEHOLDER — add a 1200x630 social preview image
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${zillaSlab.variable}`}>
      <body>
        {/* Skip link for keyboard/screen-reader users (accessibility) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
