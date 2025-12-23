export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">🍞</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-amber-900">Peace Bake</h1>
            <p className="text-xs text-amber-700">Freshly Baked Daily</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-8">
          <a
            href="#"
            className="text-amber-800 hover:text-amber-900 font-medium"
          >
            Home
          </a>
          <a
            href="#location"
            className="text-amber-800 hover:text-amber-900 font-medium"
          >
            Location
          </a>
          <a
            href="tel:+2348062870354"
            className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 font-medium"
          >
            Call Now
          </a>
        </nav>
      </div>
    </header>
  );
}
