import { gt } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { courses } from "~/feats/courses/schema";

// Fonction pour récupérer les URLs d'images des cours en promotion
export async function fetchDiscountThumbnailUrls(): Promise<string[]> {
    try {
        // Initialisez le tableau images
        let images: string[] = [];

        // Effectuez la requête pour récupérer les cours avec une remise
        const result = await db.select().from(courses).where(gt(courses.discount, 0));

        // Parcourez les résultats de la requête et ajoutez les images au tableau images
        for (const course of result) {
            images.push(course.thumbnailUrl);
        }

        // Retournez le tableau images
        return images;
    } catch (error) {
        console.error("Error fetching courses with discount:", error);
        throw error;
    }
}