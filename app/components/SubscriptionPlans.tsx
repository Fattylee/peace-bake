"use client";

import { Check } from "lucide-react";
import { WHATSAPP_BASE_URL } from "../constants";

const plans = [
  {
    name: "Starter",
    frequency: "Weekly",
    loaves: "2 loaves/week",
    price: "₦2,400",
    savings: "Save ₦400/week",
    benefits: [
      "2 loaves per week",
      "Your choice of bread type",
      "Free delivery",
      "Cancel anytime",
      "Flexible schedule",
    ],
  },
  {
    name: "Popular",
    frequency: "Weekly",
    loaves: "4 loaves/week",
    price: "₦4,400",
    savings: "Save ₦1,200/week",
    benefits: [
      "4 loaves per week",
      "Mix & match bread types",
      "Free delivery",
      "Priority scheduling",
      "Cancel anytime",
      "10% off bulk orders",
    ],
    featured: true,
  },
  {
    name: "Family",
    frequency: "Weekly",
    loaves: "6 loaves/week",
    price: "₦6,000",
    savings: "Save ₦2,400/week",
    benefits: [
      "6 loaves per week",
      "All bread varieties",
      "Free delivery",
      "Priority support",
      "Early access to new breads",
      "20% off bulk orders",
    ],
  },
];

export default function SubscriptionPlans() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-900 dark:text-amber-300 mb-4">
            Bread Subscriptions
          </h2>
          <p className="text-gray-600 text-lg dark:text-gray-300">
            Get fresh bread delivered weekly at discounted prices
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 transition ${
                plan.featured
                  ? "bg-amber-600 text-white shadow-2xl scale-105"
                  : "bg-gray-50 text-gray-900 shadow-lg hover:shadow-xl"
              }`}
            >
              <div className="mb-6">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.featured ? "text-white" : "text-amber-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.featured ? "text-amber-100" : "text-gray-600"
                  }`}
                >
                  {plan.frequency}
                </p>
              </div>

              <div className="mb-6">
                <div
                  className={`text-4xl font-bold mb-1 ${
                    plan.featured ? "text-white" : "text-amber-700"
                  }`}
                >
                  {plan.price}
                </div>
                <p
                  className={`text-sm ${
                    plan.featured ? "text-amber-100" : "text-green-600"
                  }`}
                >
                  {plan.savings}
                </p>
                <p
                  className={`text-sm mt-2 ${
                    plan.featured ? "text-amber-100" : "text-gray-600"
                  }`}
                >
                  {plan.loaves}
                </p>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`${WHATSAPP_BASE_URL}?text=I%20want%20to%20subscribe%20to%20the%20Peace%20Bake%20Bread%20Subscription%20Plan`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 rounded-xl font-bold transition ${
                  plan.featured
                    ? "bg-white text-amber-600 hover:bg-gray-100"
                    : "bg-amber-700 text-white hover:bg-amber-800"
                }`}
              >
                Subscribe Now
              </a>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-2xl p-8 text-center">
          <p className="text-gray-700">
            All subscriptions include free delivery within Ado-Odo Ota. Pause or
            cancel your subscription anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
