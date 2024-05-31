import { sql } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { courses } from "~/feats/courses/schema";
import type { Course, PopularCourse } from "./courseData-service";
import { getCourseDuration } from "./courseDuration-service";
import { getRatingAverageByCourseId } from "./courseRating-service";
import { getInstructorIdByCourseId, getInstructorNameById } from "./instructor-service";

export async function fetchSearchCourses(keywords: string): Promise<PopularCourse[]> {
	const coursesData: Course[] = await db
		.select()
		.from(courses)
		.where(
			sql`${courses.title} LIKE ${`%${keywords}%`} OR ${courses.description} LIKE ${`%${keywords}%`}`
		);

	const discountCourses: PopularCourse[] = await Promise.all(
		coursesData.map(async (course: Course) => {
			const rating = await getRatingAverageByCourseId(course.id);
			const instructorId = await getInstructorIdByCourseId(course.id);
			let instructorName;
			if (instructorId != null) {
				instructorName = await getInstructorNameById(instructorId);
			}
			const duration = await getCourseDuration(course.id);

			return {
				id: course.id,
				title: course.title,
				description: course.description,
				instructor: instructorName,
				duration: duration,
				thumbnailUrl: course.thumbnailUrl,
				price: course.price,
				discount: course.discount,
				rating: rating
			};
		})
	);

	return discountCourses;
}
