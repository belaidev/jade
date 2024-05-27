import { getPopularCourses, PopularCourse } from "~/feats/courses/functions-said";

// Fonction pour récupérer les informations des cours populaires
export async function fetchPopularCourses(): Promise<PopularCourse[]> {
    try {
        const popularCourses = await getPopularCourses();
        return popularCourses;
    } catch (error) {
        console.error("Error fetching popular courses:", error);
        throw error;
    }
}