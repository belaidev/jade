import { varchar } from "drizzle-orm/mysql-core";

export const describableCols = {
	title: varchar("title", { length: 100 }).notNull(),
	description: varchar("description", { length: 2000 }).notNull()
};
