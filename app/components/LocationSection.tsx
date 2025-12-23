import { Phone, MapPin } from "lucide-react";

export default function LocationSection() {
  return (
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
  );
}
