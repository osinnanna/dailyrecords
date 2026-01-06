import { serve } from "bun";
import homepage from "./src/frontend/index.html";

const server = serve({
    port: 3000,
    routes: {
        "/": homepage,
    },
    async fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === "/insertEntry" && req.method === "POST") {
            const data = await req.json();
            console.log(data);
            return new Response(`Successful ${JSON.stringify(data)}`, {
                status: 200,
            });
        }
        return new Response("Not Found", { status: 404 });
    },
    development: true,
});

console.log(`Server is running at ${server.url}`);
