"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Toast from "@/components/ui/Toast";

interface ToastItem {
    message: string;
    type: "success" | "error";
}

export default function ToastProvider() {
    const [toast, setToast] = useState<ToastItem | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const pending = sessionStorage.getItem("toast");

        if (pending) {
            sessionStorage.removeItem("toast");
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setToast({ message: pending, type: "success" });
        }
    }, [pathname]);

    useEffect(() => {
        function handleEvent(e: Event) {
            const { message, type } = (e as CustomEvent<ToastItem>).detail;
            setToast({ message, type });
        }

        window.addEventListener("app:toast", handleEvent);
        return () => window.removeEventListener("app:toast", handleEvent);
    }, []);

    if (!toast) return null;

    return (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
        />
    );
}
