import Link from "next/link";
import { Plus } from "lucide-react";
import { listUsers } from "@/lib/store";
import UserList from "@/components/UserList";

export const dynamic = "force-dynamic";

export default function UsersPage() {
    const users = listUsers();

    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Usuários
                    </h1>
                    <p className="mt-1.5 text-sm text-gray-400">
                        Visualize e gerencie todos os seus usuários em um só
                        lugar.
                    </p>
                </div>
                <Link
                    href="/users/new"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                    <Plus size={15} />
                    Novo usuário
                </Link>
            </div>

            <UserList initialUsers={users} />
        </main>
    );
}
