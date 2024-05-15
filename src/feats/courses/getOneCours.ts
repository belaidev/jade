import { eq } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { getOneAsynchronous } from "../asynchronous-courses/function";
import { classes, synchronousCourses } from "../synchronous-courses/schema";
import { CourseCardAsync, CourseCardSync } from "./functions";
import { courses } from "./schema";


export async function getOneCours(id: number) {
	const course = await db.select().from(courses).where(eq(courses.id, id));

	const syncCourse: CourseCardSync[] = await db
		.select()
		.from(classes)
		.where(eq(synchronousCourses.id, id));

	let CoursInfo;

	if (syncCourse.length === 0) {
		const asyncCourseInfo: CourseCardAsync[] = await getOneAsynchronous(id);

		CoursInfo = [...course, ...asyncCourseInfo];
	} else {
		CoursInfo = [...course, ...syncCourse];
	}

	return CoursInfo;
}
