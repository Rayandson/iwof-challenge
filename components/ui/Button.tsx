import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export default function Button({
    variant = "primary",
    className = "",
    ...props
}: Props) {
    const base =
        "cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900",
        secondary:
            "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 focus:ring-gray-300",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        />
    );
}
