// services/detail-cours-populaire-service.ts
import { getPopularCourseById, PopularCourse } from '~/feats/asynchronous-courses/functions-said';

export async function fetchPopularCourseById(id: number): Promise<PopularCourse | null> {
    try {
        const course = await getPopularCourseById(id);
        return course;
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
}