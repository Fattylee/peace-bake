"use client";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import BreadVariantsSection from "./components/BreadVariantsSection";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";

export default function BakeryLandingPage() {
  return (
    <main className="min-h-screen bg-amber-50 text-gray-800">
      <HeroSection />
      <AboutSection />
      <BreadVariantsSection />
      <LocationSection />
      <Footer />
    </main>
  );
}
