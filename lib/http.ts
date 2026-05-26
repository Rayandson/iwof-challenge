export const ok = (data: unknown) => Response.json(data);

export const created = (data: unknown) => Response.json(data, { status: 201 });

export const noContent = () => new Response(null, { status: 204 });

export const badRequest = (error: string) =>
    Response.json({ error }, { status: 400 });

export const notFound = (error = "Not found") =>
    Response.json({ error }, { status: 404 });

export const conflict = (error: string) =>
    Response.json({ error }, { status: 409 });
