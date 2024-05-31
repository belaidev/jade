import { InferSelectModel, sql } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { usersTable } from "./User";

export type Email = InferSelectModel<EmailTable>;

export type EmailTable = typeof emailsTable;

export const emailsTable = mysqlTable("Emails", {
	id: int("id", { unsigned: true }).primaryKey().autoincrement(),
	userId: int("userId", { unsigned: true })
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull(),
	address: varchar("address", { length: 254 }).notNull(),
	creationTime: int("creationTime", { unsigned: true })
		.default(sql`UNIX_TIMESTAMP()`)
		.notNull()
});
