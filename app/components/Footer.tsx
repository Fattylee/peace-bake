export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          © {new Date().getFullYear()} Peace Bake Bakery. All rights reserved.
        </p>
        <p className="text-sm">Baking peace into every loaf.</p>
      </div>
    </footer>
  );
}
