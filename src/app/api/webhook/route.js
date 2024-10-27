import { linePushTextMessage } from "@/lib/linePushTextMessage";
import { getPrisma } from "@/lib/prisma";
import { validateLineSignature } from "@/lib/validateLineSignature";

export const runtime = "edge";

export async function POST(req) {
    console.log("POST /api/webhook Start");

    // verify signature
    const bodyString = await req.clone().text();
    console.log("bodyString:", bodyString);
    const reqSignature = req.headers.get("x-line-signature");
    console.log("reqSignature:", reqSignature);
    const isValidSignature = validateLineSignature(bodyString, reqSignature);
    console.log("isValidSignature:", isValidSignature);

    // if (!isValidSignature) {
    //     return Response.json({ message: "Invalid signature" }, { status: 400 });
    // }

    // get body as object
    const body = await req.json();
    console.log("body:", body);

    // register notify
    if (
        body?.events?.[0]?.type === "message" &&
        body?.events?.[0]?.message?.type === "text" &&
        body?.events?.[0]?.message?.text?.startsWith("#")
    ) {
        const register_code = body?.events?.[0]?.message?.text;
        console.log("register_code:", register_code);

        // get line room id
        let line_id = "";
        if (body?.events?.[0]?.source?.type === "user") {
            line_id = body?.events?.[0]?.source?.userId;
        } else if (body?.events?.[0]?.source?.type === "group") {
            line_id = body?.events?.[0]?.source?.groupId;
        }

        // query db by register code
        const prisma = getPrisma();
        const notify_room = await prisma.notify_room.findFirst({
            where: {
                register_code: register_code,
                line_id: null,
            },
        });
        console.log("notify_room:", notify_room);

        // if found then update line id and reply success register
        if (notify_room && line_id) {
            await prisma.notify_room.update({
                where: {
                    id: notify_room.id,
                },
                data: {
                    line_id: line_id,
                },
            });
            console.log("notify_room updated");

            await linePushTextMessage({
                to: line_id,
                massage: "ลงทะเบียนสำเร็จ",
            });
        }
    }

    return Response.json({ message: "Success" });
}
