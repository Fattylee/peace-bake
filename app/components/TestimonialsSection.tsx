"use client";

import { Star } from "lucide-react";
import { WHATSAPP_BASE_URL } from "../constants";

const testimonials = [
  {
    name: "Chioma Adeyemi",
    role: "Regular Customer",
    image: "👩‍🦰",
    rating: 5,
    text: "The freshest bread I've ever tasted! I can't go a week without ordering from Peace Bake. Halal certified and absolutely delicious.",
  },
  {
    name: "Popoola Sulaimon Olatunde",
    role: "Office Manager",
    image: "👨‍💼",
    rating: 5,
    text: "We supply our office with Peace Bake bread daily. Our staff loves it, and the bulk discount is amazing. Highly recommended!",
  },
  {
    name: "Iya Teacher",
    role: "Shopkeeper",
    image: "👨‍🏭",
    rating: 5,
    text: "Best wholesale partner! Fresh delivery every morning, and customers always ask for Peace Bake specifically. Great quality and reliability.",
  },
  {
    name: "Zainab Ibrahim",
    role: "Event Planner",
    image: "👩‍🎓",
    rating: 5,
    text: "Supplied bread for 200 guests at our community event. Peace Bake delivered on time with perfect quality. Will definitely use again!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-900 dark:text-amber-300 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg dark:text-gray-300">
            Trusted by individuals, businesses, and communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-amber-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-amber-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-amber-700">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-gray-700 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-r from-amber-600 to-orange-500 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Join Thousands of Happy Customers
          </h3>
          <p className="text-amber-50 text-lg mb-8">
            Experience the difference fresh, halal-certified bread makes
          </p>
          <a
            href={`${WHATSAPP_BASE_URL}?text=Hello%20Peace%20Bake%20Bakery%2C%20I%20would%20like%20to%20place%20an%20order.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-amber-700 hover:bg-amber-50 px-8 py-3 rounded-xl font-bold transition"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
}
