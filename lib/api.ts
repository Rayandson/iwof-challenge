import type { User } from "./types";
import type { UserInput } from "./schemas";

async function handleResponse<T>(res: Response): Promise<T> {
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error ?? "Unexpected error");
    }

    return data as T;
}

export async function fetchUsers(): Promise<User[]> {
    const res = await fetch("/api/users");

    return handleResponse<User[]>(res);
}

export async function createUser(input: UserInput): Promise<User> {
    const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    return handleResponse<User>(res);
}

export async function updateUser(id: string, input: UserInput): Promise<User> {
    const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    return handleResponse<User>(res);
}

export async function deleteUser(id: string): Promise<void> {
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Unexpected error");
    }
}
