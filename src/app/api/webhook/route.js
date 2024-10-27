import { validateLineSignature } from "@/lib/validateLineSignature";

export const runtime = "edge";

export async function POST(req) {
    console.log("POST /api/webhook Start");
    const bodyString = await req.clone().text();
    console.log("bodyString:", bodyString);
    const body = await req.json();
    console.log("body:", body);
    const reqSignature = req.headers.get("x-line-signature");
    console.log("reqSignature:", reqSignature);
    const isValid = validateLineSignature(bodyString, reqSignature);
    console.log("isValid:", isValid);
    return Response.json({ message: "Success" });
}
