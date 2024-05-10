import { int, mysqlTable, tinyint, unique, varchar } from "drizzle-orm/mysql-core";
import { entityCols } from "~/common/models/Entity";
import { courses } from "../courses/schema";
import { students } from "../students/schema";

export const reviews = mysqlTable(
	"Reviews",
	{
		...entityCols,
		studentId: int("studentId", { unsigned: true })
			.references(() => students.id, { onDelete: "cascade" })
			.notNull(),
		courseId: int("courseId", { unsigned: true })
			.references(() => courses.id, { onDelete: "cascade" })
			.notNull(),
		rating: tinyint("rating", { unsigned: true }).notNull(),
		comment: varchar("comment", { length: 500 })
	},
	(review) => ({
		unique: unique().on(review.studentId, review.courseId)
	})
);
