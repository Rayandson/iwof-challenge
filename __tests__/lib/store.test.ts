import { describe, it, expect, beforeEach } from "vitest";
import {
    listUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    _resetForTest,
} from "@/lib/store";

beforeEach(() => {
    _resetForTest();
});

describe("listUsers", () => {
    it("returns empty array when no users exist", () => {
        expect(listUsers()).toEqual([]);
    });

    it("returns users sorted by createdAt descending", () => {
        createUser({ name: "Alice", email: "alice@example.com" });
        createUser({ name: "Bob", email: "bob@example.com" });
        const users = listUsers();
        expect(users).toHaveLength(2);
        expect(new Date(users[0].createdAt).getTime()).toBeGreaterThanOrEqual(
            new Date(users[1].createdAt).getTime(),
        );
    });
});

describe("getUserById", () => {
    it("returns undefined for non-existent id", () => {
        expect(getUserById("does-not-exist")).toBeUndefined();
    });

    it("returns the user with the given id", () => {
        const created = createUser({
            name: "Alice",
            email: "alice@example.com",
        });
        expect(getUserById(created.id)).toEqual(created);
    });
});

describe("getUserByEmail", () => {
    it("returns undefined when no user has that email", () => {
        expect(getUserByEmail("nobody@example.com")).toBeUndefined();
    });

    it("finds a user by email case-insensitively", () => {
        createUser({ name: "Alice", email: "alice@example.com" });
        expect(getUserByEmail("ALICE@EXAMPLE.COM")).toBeDefined();
    });
});

describe("createUser", () => {
    it("creates a user and assigns an id and createdAt", () => {
        const user = createUser({ name: "Alice", email: "alice@example.com" });
        expect(user.id).toBeTruthy();
        expect(user.name).toBe("Alice");
        expect(user.email).toBe("alice@example.com");
        expect(user.createdAt).toBeTruthy();
    });

    it("normalizes email to lowercase", () => {
        const user = createUser({ name: "Bob", email: "BOB@EXAMPLE.COM" });
        expect(user.email).toBe("bob@example.com");
    });

    it("persists the user so it can be retrieved", () => {
        const created = createUser({
            name: "Carol",
            email: "carol@example.com",
        });
        expect(getUserById(created.id)).toEqual(created);
    });
});

describe("updateUser", () => {
    it("returns undefined for a non-existent id", () => {
        expect(
            updateUser("bad-id", { name: "X", email: "x@x.com" }),
        ).toBeUndefined();
    });

    it("updates name and email", () => {
        const created = createUser({ name: "Dave", email: "dave@example.com" });
        const updated = updateUser(created.id, {
            name: "David",
            email: "david@example.com",
        });
        expect(updated?.name).toBe("David");
        expect(updated?.email).toBe("david@example.com");
    });

    it("preserves id and createdAt after update", () => {
        const created = createUser({ name: "Eve", email: "eve@example.com" });
        const updated = updateUser(created.id, {
            name: "Eva",
            email: "eva@example.com",
        });
        expect(updated?.id).toBe(created.id);
        expect(updated?.createdAt).toBe(created.createdAt);
    });
});

describe("deleteUser", () => {
    it("returns false for a non-existent id", () => {
        expect(deleteUser("bad-id")).toBe(false);
    });

    it("removes the user and returns true", () => {
        const created = createUser({
            name: "Frank",
            email: "frank@example.com",
        });
        expect(deleteUser(created.id)).toBe(true);
        expect(getUserById(created.id)).toBeUndefined();
        expect(listUsers()).toHaveLength(0);
    });
});
