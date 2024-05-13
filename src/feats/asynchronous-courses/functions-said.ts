// feats/asynchronous-courses/functions-said.ts
import { db } from "~/common/utils/db.server";
import { courses } from "~/feats/courses/schema";
import { gt } from "drizzle-orm";

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
