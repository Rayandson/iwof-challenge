"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, CircleCheck, CircleAlert } from "lucide-react";

interface Props {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

const config = {
    success: {
        icon: CircleCheck,
        className: "border-green-100 bg-green-50 text-green-700",
        iconClass: "text-green-500",
    },
    error: {
        icon: CircleAlert,
        className: "border-red-100 bg-red-50 text-red-700",
        iconClass: "text-red-500",
    },
};

export default function Toast({ message, type, onClose }: Props) {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const { icon: Icon, className, iconClass } = config[type];

    return createPortal(
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2">
            <div
                className={`flex min-w-72 items-center gap-3 rounded-2xl border px-5 py-4 text-sm font-medium shadow-xl ${className}`}
            >
                <Icon size={20} className={`shrink-0 ${iconClass}`} />
                <span className="flex-1">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-1 cursor-pointer opacity-50 hover:opacity-100"
                >
                    <X size={16} />
                </button>
            </div>
        </div>,
        document.body,
    );
}
