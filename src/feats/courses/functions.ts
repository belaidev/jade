import { InferSelectModel, eq } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { getOneAsynchronous } from "../asynchronous-courses/function";
import { lessons } from "../asynchronous-courses/schema";
import { classes, synchronousCourses } from "../synchronous-courses/schema";
import { courses } from "./schema";

export type CourseCardAsync = Omit<
	InferSelectModel<typeof lessons>,
	"id" | "creationTime" | "updateTime" | "title" | "description"
> & {
	chapterId: number;
	capsuleUrl: string;
	previewable: boolean;
	duration: string;
};

export type CourseCardSync = {
	synchronousCourseId: number;
	startTime: Date;
	endTime: Date;
	meetingUrl: string | null;
};

export type Course = {
	id: number;
	title: string;
	description: string;
	instructorId: number;
	thumbnailUrl: string;
	price: number;
	discount: number | null;
};

export type CourseCard = Omit<
	InferSelectModel<typeof classes> & InferSelectModel<typeof lessons>,
	"id" | "creationTime" | "updateTime"
> &
	Course &
	(CourseCardSync | CourseCardAsync);

export async function getAllCours() {
	const result = await db.select().from(courses);
	return result;
}

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
