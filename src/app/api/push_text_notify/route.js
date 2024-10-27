import { linePushTextMessage } from "@/lib/linePushTextMessage";
import { getPrisma } from "@/lib/prisma";

export const runtime = "edge";

export async function POST(req) {
    console.log("POST /api/push_text_notify Start");
    const body = await req.json();
    console.log("body:", body);
    const id = body.id;
    const message = body.message;

    // find notify_room by id
    const prisma = getPrisma();
    const notify_room = await prisma.notify_room.findFirst({
        where: {
            id: id,
        },
    });
    console.log("notify_room:", notify_room);

    // if not found return 404 error
    if (!notify_room) {
        return Response.json(
            { error: "Notify room not found" },
            { status: 404 }
        );
    } else if (!notify_room.line_id) {
        return Response.json(
            { error: "Line not register yet" },
            { status: 404 }
        );
    }

    // push message to line
    const messageResponse = await linePushTextMessage({
        to: notify_room.line_id,
        massage: message,
    });

    return Response.json(messageResponse);
}
