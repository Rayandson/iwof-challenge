import { listUsers, createUser, getUserByEmail } from "@/lib/store";
import { ok, created, badRequest, conflict } from "@/lib/http";
import { userSchema } from "@/lib/schemas";

export async function GET() {
    return ok(listUsers());
}

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const result = userSchema.safeParse(body);

    if (!result.success) {
        return badRequest(result.error.issues[0].message);
    }

    if (getUserByEmail(result.data.email)) {
        return conflict("A user with this email already exists");
    }

    return created(createUser(result.data));
}
