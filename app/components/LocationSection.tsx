import { Phone, MapPin, Mail } from "lucide-react";

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
          <div className="mt-6 flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-amber-900">Contact Us</h3>
            <p className="text-gray-700">We'd love to hear from you. Call or email us and we’ll get back to you as soon as possible.</p>
            <div className="flex items-center gap-3 mt-2">
              <Phone className="text-amber-700" />
              <a
                href="tel:+2348062870354"
                className="font-semibold text-amber-800"
              >
                +234 806 287 0354
              </a>
            </div>
            <div className="flex items-center gap-3 ml-9">
              <a
                href="tel:+2347039572446"
                className="font-semibold text-amber-800"
              >
                +234 703 957 2446
              </a>
            </div>
            <div className="flex items-center gap-3 ml-9">
              <a
                href="tel:+2349034234702"
                className="font-semibold text-amber-800"
              >
                +234 903 423 4702
              </a>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Mail className="text-amber-700" />
              <a
                href="mailto:fattylee.remod@gmail.com?subject=Inquiry%20from%20Peace%20Bake%20Bakery%20Website&body=Hello%20Peace%20Bake%20Bakery%2C%0A%0AI%E2%80%99d%20like%20to%20ask%20about...%0A%0AThank%20you!"
                className="font-semibold text-amber-800"
              >
                fattylee.remod@gmail.com
              </a>
            </div>
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
