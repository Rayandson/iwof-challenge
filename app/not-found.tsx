import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold text-gray-900">404</h1>
            <p className="mt-2 text-gray-500">Página não encontrada.</p>
            <Link
                href="/users"
                className="mt-6 text-sm font-semibold hover:underline"
            >
                Ir para a lista de usuários
            </Link>
        </main>
    );
}
