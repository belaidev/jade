import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { entityCols } from "~/common/models/Entity";
import { courses } from "../courses/schema";

export const synchronousCourses = mysqlTable("SynchronousCourses", {
	id: int("id", { unsigned: true })
		.primaryKey()
		.references(() => courses.id, { onDelete: "cascade" }),

	// NOTE A course is considered hybrid if its `location` is non-null, and 1
	// or more of its classes is remote
	location: varchar("location", { length: 100 })
});

export const classes = mysqlTable("Classes", {
	...entityCols,
	synchronousCourseId: int("synchronousCourseId", { unsigned: true })
		.references(() => synchronousCourses.id, { onDelete: "cascade" })
		.notNull(),
	startTime: timestamp("startTime").notNull(),
	endTime: timestamp("endTime").notNull(),

	// NOTE A class is considered remote if it has a meeting URL
	meetingUrl: varchar("meetingUrl", { length: 2000 })
});
