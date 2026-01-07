import { db } from "./db";

function main(args: string[]): void {
    if (args[0] === "clean") {
        try {
            const result = db.run("DELETE FROM entry");
            db.run("DELETE FROM sqlite_sequence WHERE name = 'entry';");
            console.log(`Deleted ${result.changes} rows`);
            console.log("Done");
        } catch (error) {
            console.error("Something went wrong", error);
        }
    }
}
if (import.meta.main) {
    main(Bun.argv.slice(2));
}
