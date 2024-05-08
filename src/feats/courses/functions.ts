import { InferSelectModel, eq } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { ExpandRecursively } from "~/common/utils/expand";
import { asynchronousCourses, lessons } from "../asynchronous-courses/schema";
import { classes, synchronousCourses } from "../synchronous-courses/schema";
import { courses } from "./schema";

export type CourseCardAsync = {
	chapterId: number;
	capsuleUrl: string;
	previewable: boolean;
	duration: string;
}[];

export type CourseCardSync = {
	synchronousCourseId: number;
	startTime: Date;
	endTime: Date;
	meetingUrl: string | null;
}[];

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
	InferSelectModel<typeof classes> &
		InferSelectModel<typeof lessons> &
		InferSelectModel<typeof courses>,
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

	const syncCourse: CourseCardSync = await db
		.select()
		.from(classes)
		.where(eq(synchronousCourses.id, courses.id));

	let CoursInfo;

	if (syncCourse === undefined) {
		const asyncCourseInfo: CourseCardAsync = await db
			.select()
			.from(lessons)
			.where(eq(asynchronousCourses.id, courses.id));

		CoursInfo = [...course, ...asyncCourseInfo];
	} else {
		CoursInfo = [...course, ...syncCourse];
	}

	return CoursInfo;
}
