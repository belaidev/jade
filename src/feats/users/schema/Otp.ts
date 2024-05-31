import { InferSelectModel, sql } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export type Otp = InferSelectModel<OtpsTable>;

export type OtpsTable = typeof otpsTable;

export const otpsTable = mysqlTable("Otps", {
	id: int("id", { unsigned: true }).primaryKey().autoincrement(),
	email: varchar("email", { length: 254 }).notNull(),
	code: varchar("code", { length: 6 }).notNull(),
	creationTime: int("creationTime", { unsigned: true })
		.default(sql`UNIX_TIMESTAMP()`)
		.notNull()
});
