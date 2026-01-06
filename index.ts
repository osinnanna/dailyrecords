import { serve } from "bun";
import homepage from "./src/frontend/index.html";

const server = serve({
    port: 3000,
    routes: {
        "/": homepage,
    },
    development: true,
});

console.log(`Server is running at ${server.url}`);
