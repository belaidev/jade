// services/carousel-service.ts
import { getDiscountCoursesThumbnails, getPopularCourses, PopularCourse } from "~/feats/asynchronous-courses/functions-said";

// Fonction pour récupérer les URLs d'images des cours en promotion
export async function fetchThumbnailUrls(): Promise<string[]> {
    try {
        // Appeler la fonction pour obtenir les URLs des images
        const thumbnailUrls = await getDiscountCoursesThumbnails();
        return thumbnailUrls;
    } catch (error) {
        console.error("Error fetching thumbnail URLs:", error);
        throw error;
    }
}

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