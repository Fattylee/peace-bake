export default function Footer() {
  return (
    <footer className="bg-amber-900 dark:bg-slate-900 text-amber-100 dark:text-gray-300 py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          © {new Date().getFullYear()} Peace Bake Bakery. All rights reserved.
        </p>
        <p className="text-sm">Baking peace into every loaf.</p>
      </div>
    </footer>
  );
}
