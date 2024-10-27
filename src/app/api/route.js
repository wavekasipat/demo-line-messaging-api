export const runtime = "edge";

export async function GET() {
    console.log("GET /api Start");
    return new Response("Hello, world!");
}

export async function POST(req) {
    console.log("POST /api Start");
    const body = await req.json();
    console.log("POST /api body:", body);
    return new Response("Hello, world!");
}
