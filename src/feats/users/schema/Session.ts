import { sql } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { usersTable } from "./User";

export type Session = typeof sessionsTable.$inferSelect;

export type SessionsTable = typeof sessionsTable;

export const sessionsTable = mysqlTable("Sessions", {
	id: int("id", { unsigned: true }).primaryKey().autoincrement(),
	userId: int("userId", { unsigned: true })
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull(),
	creationTime: int("creationTime", { unsigned: true })
		.default(sql`UNIX_TIMESTAMP()`)
		.notNull()
});
