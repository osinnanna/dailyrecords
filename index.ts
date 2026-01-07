import { serve } from "bun";
import navbar from "./src/frontend/navbar.html";
import homepage from "./src/frontend/index.html";
import dashboard from "./src/frontend/dashboard.html";
import type { Entry } from "./src/model";
import { db, createTable } from "./src/db";

createTable(db);

const server = serve({
    port: 3000,
    routes: {
        "/": homepage,
        "/navbar": navbar,
        "/dashboard": dashboard,
    },
    async fetch(req) {
        const url = new URL(req.url);
        // Insert Entry
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
        // Fetch all entries
        if (url.pathname === "/api/entries" && req.method === "GET") {
            try {
                const fetchAllEntries = db
                    .query<Entry, []>(`SELECT * FROM entry`)
                    .all();
                return new Response(JSON.stringify(fetchAllEntries), {
                    status: 200,
                });
            } catch (error) {
                console.error("There was an error fetching the data", error);
            }
        }
        return new Response("Not Found", { status: 404 });
    },
    development: true,
});

console.log(`Server is running at ${server.url}`);
