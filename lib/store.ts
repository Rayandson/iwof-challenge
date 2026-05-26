import type { User } from "./types";
import type { UserInput } from "./schemas";

type GlobalStore = typeof globalThis & { userStore?: Map<string, User> };

const seed: [string, User][] = [
    [
        "1",
        {
            id: "1",
            name: "Ana Silva",
            email: "ana.silva@example.com",
            createdAt: "2026-01-10T09:00:00.000Z",
        },
    ],
    [
        "2",
        {
            id: "2",
            name: "Bruno Silva",
            email: "bruno.silva@example.com",
            createdAt: "2026-02-14T14:30:00.000Z",
        },
    ],
    [
        "3",
        {
            id: "3",
            name: "João Doe",
            email: "joao.doe@example.com",
            createdAt: "2026-03-20T11:15:00.000Z",
        },
    ],
];

const g = globalThis as GlobalStore;

if (!g.userStore) g.userStore = new Map(seed);

const users = g.userStore;

export function listUsers(): User[] {
    return Array.from(users.values()).sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function getUserById(id: string): User | undefined {
    return users.get(id);
}

export function getUserByEmail(email: string): User | undefined {
    return Array.from(users.values()).find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
}

export function createUser(input: UserInput): User {
    const id = crypto.randomUUID();

    const user: User = {
        id,
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        createdAt: new Date().toISOString(),
    };

    users.set(id, user);

    return user;
}

export function updateUser(id: string, input: UserInput): User | undefined {
    const existing = users.get(id);

    if (!existing) return undefined;

    const updated: User = {
        ...existing,
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
    };

    users.set(id, updated);

    return updated;
}

export function deleteUser(id: string): boolean {
    return users.delete(id);
}

export function resetStore() {
    users.clear();
}
