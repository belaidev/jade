import { gt } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { getCourseDuration } from "./courseDuration-service";
import { getRatingAverageByCourseId } from "./courseRating-service";
import { getInstructorIdByCourseId, getInstructorNameById } from "./instructor-service";
import type { Course, PopularCourse } from "./courseData-service";
import { courses } from "~/feats/courses/schema";

export async function fetchDiscountCourses(): Promise<PopularCourse[]> {
    // Récupérer les données de base d'un cours
    const coursesData: Course[] = await db.select().from(courses).where(gt(courses.discount, 0));

    // Utiliser Promise.all pour gérer les appels asynchrones pour chaque cours
    const discountCourses: PopularCourse[] = await Promise.all(coursesData.map(async (course: Course) => {
        const rating = await getRatingAverageByCourseId(course.id);
        const instructorId = await getInstructorIdByCourseId(course.id);
        let instructorName;
        if (instructorId != null) {
            instructorName = await getInstructorNameById(instructorId);
        }
        const duration = await getCourseDuration(course.id);

        // Créer l'objet PopularCourse
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
    }));

    return discountCourses;
}
