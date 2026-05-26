import UserForm from "@/components/UserForm";

export default function NewUserPage() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-10">
            <div className="mb-6">
                <h1 className="mt-5 text-2xl font-bold text-gray-900">
                    Novo usuário
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                    Preencha os dados para cadastrar um novo usuário.
                </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <UserForm />
            </div>
        </main>
    );
}
