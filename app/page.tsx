"use client";

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
