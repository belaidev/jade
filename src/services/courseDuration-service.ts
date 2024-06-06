import { eq } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { lessons } from "~/feats/asynchronous-courses/schema";
import { classes } from "~/feats/synchronous-courses/schema";
import { isAsynchronousCourse, isSynchronousCourse } from "./checkCourseCategory-service";
import { getChaptersByCourseId } from "~/services/courseData-service";

export async function getSynchronousCourseDuration(courseId: number): Promise<number> {
	const result = await db.select().from(classes).where(eq(classes.synchronousCourseId, courseId));

	let totalDuration = 0;

	result.forEach((classItem) => {
		const startTime = new Date(classItem.startTime).getTime();
		const endTime = new Date(classItem.endTime).getTime();
		const duration = (endTime - startTime) / 1000; // Durée en secondes
		totalDuration += duration;
	});

	return totalDuration;
}

export async function getAsynchronousCourseDuration(courseId: number): Promise<number> {
	const chapterIds = await getChaptersByCourseId(courseId);

	let totalDuration = 0;

	for (const chapterId of chapterIds) {
		const lessonData = await db.select().from(lessons).where(eq(lessons.chapterId, chapterId));

		if (lessonData != undefined) {
			lessonData.forEach((lesson) => {
				const durationParts = lesson.duration.split(":");
				let durationInSeconds = 0;
				if (
					durationParts[0] != undefined &&
					durationParts[1] != undefined &&
					durationParts[2] != undefined
				) {
					durationInSeconds =
						parseInt(durationParts[0]) * 3600 +
						parseInt(durationParts[1]) * 60 +
						parseInt(durationParts[2]);
				} else {
					durationInSeconds = 0;
				}
				totalDuration += durationInSeconds; // durée retournée en secondes
			});
		} else {
			return 0;
		}
	}

	return totalDuration;
}

export async function getCourseDuration(courseId: number): Promise<number> {
	if (await isAsynchronousCourse(courseId)) {
		return await getAsynchronousCourseDuration(courseId);
	} else if (await isSynchronousCourse(courseId)) {
		return await getSynchronousCourseDuration(courseId);
	} else {
		throw new Error("Course type not found or invalid course ID");
	}
}
