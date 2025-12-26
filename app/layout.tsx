import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peace Bake Bakery | Fresh Bread Delivery in Ado-Odo Ota",
  description:
    "Freshly baked bread daily in Ado-Odo Ota, Ogun State. Order your favorite bread online or call +234 806 287 0354. Family, Jumbo, and Solo sizes available.",
  keywords: "bakery, fresh bread, Ado-Odo Ota, Peace Bake, bread delivery",
  openGraph: {
    title: "Peace Bake Bakery | Fresh Bread Daily",
    description:
      "Freshly baked bread available in multiple sizes. Order now from Peace Bake Bakery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-950 text-gray-800 dark:text-gray-100 transition-colors`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
