import { InferSelectModel, sql } from "drizzle-orm";
import { int, mysqlEnum, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { usersTable } from "~/feats/users/schema";

export type Person = InferSelectModel<PersonsTable>;

export type PersonsTable = typeof personsTable;

export const personsTable = mysqlTable("Persons", {
	id: int("id", { unsigned: true })
		.primaryKey()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	avatarUrl: varchar("avatarUrl", { length: 2000 }),
	firstName: varchar("firstName", { length: 50 }).notNull(),
	lastName: varchar("lastName", { length: 50 }),
	pronoun: mysqlEnum("pronoun", ["il", "elle"]).notNull(),
	occupation: mysqlEnum("occupation", [
		"professionnel",
		"étudiant",
		"entrepreneur",
		"hobbyist"
	]).notNull(),
	creationTime: timestamp("creationTime")
		.default(sql`CURRENT_TIMESTAMP()`)
		.notNull(),
	updateTime: timestamp("updateTime")
		.default(sql`CURRENT_TIMESTAMP()`)
		.notNull()
		.$onUpdate(() => new Date())
});
