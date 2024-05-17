// feats/asynchronous-courses/functions-said.ts
import { db } from "~/common/utils/db.server";
import { courses } from "~/feats/courses/schema";
import { reviews } from "~/feats/reviews/schema";
import { gt, gte, eq } from "drizzle-orm";

// Définition du type pour un cours
export type Course = {
    id: number;
    title: string;
    description: string;
    instructorId: number;
    thumbnailUrl: string;
    price: number;
    discount: number | null;
};

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

// Définition du type pour les données de cours populaires
export type PopularCourse = {
    id: number;
    title: string;
    description: string;
    instructorId: number;
    thumbnailUrl: string;
    price: number;
    discount: number | null;
    rating: number | undefined;
};

// Fonction pour récupérer tous les cours
export async function getAllCourses(): Promise<Course[]> {
    const result = await db.select().from(courses);
    return result;
}

// Fonction pour récupérer les images des cours en promotion
export async function getDiscountCoursesThumbnails(): Promise<string[]> {
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

// Fonction pour récupérer les IDs des cours dont le rating dépasse 4
async function getCourseIdsWithHighRating(): Promise<number[]> {
    try {
        let courseIds: number[] = [];

        const result = await db.select()
            .from(reviews)
            .where(gte(reviews.rating, 4.0));
        
        for (const review of result) {
            courseIds.push(review.courseId);
        }
        
        return courseIds;
    } catch (error) {
        console.error("Error fetching course IDs with high rating:", error);
        throw error;
    }
}

// Fonction pour récupérer les informations d'un cours en fonction de son ID
async function getCourseById(courseId: number): Promise<Course | undefined | null> {
    try {
        const result = await db.select().from(courses).where(eq(courses.id, courseId));
        // Vérifier s'il y a des résultats
        if (result && result.length > 0) {
            // Retourner le premier résultat trouvé
            return result[0];
        } else {
            // Si aucun résultat trouvé, retourner null
            console.log(`Aucun cours trouvé pour l'ID ${courseId}:`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching course with ID ${courseId}:`, error);
        throw error;
    }
}

// Fonction pour récupérer la note d'un cours en fonction de son ID
async function getRatingByCourseId(courseId: number): Promise<number | undefined | null> {
    try {
        const result = await db.select({rating: reviews.rating}).from(reviews).where(eq(reviews.courseId, courseId));
         // Vérifier s'il y a des résultats
         if (result && result.length > 0) {
            // Retourner le premier résultat trouvé
            return result[0]?.rating;
        } else {
            // Si aucun résultat trouvé, retourner null
            console.log(`Aucun cours trouvé pour l'ID ${courseId}:`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching rating for course with ID ${courseId}:`, error);
        throw error;
    }
}

// Fonction principale pour récupérer les cours populaires
export async function getPopularCourses(): Promise<PopularCourse[]> {
    try {
        // Récupérer les IDs des cours avec un rating élevé
        const courseIds = await getCourseIdsWithHighRating();

        // Initialiser un tableau pour stocker les informations sur les cours populaires
        const popularCourses: PopularCourse[] = [];

        // Pour chaque ID de cours, récupérer les informations du cours et sa note
        for (const courseId of courseIds) {
            const course = await getCourseById(courseId);
            const rating = await getRatingByCourseId(courseId);
            
            // Si le cours et la note sont disponibles, ajouter au tableau des cours populaires
            if (course && rating !== null) {
                popularCourses.push({
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    instructorId: course.instructorId,
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
