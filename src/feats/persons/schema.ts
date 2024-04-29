import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "~/feats/users";

export const persons = mysqlTable("Persons", {
	id: int("id", { unsigned: true })
		.primaryKey()
		.references(() => users.id, { onDelete: "cascade" }),
	avatarUrl: varchar("avatarUrl", { length: 2000 }),
	firstName: varchar("firstName", { length: 50 }).notNull(),
	middleName: varchar("middleName", { length: 50 }),
	lastName: varchar("lastName", { length: 50 }).notNull()
});
