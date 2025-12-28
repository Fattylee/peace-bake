export const CHATBOT_FAQS = [
  {
    id: "greeting",
    question: "Hi",
    keywords: ["hello", "hi", "hey", "greetings"],
    answer:
      "Hello! 👋 Welcome to Peace Bake Bakery. I'm here to help! What would you like to know?",
    suggestions: [
      "About us",
      "Products",
      "Opening hours",
      "Contact",
      "Delivery",
    ],
  },
  {
    id: "about",
    question: "About us",
    keywords: ["about", "who are you", "company", "bakery", "business"],
    answer:
      "We're Peace Bake Bakery, located in Ado-Odo Ota, Nigeria. We bake fresh loaves daily with quality ingredients and are committed to serving our community with delicious, affordable bread. We're proud to be Halal-certified! 🥖",
    suggestions: ["Products", "Opening hours", "Contact"],
  },
  {
    id: "products",
    question: "Products",
    keywords: [
      "products",
      "bread",
      "what do you sell",
      "menu",
      "items",
      "types",
      "varieties",
    ],
    answer:
      "We offer:\n• Family & Family-Mini loaves\n• Jumbo bread\n• Specialty breads\n• Subscription plans for regular customers\n• Bulk orders for events\n\nAll baked fresh daily with the finest local ingredients.",
    suggestions: ["Subscription", "Bulk orders", "Contact"],
  },
  {
    id: "hours",
    question: "Opening hours",
    keywords: ["hours", "opening", "time", "when", "open", "closed", "timing"],
    answer:
      "Our opening hours are:\n• Monday–Saturday: 7:00 AM – 8:00 PM\n• Sunday: 8:00 AM – 8:00 PM\n\nVisit us or call to place an order!",
    suggestions: ["Contact", "Delivery"],
  },
  {
    id: "contact",
    question: "Contact",
    keywords: [
      "contact",
      "phone",
      "email",
      "call",
      "reach",
      "address",
      "location",
    ],
    answer:
      "You can reach us via:\n• Phone: +234 703 957 2446\n• Email: fattylee.remod@gmail.com\n• WhatsApp: Available for quick orders\n• Address: 7, Peace Bake Str, Olugbode, Ado-Odo Ota, Ogun State, Nigeria",
    suggestions: ["Opening hours", "Delivery"],
  },
  {
    id: "delivery",
    question: "Delivery",
    keywords: [
      "delivery",
      "shipping",
      "send",
      "home delivery",
      "can you deliver",
    ],
    answer:
      "We offer delivery for bulk orders and subscriptions! Contact us to discuss your delivery needs. Our team is happy to work with you.",
    suggestions: ["Contact", "Bulk orders", "Subscription"],
  },
  {
    id: "subscription",
    question: "Subscription",
    keywords: [
      "subscription",
      "subscribe",
      "regular",
      "plan",
      "weekly",
      "monthly",
    ],
    answer:
      "Subscribe for regular fresh bread deliveries! We offer flexible subscription plans with discounts. Perfect for families and businesses. Call or email us to set up your subscription.",
    suggestions: ["Contact", "Delivery"],
  },
  {
    id: "bulk",
    question: "Bulk orders",
    keywords: [
      "bulk",
      "order",
      "event",
      "wholesale",
      "corporate",
      "party",
      "wedding",
    ],
    answer:
      "Planning an event? We can provide bulk orders! Contact us with your order details and date. We'll ensure fresh, delicious bread for your occasion.",
    suggestions: ["Contact", "About us"],
  },
];

export type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestions?: string[];
};
