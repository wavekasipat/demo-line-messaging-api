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

    if (!isValidSignature) {
        return Response.json({ message: "Invalid signature" }, { status: 400 });
    }

    // get body as object
    const body = await req.json();
    console.log("body:", body);

    // do business logic

    return Response.json({ message: "Success" });
}
