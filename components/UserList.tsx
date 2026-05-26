"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/lib/api";
import { pushToast } from "@/lib/toast";
import type { User } from "@/lib/types";
import ConfirmationModal from "@/components/ConfirmationModal";

interface Props {
    initialUsers: User[];
}

export default function UserList({ initialUsers }: Props) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [confirmId, setConfirmId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    function handleDeleteRequest(id: string) {
        setConfirmId(id);
    }

    function handleDeleteCancel() {
        setConfirmId(null);
    }

    function handleDeleteConfirm(id: string) {
        startTransition(async () => {
            try {
                await deleteUser(id);
                setUsers((prev) => prev.filter((u) => u.id !== id));
                setConfirmId(null);

                pushToast("Usuário removido com sucesso.");
            } catch (err) {
                setConfirmId(null);

                pushToast(
                    err instanceof Error
                        ? err.message
                        : "Erro ao remover usuário",
                    "error",
                );
            }
        });
    }

    if (users.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-24 text-center">
                <p className="text-sm font-medium text-gray-400">
                    Nenhum usuário cadastrado
                </p>
                <Link
                    href="/users/new"
                    className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                >
                    Cadastrar o primeiro
                </Link>
            </div>
        );
    }

    const userToDelete = confirmId
        ? users.find((u) => u.id === confirmId)
        : null;

    return (
        <div>
            {userToDelete && (
                <ConfirmationModal
                    userName={userToDelete.name}
                    isPending={isPending}
                    onConfirm={() => handleDeleteConfirm(userToDelete.id)}
                    onCancel={handleDeleteCancel}
                />
            )}

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">
                                Nome
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">
                                E-mail
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">
                                Cadastrado em
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-widest text-gray-400">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="transition-colors hover:bg-gray-50/60"
                            >
                                <td className="px-6 py-5 font-medium text-gray-900">
                                    {user.name}
                                </td>
                                <td className="px-6 py-5 text-gray-500">
                                    {user.email}
                                </td>
                                <td className="px-6 py-5 text-gray-400">
                                    {new Date(
                                        user.createdAt,
                                    ).toLocaleDateString("pt-BR")}
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <span className="inline-flex items-center gap-2">
                                        <Link
                                            href={`/users/${user.id}/edit`}
                                            className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-900 hover:bg-gray-200"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDeleteRequest(user.id)
                                            }
                                            disabled={isPending}
                                            className="cursor-pointer rounded-full p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
