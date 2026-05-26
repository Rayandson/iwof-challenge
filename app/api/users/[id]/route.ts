import type { NextRequest } from "next/server";
import { getUserById, getUserByEmail, updateUser, deleteUser } from "@/lib/store";
import { ok, noContent, badRequest, notFound, conflict } from "@/lib/http";
import { userSchema } from "@/lib/schemas";

export async function PUT(
    request: NextRequest,
    ctx: RouteContext<"/api/users/[id]">,
) {
    const { id } = await ctx.params;

    if (!getUserById(id)) return notFound("User not found");

    const body = await request.json().catch(() => null);
    const result = userSchema.safeParse(body);

    if (!result.success) return badRequest(result.error.issues[0].message);

    const existing = getUserByEmail(result.data.email);
    
    if (existing && existing.id !== id) return conflict("A user with this email already exists");

    return ok(updateUser(id, result.data));
}

export async function DELETE(
    _request: NextRequest,
    ctx: RouteContext<"/api/users/[id]">,
) {
    const { id } = await ctx.params;

    if (!deleteUser(id)) return notFound("User not found");

    return noContent();
}
