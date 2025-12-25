"use client";

import { Leaf, Flame, Heart } from "lucide-react";

const specialties = [
  {
    name: "Whole Wheat Bread",
    description: "Rich, nutty flavor packed with fiber and nutrients",
    icon: Leaf,
    benefits: ["High in fiber", "Rich nutrients", "Wholesome taste"],
  },
  {
    name: "Sourdough Bread",
    description: "Tangy, artisanal bread with a crispy crust and soft interior",
    icon: Flame,
    benefits: ["Tangy flavor", "Better digestion", "Slow fermented"],
  },
  {
    name: "Multigrain Bread",
    description:
      "Blend of seeds, grains, and whole wheat for maximum nutrition",
    icon: Heart,
    benefits: ["Nutrient-rich", "Variety of grains", "Crunchy texture"],
  },
];

export default function SpecialtyBreadSection() {
  return (
    <section className="py-20 px-6 bg-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Our Specialty Breads
          </h2>
          <p className="text-gray-700 text-lg">
            Artisanal breads crafted with love and the finest ingredients
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {specialties.map((bread, index) => {
            const Icon = bread.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mb-6">
                  <Icon className="text-amber-700 w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-amber-900 mb-3">
                  {bread.name}
                </h3>
                <p className="text-gray-600 mb-6">{bread.description}</p>
                <ul className="space-y-2">
                  {bread.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">
            Custom Bread Orders
          </h3>
          <p className="text-gray-600 mb-6">
            Interested in flavored breads (garlic, herbs, seeds, raisins) or
            custom blends? Contact us via WhatsApp!
          </p>
          <a
            href="https://wa.me/2348062870354?text=I%20am%20interested%20in%20custom%20bread%20orders"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Request Custom Bread
          </a>
        </div>
      </div>
    </section>
  );
}
