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
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <Phone className="text-amber-700" />
              <a href="tel:+2348062870354" className="font-semibold text-amber-800">+234 806 287 0354</a>
              <span className="text-gray-400">•</span>
              <a href="tel:+2347039572446" className="font-semibold text-amber-800">+234 703 957 2446</a>
              <span className="text-gray-400">•</span>
              <a href="tel:+2349034234702" className="font-semibold text-amber-800">+234 903 423 4702</a>
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
            <div className="flex items-center gap-3 mt-2">
              {/* WhatsApp link with prefilled message; uses the first number as primary */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6 text-green-600 fill-current shrink-0" aria-hidden="true">
                <path d="M19.11 17.41c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.41-.07-.13-.27-.2-.57-.35zM16.05 3C8.83 3 3 8.82 3 16.05c0 2.3.6 4.54 1.74 6.52L3 29l6.64-1.74a13.02 13.02 0 0 0 6.41 1.64h.01C24.27 28.9 30.1 23.08 30.1 15.85 30.1 8.62 23.28 3 16.05 3zm7.71 19.79c-.33.92-1.91 1.76-2.61 1.88-.7.12-1.62.17-2.61-.16-1-.33-3.24-1.2-5.54-3.44-2.05-1.95-3.43-4.35-3.84-5.08-.41-.73-.92-2.01-.92-3.18 0-1.17.55-2.61 1.26-3.54.71-.93 1.56-1.17 2.1-1.17.54 0 1.05.01 1.51.03.49.02 1.15-.19 1.8 1.37.66 1.58 1.42 2.71 1.55 2.9.13.19.21.42.08.67-.13.25-.21.42-.42.65-.21.23-.45.51-.64.68-.21.2-.43.41-.19.81.24.4 1.07 1.76 2.3 2.86 1.58 1.4 2.92 1.85 3.33 2.05.41.2.66.18.9-.11.24-.29 1.04-1.23 1.32-1.66.28-.43.56-.36.94-.21.39.15 2.5 1.18 2.93 1.39.43.21.72.31.83.49.1.18.1 1.06-.23 1.98z"/>
              </svg>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href="https://wa.me/2348062870354?text=Hello%20Peace%20Bake%20Bakery%2C%20I%20would%20like%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-800"
                >
                  Abu Abdillah
                </a>
                <span className="text-gray-400">•</span>
                <a
                  href="https://wa.me/2347039572446?text=Hello%20Peace%20Bake%20Bakery%2C%20I%20would%20like%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-800"
                >
                  Ummu Abdillah
                </a>
                <span className="text-gray-400">•</span>
                <a
                  href="https://wa.me/2349034234702?text=Hello%20Peace%20Bake%20Bakery%2C%20I%20would%20like%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-800"
                >
                  Sale Rep
                </a>
              </div>
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
