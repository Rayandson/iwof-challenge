"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createUser, updateUser } from "@/lib/api";
import { userSchema } from "@/lib/schemas";
import { pushToast } from "@/lib/toast";
import type { User } from "@/lib/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

interface Props {
    initialData?: User;
}

export default function UserForm({ initialData }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const isEditing = !!initialData;

    const [name, setName] = useState(initialData?.name ?? "");
    const [email, setEmail] = useState(initialData?.email ?? "");
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        const result = userSchema.safeParse({
            name: name.trim(),
            email: email.trim(),
        });

        if (!result.success) {
            const fieldErrors: { name?: string; email?: string } = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as "name" | "email";
                if (!fieldErrors[field]) fieldErrors[field] = issue.message;
            }

            setErrors(fieldErrors);
            return;
        }

        setErrors({});

        startTransition(async () => {
            try {
                if (isEditing) {
                    await updateUser(initialData.id, {
                        name: name.trim(),
                        email: email.trim(),
                    });
                } else {
                    await createUser({
                        name: name.trim(),
                        email: email.trim(),
                    });
                }

                sessionStorage.setItem(
                    "toast",
                    isEditing
                        ? "Usuário atualizado com sucesso."
                        : "Usuário cadastrado com sucesso.",
                );

                router.push("/users");
            } catch (err) {
                pushToast(
                    err instanceof Error ? err.message : "Algo deu errado",
                    "error",
                );
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
                <Input
                    id="name"
                    label="Nome"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isPending}
                    placeholder="Nome completo"
                    error={errors.name}
                />

                <Input
                    id="email"
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                    placeholder="usuario@exemplo.com"
                    error={errors.email}
                />
            </div>

            <div className="mt-6 flex items-center gap-3">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isPending}
                    className="relative"
                >
                    <span className={isPending ? "invisible" : ""}>
                        {isEditing ? "Salvar alterações" : "Cadastrar usuário"}
                    </span>
                    {isPending && (
                        <span className="absolute inset-0 flex items-center justify-center">
                            <Spinner size={14} />
                        </span>
                    )}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    disabled={isPending}
                    onClick={() => router.push("/users")}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}
