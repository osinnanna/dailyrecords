import { db } from "./db";

export function createEntriesTable() {
    db.run(
        "CREATE TABLE IF NOT EXISTS entry (id INTEGER PRIMARY KEY AUTOINCREMENT, entryName TEXT, price REAL, timestamp TEXT)",
    );
}

// Users and Permissions
function createUsersTable() {
    console.log("Creating the Users table and required permissions");
    try {
        db.run(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, user_name TEXT NOT NULL UNIQUE)",
        );
    } catch (error) {
        console.error("Error creating users table", error);
    }
    console.log("Done");
}

function createRolesTable() {
    console.log("Creating roles table ");
    try {
        db.run(
            "CREATE TABLE IF NOT EXISTS roles (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL)",
        );
    } catch (error) {
        console.error("There creating roles table", error);
    }
    console.log("Done");
}
function createUserRolesTable() {
    console.log("Creating user_roles table");
    try {
        db.run(
            `CREATE TABLE IF NOT EXISTS user_roles (
            user_id INTEGER NOT NULL,
            role_id INTEGER NOT NULL,
            PRIMARY KEY(user_id, role_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
            )`,
        );
    } catch (error) {
        console.error(
            "There was an error creating the user_roles table",
            error,
        );
    }
}

export function createUsersRolesPermsTable() {
    createUsersTable();
    createRolesTable();
    createUserRolesTable();
}
