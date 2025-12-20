import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

// Comprehensive SEO Metadata for Adult Site
export const metadata: Metadata = {
  // Basic Meta
  title: {
    default: "TheLittleSlush - Free Adult GIFs & Videos | Premium Adult Entertainment",
    template: "%s | TheLittleSlush"
  },
  description: "Discover millions of free adult GIFs and videos on TheLittleSlush. Stream trending amateur, professional, and exclusive adult content. Updated daily with fresh content. 18+ only.",

  // Keywords (still used by some search engines)
  keywords: [
    "adult videos", "adult gifs", "free porn", "adult entertainment",
    "nsfw content", "amateur videos", "adult streaming", "18+ content",
    "free adult content", "trending adult videos", "premium adult"
  ],

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph (for social sharing - limited for adult sites but still useful)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thelittleslush.fun",
    siteName: "TheLittleSlush",
    title: "TheLittleSlush - Free Adult GIFs & Videos",
    description: "Stream millions of free adult GIFs and videos. Updated daily with trending content. 18+ only.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TheLittleSlush - Adult Entertainment",
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "TheLittleSlush - Free Adult GIFs & Videos",
    description: "Stream millions of free adult GIFs and videos. 18+ only.",
    images: ["/og-image.png"],
  },

  // Canonical URL
  alternates: {
    canonical: "https://thelittleslush.fun",
  },

  // Additional Meta
  category: "Adult",
  creator: "TheLittleSlush",
  publisher: "TheLittleSlush",

  // App-specific
  applicationName: "TheLittleSlush",

  // Verification codes
  verification: {
    google: "7yckzzbYm_YTaveJ02kggJROc12-fC3UjZvf4iQQz0w",
  },

  // Other
  other: {
    "rating": "adult",
    "RATING": "RTA-5042-1996-1400-1577-RTA",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

// JSON-LD Structured Data for Adult Site
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TheLittleSlush",
  "alternateName": ["thelittleslush.fun", "The Little Slush"],
  "url": "https://thelittleslush.fun",
  "description": "Free adult GIFs and video streaming platform with millions of trending content.",
  "inLanguage": "en-US",
  "isAccessibleForFree": true,
  "isFamilyFriendly": false,
  "contentRating": "adult only",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://thelittleslush.fun/?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TheLittleSlush",
  "url": "https://thelittleslush.fun",
  "logo": "https://thelittleslush.fun/logo.png",
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@thelittleslush.fun"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* RTA Label for Adult Content Classification */}
        <meta name="RATING" content="RTA-5042-1996-1400-1577-RTA" />
        <meta name="rating" content="adult" />
        <meta name="rating" content="RTA-5042-1996-1400-1577-RTA" />

        {/* ICRA Label (deprecated but still recognized by some filters) */}
        <meta httpEquiv="pics-label" content='(pics-1.1 "http://www.icra.org/ratingsv02.html" l gen true for "https://thelittleslush.fun" r (nz 1 vz 1 lz 1 oz 1 cb 1))' />

        {/* Prevent archiving sensitive content */}
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://www.redgifs.com" />
        <link rel="preconnect" href="https://api.redgifs.com" />
        <link rel="preconnect" href="https://thumbs44.redgifs.com" />
        <link rel="dns-prefetch" href="https://www.redgifs.com" />
        <link rel="dns-prefetch" href="https://api.redgifs.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />

        {/* Ad Script */}
        <Script
          src="https://schemecontinuingwinning.com/01/d0/15/01d0154d0a5abd0840590209beefed64.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Script
          src="https://schemecontinuingwinning.com/0f/ac/44/0fac4414f03bbabd87c051fcb182e716.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
