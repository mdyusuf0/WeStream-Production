import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/layout/SkipLink";
import ClientLayout from "@/components/layout/ClientLayout";

// Montserrat for cinematic film-card headings
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
  display: "swap",
});

// Poppins for clean, highly readable body copy
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WeStream Production | Video Production & Live Streaming Bangalore",
    template: "%s | WeStream Production"
  },
  description: "Bangalore's premium video production, multi-camera live streaming, and event broadcasting company. End-to-end solutions for corporate, political, and cultural events across India.",
  keywords: [
    "video production Bangalore",
    "live streaming company India",
    "event broadcasting Bangalore",
    "corporate video production India",
    "political event live streaming",
    "WeStream Production",
    "broadcasting services Bangalore"
  ],
  openGraph: {
    title: "WeStream Production | Video Production & Live Streaming Bangalore",
    description: "Premium video production and multi-camera live streaming services based in Bangalore, operating across India.",
    url: "https://westream.in",
    siteName: "WeStream Production",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://westream.in/#organization",
        "name": "WeStream Production",
        "url": "https://westream.in",
        "logo": "https://westream.in/images/logo.png",
        "sameAs": [
          "https://www.instagram.com/westream_production"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://westream.in/#localbusiness",
        "name": "WeStream Production",
        "url": "https://westream.in",
        "telephone": "+91-0000000000",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 12.9716,
          "longitude": 77.5946
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
        <SkipLink />
        <ClientLayout>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ClientLayout>
      </body>
    </html>
  );
}
