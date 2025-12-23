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
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center">
          Our Bread Variants
        </h2>
        <p className="mt-4 text-center text-gray-700">
          Freshly baked daily to suit every family size and appetite.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {breads.map((bread, index) => (
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
  );
}
