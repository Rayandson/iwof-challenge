import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Gestão de Usuários",
    description: "Aplicação de cadastro de usuários",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pt-BR"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body
                className="min-h-screen flex flex-col"
                suppressHydrationWarning
            >
                <header className="border-b border-gray-200 bg-white px-4">
                    <div className="mx-auto flex max-w-5xl items-center py-4">
                        <Link
                            href="/users"
                            className="text-sm font-semibold tracking-tight text-gray-800 transition-colors"
                        >
                            Gestão de Usuários
                        </Link>
                    </div>
                </header>
                <div className="flex-1">{children}</div>

                <ToastProvider />
            </body>
        </html>
    );
}
