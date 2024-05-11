// index-service.tsx
import { getCoursesWithDiscount } from "~/feats/asynchronous-courses/functions-said";

// Fonction pour récupérer les URLs d'images des cours en promotion
export async function fetchThumbnailUrls(): Promise<string[]> {
    try {
        // Appeler la fonction pour obtenir les URLs des images
        const thumbnailUrls = await getCoursesWithDiscount();
        return thumbnailUrls;
    } catch (error) {
        console.error("Error fetching thumbnail URLs:", error);
        throw error;
    }
}
