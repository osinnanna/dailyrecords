import { Database } from "bun:sqlite";
import { createEntriesTable, createUsersRolesPermsTable } from "./tables.db";

export const db = new Database("entries.db");

export function createTable() {
    console.log("Creating entires table");
    try {
        createEntriesTable();
        createUsersRolesPermsTable();
    } catch (error) {
        console.error(`There was an error`, error);
    }
}
