import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

const getEnv = (envVarName: string) => {
	const envVar = process.env[envVarName];
	if (!envVar) throw new Error(`'${envVarName}' environment variable missing`);
	return envVar;
};

const conn = await mysql.createConnection({
	host: getEnv("DB_HOST"),
	user: getEnv("DB_USER"),
	password: getEnv("DB_PASS"),
	database: getEnv("DB_DB")
});

export const db = drizzle(conn);
await migrate(db, { migrationsFolder: "migrations" });
