import { serve } from "bun";
import homepage from "./src/frontend/index.html";
import type { Entry } from "./src/model";
import { db, createTable } from "./src/db";

createTable(db);

const server = serve({
    port: 3000,
    routes: {
        "/": homepage,
    },
    async fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/insertEntry" && req.method === "POST") {
            const data = await req.json();

            let { entryName, price } = data;
            const trimmedName = entryName.trim();
            const priceNum =
                typeof price === "string" ? parseFloat(price) : Number(price);
            let timestamp = new Date().toISOString();

            if (!trimmedName || isNaN(priceNum)) {
                return new Response("Invalid data", { status: 400 });
            }

            try {
                db.run(
                    `INSERT INTO entry (entryName, price, timestamp) VALUES (?, ?, ?)`,
                    [entryName, price, timestamp],
                );
                console.log(
                    `Entry Name: ${entryName}\nPrice: ${price}\nTimestamp: ${timestamp}`,
                );
                console.log("Fetching all db records");
                console.log(db.query<Entry, []>("SELECT * FROM entry").all());
                return new Response("Confirmed", { status: 200 });
            } catch (error) {
                console.error("Failed to insert record", error);
                return new Response("Database error", { status: 500 });
            }
        }
        return new Response("Not Found", { status: 404 });
    },
    development: true,
});

console.log(`Server is running at ${server.url}`);
