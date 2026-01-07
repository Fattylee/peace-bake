"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { DEMO_CREDENTIALS } from "../../lib/LoginForm.constants";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading?: boolean;
}

export default function LoginForm({
  onSubmit,
  isLoading = false,
}: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Username Input */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Username
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        autoFocus
        disabled={isLoading}
        className="w-full border-2 border-amber-300 dark:border-amber-600 rounded-lg px-4 py-3 mb-4 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:border-amber-600"
      />

      {/* Password Input */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Password
      </label>
      <div className="relative mb-6">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          disabled={isLoading}
          className="w-full border-2 border-amber-300 dark:border-amber-600 rounded-lg px-4 py-3 pr-12 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:border-amber-600"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={isLoading}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold py-3 rounded-lg transition mb-4"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {/* Demo Credentials */}
      <div className="mt-6 pt-4 border-t border-gray-300 dark:border-slate-600">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-semibold">
          Demo Credentials:
        </p>
        <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
          {DEMO_CREDENTIALS.map((cred) => (
            <p key={cred.username}>
              {cred.role}: {cred.username} / {cred.password}
            </p>
          ))}
        </div>
      </div>
    </form>
  );
}
