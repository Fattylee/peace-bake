"use client";

import { useEffect } from "react";

export default function BreadVariantsSection() {
  const breads = [
    {
      name: "Jumbo",
      price: "1500",
      priceCurrency: "NGN",
      desc: "Perfect for large families and events",
      image: "/landing-page/Jumbo and Family-mini size bread_.jpg",
    },
    {
      name: "Family",
      price: "1000",
      priceCurrency: "NGN",
      desc: "Ideal for everyday family meals",
      image: "/landing-page/Family and Family-Mini.jpg",
    },
    {
      name: "Family Mini",
      price: "800",
      priceCurrency: "NGN",
      desc: "Smaller size, same great taste",
      image: "/landing-page/Family-mini.jpeg",
    },
    {
      name: "Solo",
      price: "400",
      priceCurrency: "NGN",
      desc: "Great for individuals and quick bites",
      image: "/landing-page/Family and Family-Mini.jpg",
    },
  ];

  useEffect(() => {
    // Add product schema for each bread variant
    const products = breads.map((bread) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Peace Bake ${bread.name} Bread`,
      description: bread.desc,
      image: bread.image,
      brand: {
        "@type": "Brand",
        name: "Peace Bake Bakery",
      },
      offers: {
        "@type": "Offer",
        url: "https://peacebakebakery.com/#bread-variants",
        priceCurrency: bread.priceCurrency,
        price: bread.price,
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Peace Bake Bakery",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "25",
      },
    }));

    products.forEach((product) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(product);
      document.head.appendChild(script);
    });

    return () => {
      document
        .querySelectorAll('script[type="application/ld+json"]')
        .forEach((el) => {
          if (el.innerHTML.includes("Peace Bake Bakery")) {
            el.remove();
          }
        });
    };
  }, []);

  return (
    <section
      id="bread-variants"
      className="py-20 px-6 bg-white dark:bg-slate-800 transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 dark:text-amber-300 text-center">
          Our Bread Variants
        </h2>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Freshly baked daily to suit every family size and appetite.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {breads.map((bread, index) => (
            <article
              key={index}
              className="rounded-2xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-slate-700 p-8 shadow-md text-center transition-colors"
              itemScope
              itemType="https://schema.org/Product"
            >
              <h3
                className="text-2xl font-semibold text-amber-800 dark:text-amber-300"
                itemProp="name"
              >
                {bread.name} Bread
              </h3>
              <p
                className="mt-3 text-3xl font-bold text-amber-900 dark:text-amber-200"
                itemProp="price"
              >
                ₦{bread.price}
              </p>
              <meta itemProp="priceCurrency" content={bread.priceCurrency} />
              <meta itemProp="image" content={bread.image} />
              <p
                className="mt-4 text-gray-600 dark:text-gray-300"
                itemProp="description"
              >
                {bread.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
