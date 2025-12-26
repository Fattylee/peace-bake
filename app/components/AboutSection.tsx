export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-amber-50 dark:bg-slate-700 transition-colors">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 dark:text-amber-300">
          Why Choose Peace Bake Bakery?
        </h2>
        <p className="mt-6 text-lg text-gray-700">
          Located in the heart of Ado-Odo Ota, we serve our community with
          freshly baked bread every day. From soft family loaves to
          golden-crusted delights, our bakery is committed to quality,
          affordability, and consistency.
        </p>
      </div>
      <div className="mt-12 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {["Always Fresh", "Quality Ingredients", "Loved by the Community"].map(
          (item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md text-center"
            >
              <h3 className="text-xl font-semibold text-amber-800">{item}</h3>
              <p className="mt-4 text-gray-600">
                We bake daily to ensure every customer enjoys fresh, nourishing
                bread straight from the oven.
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
