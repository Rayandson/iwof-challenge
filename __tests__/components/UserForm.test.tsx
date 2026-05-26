import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "@/components/UserForm";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: mockPush, refresh: vi.fn() }),
}));

vi.mock("@/lib/api", () => ({
    createUser: vi.fn(),
    updateUser: vi.fn(),
}));

import * as api from "@/lib/api";

beforeEach(() => {
    vi.clearAllMocks();
});

describe("UserForm - create mode", () => {
    it("renders name and email inputs with a submit button", () => {
        render(<UserForm />);
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /cadastrar usuário/i }),
        ).toBeInTheDocument();
    });

    it("shows validation errors when submitting empty fields", async () => {
        render(<UserForm />);
        await userEvent.click(
            screen.getByRole("button", { name: /cadastrar usuário/i }),
        );
        expect(
            await screen.findByText(/pelo menos 2 caracteres/i),
        ).toBeInTheDocument();
        expect(
            await screen.findByText(/e-mail é obrigatório/i),
        ).toBeInTheDocument();
    });

    it("shows validation error for invalid email", async () => {
        render(<UserForm />);
        await userEvent.type(screen.getByLabelText(/nome/i), "Alice");
        await userEvent.type(screen.getByLabelText(/e-mail/i), "not-an-email");
        await userEvent.click(
            screen.getByRole("button", { name: /cadastrar usuário/i }),
        );
        expect(await screen.findByText(/e-mail válido/i)).toBeInTheDocument();
    });

    it("calls createUser and navigates on successful submit", async () => {
        vi.mocked(api.createUser).mockResolvedValue({
            id: "1",
            name: "Alice",
            email: "alice@example.com",
            createdAt: new Date().toISOString(),
        });

        render(<UserForm />);
        await userEvent.type(screen.getByLabelText(/nome/i), "Alice");
        await userEvent.type(
            screen.getByLabelText(/e-mail/i),
            "alice@example.com",
        );
        await userEvent.click(
            screen.getByRole("button", { name: /cadastrar usuário/i }),
        );

        await waitFor(() => {
            expect(api.createUser).toHaveBeenCalledWith({
                name: "Alice",
                email: "alice@example.com",
            });
        });
        await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/users"));
    });

    it("shows API error message when createUser rejects", async () => {
        vi.mocked(api.createUser).mockRejectedValue(
            new Error("A user with this email already exists"),
        );

        render(<UserForm />);
        await userEvent.type(screen.getByLabelText(/nome/i), "Alice");
        await userEvent.type(
            screen.getByLabelText(/e-mail/i),
            "alice@example.com",
        );
        await userEvent.click(
            screen.getByRole("button", { name: /cadastrar usuário/i }),
        );

        expect(
            await screen.findByText(/a user with this email already exists/i),
        ).toBeInTheDocument();
    });
});

describe("UserForm - edit mode", () => {
    const initialData = {
        id: "42",
        name: "John",
        email: "john@example.com",
        createdAt: "2026-01-01T00:00:00.000Z",
    };

    it("pre-fills inputs with the user's current data", () => {
        render(<UserForm initialData={initialData} />);
        expect(screen.getByLabelText<HTMLInputElement>(/nome/i).value).toBe(
            "John",
        );
        expect(screen.getByLabelText<HTMLInputElement>(/e-mail/i).value).toBe(
            "john@example.com",
        );
    });

    it("shows 'Salvar alterações' button in edit mode", () => {
        render(<UserForm initialData={initialData} />);
        expect(
            screen.getByRole("button", { name: /salvar alterações/i }),
        ).toBeInTheDocument();
    });

    it("calls updateUser with the correct id on submit", async () => {
        vi.mocked(api.updateUser).mockResolvedValue({
            ...initialData,
            name: "John Doe",
        });

        render(<UserForm initialData={initialData} />);
        await userEvent.clear(screen.getByLabelText(/nome/i));
        await userEvent.type(screen.getByLabelText(/nome/i), "John Doe");
        await userEvent.click(
            screen.getByRole("button", { name: /salvar alterações/i }),
        );

        await waitFor(() => {
            expect(api.updateUser).toHaveBeenCalledWith("42", {
                name: "John Doe",
                email: "john@example.com",
            });
        });
    });
});
