import { int, mysqlTable, unique } from "drizzle-orm/mysql-core";
import { entityCols } from "~/common/models/Entity";
import { courses } from "../courses/schema";
import { persons } from "../persons/schema";

export const students = mysqlTable("Students", {
	id: int("id", { unsigned: true })
		.primaryKey()
		.references(() => persons.id, { onDelete: "cascade" })
});

export const enrollments = mysqlTable(
	"Enrollments",
	{
		...entityCols,
		studentId: int("studentId", { unsigned: true })
			.references(() => students.id, { onDelete: "cascade" })
			.notNull(),
		courseId: int("courseId", { unsigned: true })
			.references(() => courses.id, { onDelete: "cascade" })
			.notNull()
	},
	(enrollment) => ({
		unique: unique().on(enrollment.studentId, enrollment.courseId)
	})
);
