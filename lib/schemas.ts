import { z } from "zod";

export const userSchema = z.object({
    name: z
        .string()
        .min(2, "O nome deve ter pelo menos 2 caracteres")
        .max(100, "O nome deve ter no máximo 100 caracteres"),
    email: z
        .string()
        .min(1, "O e-mail é obrigatório")
        .check(z.email({ error: "Insira um e-mail válido" })),
});

export type UserInput = z.infer<typeof userSchema>;
