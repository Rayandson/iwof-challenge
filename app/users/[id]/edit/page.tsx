import { notFound } from "next/navigation";
import { getUserById } from "@/lib/store";
import UserForm from "@/components/UserForm";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: Props) {
    const { id } = await params;
    const user = getUserById(id);

    if (!user) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <div className="mb-6">
                <h1 className="mt-5 text-2xl font-bold text-gray-900">
                    Editar usuário
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                    Atualize os dados de{" "}
                    <span className="font-medium text-gray-600">
                        {user.name}
                    </span>
                    .
                </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <UserForm initialData={user} />
            </div>
        </main>
    );
}
