import { eq } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { asynchronousCourses, chapters, lessons } from "../asynchronous-courses/schema";
import { classes, synchronousCourses } from "../synchronous-courses/schema";
import { courses } from "./schema";

export type Course = {
	id: number;
	title: string;
	description: string;
	instructorId: number;
	thumbnailUrl: string;
	price: number;
	discount: number | null;
	type: "sync" | "async";
	totalDuration?: string;
	startTime?: Date;
};

export type CourseCardAsync = Course & {
	chapterId: number;
	capsuleUrl: string;
	previewable: boolean;
	duration: string;
};

export type CourseCardSync = Course & {
	synchronousCourseId: number;
	startTime: Date;
	endTime: Date;
	meetingUrl: string | null;
};

export async function getAllCours() {
	const result = await db.select().from(courses);

	const coursesWithDetails = await Promise.all(
		result.map(async (course) => {
			let details: Partial<Course> = {};

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
				const totalDuration = asyncCourse.reduce((acc, course) => {
					if (course.Lessons && course.Lessons.duration) {
						// Convertir la durée de chaque leçon en secondes et l'ajouter à l'accumulateur
						const durationInSeconds = parseDuration(course.Lessons.duration);
						return acc + durationInSeconds;
					}
					return acc;
				}, 0);

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
						details.startTime = firstStartTime;
					}
				}
			console.log("details:", details)
			return { ...course, ...details } as Course;

		})
	);

	return coursesWithDetails;
}

function parseDuration(duration: string): number {
	const [hours = 0, minutes = 0, seconds = 0] = duration.split(":").map(Number);
	return hours * 3600 + minutes * 60 + seconds;
}

// Fonction pour formater une durée en secondes en HH:MM:SS
function formatDuration(durationInSeconds: number): string {
	const hours = Math.floor(durationInSeconds / 3600);
	const minutes = Math.floor((durationInSeconds % 3600) / 60);
	const seconds = durationInSeconds % 60;
	return `${hours}:${minutes}:${seconds}`;
}
