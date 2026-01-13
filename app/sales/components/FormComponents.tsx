import { ReactNode } from "react";

// ============================================================================
// Shared Form Components
// ============================================================================

interface FormFieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
}

export function FormField({ label, children, required }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
  required?: boolean;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: SelectFieldProps) {
  return (
    <FormField label={label} required={required}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function NumberInput({
  label,
  value,
  onChange,
  min = 1,
}: NumberInputProps) {
  return (
    <FormField label={label}>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-10 border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
      />
    </FormField>
  );
}

interface ReadOnlyFieldProps {
  label: string;
  value: string;
  variant?: "default" | "success";
}

export function ReadOnlyField({
  label,
  value,
  variant = "default",
}: ReadOnlyFieldProps) {
  const bgClass =
    variant === "success"
      ? "bg-green-50 dark:bg-slate-900 dark:text-green-400 font-semibold"
      : "bg-gray-100 dark:bg-slate-900 dark:text-gray-300";

  return (
    <FormField label={label}>
      <input
        type="text"
        value={value}
        disabled
        className={`w-full h-10 border dark:border-slate-600 rounded-lg px-3 py-2 ${bgClass}`}
      />
    </FormField>
  );
}

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: TextInputProps) {
  return (
    <FormField label={label}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 border dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700 dark:text-gray-100"
      />
    </FormField>
  );
}

interface SubmitButtonProps {
  loading: boolean;
  label?: string;
  loadingLabel?: string;
}

export function SubmitButton({
  loading,
  label = "Submit",
  loadingLabel = "Saving...",
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold py-3 rounded-lg transition"
    >
      {loading ? loadingLabel : label}
    </button>
  );
}

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div
      className={`mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg transition-opacity ${
        message ? "opacity-100" : "opacity-0 h-0 p-0 mb-0"
      }`}
    >
      {message}
    </div>
  );
}
