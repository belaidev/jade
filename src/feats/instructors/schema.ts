import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { persons } from "~/feats/persons";

export const instructors = mysqlTable("Instructors", {
	id: int("id", { unsigned: true })
		.primaryKey()
		.references(() => persons.id, { onDelete: "cascade" })
});
