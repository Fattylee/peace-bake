"use client";

import { Building2, Users, Briefcase } from "lucide-react";
import {
  CALL_TO_ACTION_PHONE_NUMBER,
  PHONE_DISPLAY,
  WHATSAPP_BASE_URL,
} from "../constants";

const offerings = [
  {
    title: "Corporate Contracts",
    icon: Building2,
    description: "Daily bread supply for offices, schools, and institutions",
    benefits: [
      "Bulk discounts (20-40% off)",
      "Guaranteed fresh daily delivery",
      "Flexible order scheduling",
      "Dedicated account manager",
      "Invoicing & payment terms",
    ],
  },
  {
    title: "Wholesale Distribution",
    icon: Briefcase,
    description: "Partner with local shops, supermarkets, and restaurants",
    benefits: [
      "Competitive wholesale pricing",
      "Regular delivery schedules",
      "Marketing support",
      "Flexible terms & quantities",
      "Quality guaranteed",
    ],
  },
  {
    title: "Event Catering",
    icon: Users,
    description: "Supply fresh bread for events, parties, and celebrations",
    benefits: [
      "Custom quantities",
      "Special flavors available",
      "Same-day delivery options",
      "Bulk discounts",
      "Professional service",
    ],
  },
];

export default function BulkOrdersSection() {
  return (
    <section className="py-20 px-6 bg-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Bulk & Business Orders
          </h2>
          <p className="text-gray-600 text-lg">
            Grow your business with Peace Bake Bakery
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {offerings.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                  <Icon className="text-amber-700 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-amber-900 mb-3">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-6">{offer.description}</p>
                <ul className="space-y-3 mb-8">
                  {offer.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <h3 className="text-3xl font-bold text-amber-900 mb-6">
            Ready to Partner with Us?
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your bulk order needs, wholesale
            partnership, or corporate contract.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${WHATSAPP_BASE_URL}?text=I%20am%20interested%20in%20a%20bulk%2Fcorporate%20order%20from%20Peace%20Bake%20Bakery`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              WhatsApp Now
            </a>
            <a
              href={`tel:${CALL_TO_ACTION_PHONE_NUMBER}`}
              className="border-2 border-amber-700 text-amber-700 hover:bg-amber-50 px-8 py-3 rounded-xl font-semibold transition"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
