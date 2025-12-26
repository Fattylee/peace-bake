import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CALL_TO_ACTION_PHONE_NUMBER } from "./constants";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50 dark:bg-slate-900 transition-colors">
      <Header />
      <main className="flex-grow flex items-center justify-center text-gray-800 dark:text-gray-100">
        <div className="max-w-3xl mx-auto text-center px-6 py-16">
          <div className="text-8xl">🥖</div>
          <h1 className="mt-6 text-4xl font-bold text-amber-900 dark:text-amber-300">
            Page not found
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Sorry — we couldn't find that page. Our ovens are busy baking fresh
            loaves, but we'd love to help you find what you need.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-block bg-amber-700 text-white px-6 py-3 rounded-xl hover:bg-amber-800 transition"
            >
              Go home
            </Link>
            <a
              href={`tel:${CALL_TO_ACTION_PHONE_NUMBER}`}
              className="inline-block border border-amber-700 text-amber-700 dark:text-amber-200 px-6 py-3 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800 transition"
            >
              Call Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
