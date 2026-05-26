"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ title, onClose, children }: Props) {
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-base font-semibold text-gray-900">
                    {title}
                </h2>
                {children}
            </div>
        </div>,
        document.body,
    );
}
