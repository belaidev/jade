import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { describableCols } from "~/common/models/Describable";
import { entityCols } from "~/common/models/Entity";
import { instructors } from "../instructors/schema";

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
