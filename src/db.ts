import { Database } from "bun:sqlite";

export const db = new Database("entries.db");
export function createTable(db: Database) {
    try {
        db.run(
            "CREATE TABLE IF NOT EXISTS entry (id INTEGER PRIMARY KEY AUTOINCREMENT, entryName TEXT, price REAL, timestamp TEXT)",
        );
    } catch (error) {
        console.error(`There was an error`, error);
    }
}
