import { eq } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { asynchronousCourses, chapters, lessons } from "~/feats/asynchronous-courses/schema";
import { classes, synchronousCourses } from "~/feats/synchronous-courses/schema";
import { courses } from "~/feats/courses/schema";
import { formatDuration } from "~/services/formatDuration-service";
import { getAsynchronousCourseDuration } from "./courseDuration-service";
import { instructors } from "~/feats/instructors/schema";
import { getInstructorNameById } from "./instructor-service";

export type CourseCard = {
	id: number;
	title: string;
	description: string;
	instructorName: string;
	thumbnailUrl: string;
	price: number;
	discount: number | null;
	type: "sync" | "async";
	totalDuration?: string;
	startTime: Date | string;
};

export type CourseCardAsync = CourseCard & {
	chapterId: number;
	capsuleUrl: string;
	previewable: boolean;
	duration: string;
};

export type CourseCardSync = CourseCard & {
	synchronousCourseId: number;
	startTime: Date;
	endTime: Date;
	meetingUrl: string | null;
};

export async function getAllCourses() {
	const result = await db.select().from(courses);

	const coursesWithDetails = await Promise.all(
		result.map(async (course) => {
			let details: Partial<CourseCard> = {};

			const asyncCourse = await db
				.select()
				.from(asynchronousCourses)
				.where(eq(asynchronousCourses.id, course.id))
				.leftJoin(chapters, eq(chapters.asynchronousCourseId, asynchronousCourses.id))
				.leftJoin(lessons, eq(lessons.chapterId, chapters.id));

			console.log("asyncCourse : ", asyncCourse);
			if (asyncCourse.length > 0) {
				details.type = "async";
				// Calculer la durée totale des leçons asynchrones
				const totalDuration = await getAsynchronousCourseDuration(course.id);
				// Ajouter la durée totale au détail du cours
				details.totalDuration = formatDuration(totalDuration);
				console.log("totalDuration:", details.totalDuration )
			}
			const syncCourse = await db
				.select()
				.from(synchronousCourses)
				.where(eq(synchronousCourses.id, course.id))
				.leftJoin(classes, eq(classes.synchronousCourseId, synchronousCourses.id));

				if (syncCourse.length > 0) {
					details.type = "sync";

					// Trouver la première date de début des classes
					const firstStartTime = syncCourse.reduce((earliest, course) => {
						if (course.Classes && course.Classes.startTime) {
							const startTime = new Date(course.Classes.startTime);
							return !earliest || startTime < earliest ? startTime : earliest;
						}
						return earliest;
					}, null as Date | null);

					if (firstStartTime) {
						details.startTime = firstStartTime.toLocaleString('fr-FR', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
							hour12: false,
						});
					}
				}
			console.log("details:", details)

			const instructorName = await getInstructorNameById(course.instructorId);
      details.instructorName = instructorName ?? "Unknown Instructor";

			return { ...course, ...details } as CourseCard;
		})
	);
	return coursesWithDetails;
}
