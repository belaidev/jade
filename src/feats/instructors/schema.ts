import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { personsTable as persons } from "~/feats/persons/schema";

export const instructors = mysqlTable("Instructors", {
	id: int("id", { unsigned: true })
		.primaryKey()
		.references(() => persons.id, { onDelete: "cascade" })
});
