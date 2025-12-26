import { Phone, MapPin, Mail } from "lucide-react";
import { Fragment } from "react";
import { CALL_TO_ACTION_PHONE_NUMBER } from "../constants";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function LocationSection() {
  const phoneContacts = [
    { label: "Sales Rep", number: "+2349034234702" },
    { label: "Ummu Abdillah", number: "+2347039572446" },
    { label: "Abu Abdillah", number: "+2348062870354" },
  ];
  // write a function convert +2348062870354 to +234 806 287 0354
  const convertPhoneNumber = (number: string) => {
    return number.replace(/(\+234)(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
  };

  return (
    <section
      id="location"
      className="bg-amber-100 dark:bg-slate-700 py-20 px-6 transition-colors"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-300">
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
            <p className="text-gray-700">
              We&rsquo;d love to hear from you. Call or email us and we&rsquo;ll
              get back to you as soon as possible.
            </p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <Phone className="text-amber-700" />
              {phoneContacts.map((contact, index) => (
                <Fragment key={index}>
                  <a
                    href={`tel:${contact.number}`}
                    className="font-semibold text-amber-800"
                  >
                    {convertPhoneNumber(contact.number)}
                  </a>
                  {index < phoneContacts.length - 1 && (
                    <span className="text-gray-400">•</span>
                  )}
                </Fragment>
              ))}
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
              <WhatsAppIcon className="text-green-600 w-6 h-6 shrink-0" />
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href="https://wa.me/2349034234702?text=Hello%20Peace%20Bake%20Bakery%2C%20I%20would%20like%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-800"
                >
                  Sales Rep
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
                  href="https://wa.me/2348062870354?text=Hello%20Peace%20Bake%20Bakery%2C%20I%20would%20like%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-800"
                >
                  Abu Abdillah
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
            href={`tel:${CALL_TO_ACTION_PHONE_NUMBER}`}
            className="mt-8 inline-block bg-amber-700 text-white px-6 py-3 rounded-xl hover:bg-amber-800 transition"
          >
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
