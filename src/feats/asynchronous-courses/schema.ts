import { boolean, int, mysqlTable, time, varchar } from "drizzle-orm/mysql-core";
import { describableCols, entityCols } from "~/common/models";
import { courses } from "~/feats/courses";

export const asynchronousCourses = mysqlTable("AsynchronousCourses", {
	id: int("id", { unsigned: true })
		.primaryKey()
		.references(() => courses.id, { onDelete: "cascade" })
});

export const chapters = mysqlTable("Chapters", {
	...entityCols,
	...describableCols,
	asynchronousCourseId: int("asynchronousCourseId", { unsigned: true })
		.references(() => asynchronousCourses.id, { onDelete: "cascade" })
		.notNull()
});

export const lessons = mysqlTable("Lessons", {
	...entityCols,
	...describableCols,
	chapterId: int("chapterId", { unsigned: true })
		.references(() => chapters.id, { onDelete: "cascade" })
		.notNull(),
	capsuleUrl: varchar("capsuleUrl", { length: 2000 }).notNull(),
	previewable: boolean("remote").default(false).notNull(),
	duration: time("duration").notNull()
});
