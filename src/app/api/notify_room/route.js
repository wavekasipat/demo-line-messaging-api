import { getPrisma } from "@/lib/prisma";

export const runtime = "edge";

export async function POST(req) {
    console.log("POST /api/notify_room Start");
    const body = await req.json();
    console.log("body:", body);

    // random register_code 5 chars from A-B and 0-9
    const register_code =
        "#" + Math.random().toString(36).substring(2, 7).toUpperCase();

    // insert to notify_room
    const prisma = getPrisma();
    const notify_room = await prisma.notify_room.create({
        data: {
            register_code: register_code,
        },
    });
    console.log("notify_room created");

    return Response.json(notify_room);
}
