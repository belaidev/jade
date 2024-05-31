import { InferSelectModel, sql } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";

export type User = InferSelectModel<UsersTable>;

export type UsersTable = typeof usersTable;

export const usersTable = mysqlTable("Users", {
	id: int("id", { unsigned: true }).primaryKey().autoincrement(),
	creationTime: int("creationTime", { unsigned: true })
		.default(sql`UNIX_TIMESTAMP()`)
		.notNull(),
	updateTime: int("updateTime", { unsigned: true })
		.default(sql`UNIX_TIMESTAMP()`)
		.notNull()
		.$onUpdate(() => Date.now())
});
