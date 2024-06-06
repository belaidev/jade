import { getCourseById, PopularCourse } from "~/services/courseData-service";
import {
	getCourseIdsWithRatingsEqOrHigherThan,
	getRatingAverageByCourseId
} from "./courseRating-service";
import { getInstructorIdByCourseId, getInstructorNameById } from "./instructor-service";
import { getCourseDuration } from "./courseDuration-service";

// Fonction pour récupérer les informations des cours populaires
export async function fetchPopularCourses(): Promise<PopularCourse[]> {
	try {
		// Récupérer les IDs des cours avec un rating élevé
		const courseIds = await getCourseIdsWithRatingsEqOrHigherThan(3.5);

		// Initialiser un tableau pour stocker les informations sur les cours populaires
		const popularCourses: PopularCourse[] = [];

		// Pour chaque ID de cours, récupérer les informations du cours et sa note
		for (const courseId of courseIds) {
			const course = await getCourseById(courseId);
			const rating = await getRatingAverageByCourseId(courseId);
			const instructorId = await getInstructorIdByCourseId(courseId);
			let instructorName;
			if (instructorId != null) {
				instructorName = await getInstructorNameById(instructorId);
			}
			const duration = await getCourseDuration(courseId);
			// Si le cours et la note sont disponibles, ajouter au tableau des cours populaires
			if (course && rating && instructorId && instructorName !== null) {
				popularCourses.push({
					id: course.id,
					title: course.title,
					description: course.description,
					instructor: instructorName,
					duration: duration,
					thumbnailUrl: course.thumbnailUrl,
					price: course.price,
					discount: course.discount,
					rating: rating
				});
			}
		}

		return popularCourses;
	} catch (error) {
		console.error("Error fetching popular courses:", error);
		throw error;
	}
}
