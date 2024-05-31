import { InferSelectModel, sql } from "drizzle-orm";
import { int, mysqlTable, unique, varchar } from "drizzle-orm/mysql-core";
import { usersTable } from "./User";

export type Password = InferSelectModel<PasswordsTable>;

export type PasswordsTable = typeof passwordsTable;

export const passwordsTable = mysqlTable(
	"Passwords",
	{
		id: int("id", { unsigned: true }).primaryKey().autoincrement(),
		userId: int("userId", { unsigned: true })
			.references(() => usersTable.id, { onDelete: "cascade" })
			.notNull(),
		hash: varchar("hash", { length: 100 }).notNull(),
		creationTime: int("creationTime", { unsigned: true })
			.default(sql`UNIX_TIMESTAMP()`)
			.notNull()
	},
	(password) => ({
		unique: unique().on(password.userId, password.hash)
	})
);
