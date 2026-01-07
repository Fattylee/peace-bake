"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import LoginForm from "./LoginForm";

interface LoginScreenProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading?: boolean;
}

export default function LoginScreen({
  onSubmit,
  isLoading = false,
}: LoginScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <Header hideNavigation={true} />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-400 mb-2 text-center">
            Sales Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Peace Bake Bakery
          </p>

          <LoginForm onSubmit={onSubmit} isLoading={isLoading} />

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            Restricted access • Username & password required
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
