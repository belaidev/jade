import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "TASARUTTnMySQL_3695",
    database: "main"
});

const db = drizzle(conn);
await migrate(db, { migrationsFolder: "migrations" });
await conn.end();