import { eq, sql } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { reviews } from "~/feats/reviews/schema";

// Définition du type pour une note
export type Review = {
    id: number;
    creationTime: Date;
    updateTime: Date;
    studentId: number;
    courseId: number;
    rating: number;
    comment: string | null;
};

// Fonction pour récupérer les ids des cours pour une note (supérieure ou égale à X)
export async function getCourseIdsWithRatingsEqOrHigherThan(rating: number): Promise<number[]> {
    try {
        const result = await db.select({
            courseId: reviews.courseId,
        })
        .from(reviews)
        .groupBy(reviews.courseId)
        .having(sql`AVG(${reviews.rating}) >= ${rating}`);

        const courseIds = result.map(row => row.courseId);
        
        return courseIds;
    } catch (error) {
        console.error("Error fetching course IDs with high rating:", error);
        throw error;
    }
}

// Fonction pour récupérer la moyenne des notes d'un cours en fonction de son ID
export async function getRatingAverageByCourseId(courseId: number): Promise<number> {
    try {
        const result = await db.select({
            value: sql`avg(${reviews.rating})`.mapWith(String)
        }).from(reviews).where(eq(reviews.courseId, courseId));

        // Vérifier s'il y a des résultats
        if (result[0]) {
            // Arrondir le rating à un chiffre après la virgule
            const averageRating = parseFloat(result[0].value).toFixed(1);
            return parseFloat(averageRating);
        } else {
            // Si aucun résultat trouvé, retourner 0
            console.log(`Aucun cours trouvé pour l'ID ${courseId}:`);
            return 0;
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération de la moyenne des notes pour le cours avec l'ID ${courseId}:`, error);
        throw error;
    }
}

// Fonction pour récupérer les avis d'un cours
export async function getReviewsByCourseId(courseId: number): Promise<Review[]> {
    const reviewsResult = await db.select().from(reviews).where(eq(reviews.courseId, courseId));
    return reviewsResult;
}