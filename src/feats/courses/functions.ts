import { InferSelectModel, eq } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { getOneAsynchronous } from "../asynchronous-courses/function";
import { lessons } from "../asynchronous-courses/schema";
import { classes, synchronousCourses } from "../synchronous-courses/schema";
import { courses } from "./schema";
import { serverOnly$ } from "vite-env-only";

export type CourseCardAsync =  Omit<InferSelectModel<typeof lessons>, "id" | "creationTime" | "updateTime" | "title" | "description"> & {
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
	InferSelectModel<typeof classes> &
		InferSelectModel<typeof lessons>,
	"id" | "creationTime" | "updateTime"
> &
	Course &
	(CourseCardSync | CourseCardAsync);

export async function getAllCours() {
	const result = await db.select().from(courses);
	return result;
}
