export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-amber-200 to-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-amber-900 leading-tight">
            Freshly Baked Happiness
          </h1>
          <p className="mt-6 text-lg text-amber-800">
            Welcome to{" "}
            <span className="font-semibold">Peace Bake Bakery</span>, where
            every loaf is baked with love, quality ingredients, and peace of
            mind.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:+2348062870354"
              className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-xl shadow-lg transition"
            >
              Call to Order
            </a>
            <a
              href="https://wa.me/2348062870354?text=Hello%20Peace%20Bake%20Bakery%2C%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
            >
              Order on WhatsApp
            </a>
            <a
              href="#location"
              className="border border-amber-700 text-amber-800 px-6 py-3 rounded-xl hover:bg-amber-100 transition"
            >
              Visit Us
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-48 md:h-60 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/landing-page/Family and Family-Mini.jpg"
              alt="Family and Family Mini Bread"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative h-48 md:h-60 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/landing-page/Jumbo and Family-mini size bread_.jpg"
              alt="Jumbo Bread"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative col-span-2 h-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/landing-page/Family-mini.jpeg"
              alt="Peace Bake Bread Display"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
