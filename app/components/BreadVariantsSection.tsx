export default function BreadVariantsSection() {
  const breads = [
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
  ];

  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 dark:text-amber-300 text-center">
          Our Bread Variants
        </h2>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Freshly baked daily to suit every family size and appetite.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {breads.map((bread, index) => (
            <div
              key={index}
              className="rounded-2xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-slate-700 p-8 shadow-md text-center transition-colors"
            >
              <h3 className="text-2xl font-semibold text-amber-800 dark:text-amber-300">
                {bread.name}
              </h3>
              <p className="mt-3 text-3xl font-bold text-amber-900 dark:text-amber-200">
                {bread.price}
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {bread.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
