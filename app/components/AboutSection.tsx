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
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md text-center transition-colors"
            >
              <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200">
                {item}
              </h3>
              {index === 0 ? (
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  We bake daily to ensure every customer enjoys fresh,
                  nourishing bread straight from the oven.
                </p>
              ) : index === 1 ? (
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  We source the finest local flours and natural ingredients — no
                  shortcuts. Expect bold, honest flavors and textures you can
                  taste in every bite.
                </p>
              ) : (
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Loved by neighbors and visitors alike — our warm loaves and
                  friendly service keep customers coming back season after
                  season.
                </p>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}
