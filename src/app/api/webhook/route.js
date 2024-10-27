import { validateLineSignature } from "@/lib/validateLineSignature";

export const runtime = "edge";

export async function POST(req) {
    console.log("POST /api/webhook Start");
    const body = await req.json();
    console.log("body:", body);
    const bodyString = JSON.stringify(body, null, 0);
    console.log("bodyString:", bodyString);
    const signature = req.headers.get("x-line-signature");
    console.log("signature:", signature);
    const isValid = validateLineSignature(bodyString, signature);
    console.log("isValid:", isValid);
    return new Response({
        message: "Success",
    });
}
