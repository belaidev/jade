
import { db } from "~/common/utils/db.server";
import { courses } from "./schema";
import { eq } from "drizzle-orm";
import { asynchronousCourses, lessons } from "../asynchronous-courses/schema";
import { synchronousCourses } from "../synchronous-courses/schema";
import { classes } from "../synchronous-courses/schema";


export type CourseCardAsync = {


	chapterId: number;
	capsuleUrl: string;
	previewable: boolean;
	duration: string;
}[]

export type CourseCardSync = {

	synchronousCourseId: number;
	startTime: Date;
	endTime: Date;
	meetingUrl: string | null;
}[]

export type Course = {
		id: number;
    title: string;
    description: string;
    instructorId: number;
    thumbnailUrl: string;
    price: number;
    discount: number | null;
}

export type CourseCard = Omit<
    typeof classes & typeof lessons & typeof courses,
    "id" | "creationTime" | "updateTime"
> & (Course & (CourseCardAsync | CourseCardSync ));




export async function getAllCours() {
	const result = await db.select().from(courses);
	return result;
}

export async function getOneCours (id : number) {
	const course = await db.select().from(courses).where(eq(courses.id, id))

	const syncCourse : CourseCardSync = await db.select().from(classes).where(eq(synchronousCourses.id, courses.id))

	let CoursInfo;

	if (syncCourse === undefined) {
			const asyncCourseInfo : CourseCardAsync = await db.select().from(lessons).where(eq(asynchronousCourses.id, courses.id))


			CoursInfo = [...course, ...asyncCourseInfo];
	}else{


		CoursInfo = [...course, ...syncCourse]
	}

	return CoursInfo;
}
