import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { describableCols, entityCols } from "~/common/models";
import { instructors } from "~/feats/instructors";

export const courses = mysqlTable("Courses", {
	...entityCols,
	...describableCols,
	instructorId: int("instructorId", { unsigned: true })
		.references(() => instructors.id, { onDelete: "cascade" })
		.notNull(),
	thumbnailUrl: varchar("thumbnailUrl", { length: 2000 }).notNull(),
	price: int("price", { unsigned: true }).notNull(),
	discount: int("discount", { unsigned: true })
});
