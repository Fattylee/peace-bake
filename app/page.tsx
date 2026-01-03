"use client";

import { useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import BreadVariantsSection from "./components/BreadVariantsSection";
import SubscriptionPlans from "./components/SubscriptionPlans";
import BulkOrdersSection from "./components/BulkOrdersSection";
import TestimonialsSection from "./components/TestimonialsSection";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";

export default function BakeryLandingPage() {
  useEffect(() => {
    // Add breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://peacebakebakery.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: "https://peacebakebakery.com/#bread-variants",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Contact",
          item: "https://peacebakebakery.com/#location",
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-amber-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100 transition-colors">
      <Header />
      <HeroSection />
      <AboutSection />
      <BreadVariantsSection />
      <SubscriptionPlans />
      <BulkOrdersSection />
      <TestimonialsSection />
      <LocationSection />
      <Footer />
    </main>
  );
}
