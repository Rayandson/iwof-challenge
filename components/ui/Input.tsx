import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function Input({ label, error, id, ...props }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gray-900 disabled:opacity-60 ${error ? "border-red-300 focus-visible:ring-red-400" : "border-gray-200 hover:border-gray-300"}`}
                data-gramm="false"
                {...props}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
