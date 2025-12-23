"use client";

import { Phone, MapPin } from "lucide-react";

export default function BakeryLandingPage() {
  return (
    <main className="min-h-screen bg-amber-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-200 to-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-amber-900 leading-tight">
              Freshly Baked Happiness
            </h1>
            <p className="mt-6 text-lg text-amber-800">
              Welcome to{" "}
              <span className="font-semibold">Peace Bake Bakery</span>, where
              every loaf is baked with love, quality ingredients, and peace of
              mind.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:+2348062870354"
                className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-xl shadow-lg transition"
              >
                Call to Order
              </a>
              <a
                href="https://wa.me/2348062870354?text=Hello%20Peace%20Bake%20Bakery%2C%20I%20would%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
              >
                Order on WhatsApp
              </a>
              <a
                href="#location"
                className="border border-amber-700 text-amber-800 px-6 py-3 rounded-xl hover:bg-amber-100 transition"
              >
                Visit Us
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 md:h-60 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/Family and Family-Mini.jpg"
                alt="Family and Family Mini Bread"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative h-48 md:h-60 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/Jumbo and Family-mini size bread_.jpg"
                alt="Jumbo Bread"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative col-span-2 h-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Family-mini.jpeg"
                alt="Peace Bake Bread Display"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
            Why Choose Peace Bake Bakery?
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            Located in the heart of Ado-Odo Ota, we serve our community with
            freshly baked bread every day. From soft family loaves to
            golden-crusted delights, our bakery is committed to quality,
            affordability, and consistency.
          </p>
        </div>
        <div className="mt-12 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            "Always Fresh",
            "Quality Ingredients",
            "Loved by the Community",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md text-center"
            >
              <h3 className="text-xl font-semibold text-amber-800">{item}</h3>
              <p className="mt-4 text-gray-600">
                We bake daily to ensure every customer enjoys fresh, nourishing
                bread straight from the oven.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bread Variants */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center">
            Our Bread Variants
          </h2>
          <p className="mt-4 text-center text-gray-700">
            Freshly baked daily to suit every family size and appetite.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Jumbo",
                price: "₦1,500",
                desc: "Perfect for large families and events",
              },
              {
                name: "Family",
                price: "₦1,000",
                desc: "Ideal for everyday family meals",
              },
              {
                name: "Family Mini",
                price: "₦800",
                desc: "Smaller size, same great taste",
              },
              {
                name: "Solo",
                price: "₦400",
                desc: "Great for individuals and quick bites",
              },
            ].map((bread, index) => (
              <div
                key={index}
                className="rounded-2xl border border-amber-200 bg-amber-50 p-8 shadow-md text-center"
              >
                <h3 className="text-2xl font-semibold text-amber-800">
                  {bread.name}
                </h3>
                <p className="mt-3 text-3xl font-bold text-amber-900">
                  {bread.price}
                </p>
                <p className="mt-4 text-gray-600">{bread.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="location" className="bg-amber-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-amber-900">
              Visit Our Bakery
            </h2>
            <p className="mt-6 text-gray-700">We are proudly located at:</p>
            <div className="mt-4 flex items-start gap-3">
              <MapPin className="text-amber-700 mt-1" />
              <span>
                7, Peace Bake Str,
                <br />
                Olugbode, Ado-Odo Ota,
                <br />
                Ogun State, Nigeria
              </span>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Phone className="text-amber-700" />
              <a
                href="tel:+2348062870354"
                className="font-semibold text-amber-800"
              >
                +234 806 287 0354
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-amber-800">
              Opening Hours
            </h3>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li>Monday – Saturday: 7:00 AM – 8:00 PM</li>
              <li>Sunday: 8:00 AM – 8:00 PM</li>
            </ul>
            <a
              href="tel:+2348062870354"
              className="mt-8 inline-block bg-amber-700 text-white px-6 py-3 rounded-xl hover:bg-amber-800 transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © {new Date().getFullYear()} Peace Bake Bakery. All rights reserved.
          </p>
          <p className="text-sm">Baking peace into every loaf.</p>
        </div>
      </footer>
    </main>
  );
}
