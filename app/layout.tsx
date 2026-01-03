import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import ChatBot from "./components/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peace Bake Bakery | Fresh Bread Delivery in Ado-Odo Ota, Nigeria",
  description:
    "Premium freshly baked bread daily in Ado-Odo Ota. Family, Jumbo & Solo sizes. Order online or call +2348062870354. Free delivery available. Best quality local bakery.",
  keywords:
    "bakery Ado-Odo Ota, fresh bread Nigeria, bread delivery Ogun State, Peace Bake, whole wheat bread, sourdough, family loaf, bulk orders, local bakery",
  authors: [{ name: "Peace Bake Bakery" }],
  creator: "Peace Bake Bakery",
  publisher: "Peace Bake Bakery",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: "https://peacebakebakery.com",
  },
  openGraph: {
    title: "Peace Bake Bakery | Fresh Bread Daily",
    description:
      "Freshly baked bread available in multiple sizes. Order now from Peace Bake Bakery in Ado-Odo Ota.",
    url: "https://peacebakebakery.com",
    type: "website",
    locale: "en_NG",
    siteName: "Peace Bake Bakery",
    images: [
      {
        url: "/landing-page/Family and Family-Mini.jpg",
        width: 1200,
        height: 630,
        alt: "Peace Bake Bakery - Fresh Bread",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peace Bake Bakery | Fresh Bread Delivery",
    description: "Premium freshly baked bread in Ado-Odo Ota. Order now!",
    images: ["/landing-page/Family and Family-Mini.jpg"],
  },
  category: "Food & Beverage",
  classification: "Bakery",
  applicationName: "Peace Bake Bakery",
  referrer: "strict-origin-when-cross-origin",
  verification: {
    google: "your-google-verification-code",
    other: {
      "msvalidate.01": "your-microsoft-verification-code",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Peace Bake Bakery",
    image: "/landing-page/Family and Family-Mini.jpg",
    description:
      "Premium freshly baked bread daily in Ado-Odo Ota, Ogun State, Nigeria",
    telephone: ["+2348062870354", "+2349034234702", "+2347039572446"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ado-Odo Ota",
      addressLocality: "Ado-Odo Ota",
      addressRegion: "Ogun State",
      postalCode: "112122",
      addressCountry: "NG",
    },
    areaServed: "Ado-Odo Ota, Ogun State, Nigeria",
    priceRange: "₦500 - ₦5000",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "25",
    },
    sameAs: [
      "https://www.instagram.com/peacebakebakery",
      "https://www.facebook.com/peacebakebakery",
      "https://wa.me/2347039572446",
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" content="#b45309" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href="https://peacebakebakery.com" />
        <link
          rel="alternate"
          hrefLang="en-NG"
          href="https://peacebakebakery.com"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-950 text-gray-800 dark:text-gray-100 transition-colors`}
      >
        <ThemeProvider>
          {children}
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}
