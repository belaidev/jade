/*
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

// Fonction pour récupérer les cours avec une remise supérieure à 0
export async function getCoursesWithDiscount(): Promise<any[]> {
    try {
        const result = await db.select().from(courses).where(gt(courses.discount, 0)).run();
        return result.rows;
    } catch (error) {
        console.error("Error fetching courses with discount:", error);
        throw error;
    }
}

// Fonction pour récupérer les URLs d'images des cours en promotion
export async function getThumbnailUrlsOfCoursesWithDiscount(): Promise<string[]> {
    try {
        const coursesWithDiscount = await getCoursesWithDiscount();
        const thumbnailUrls: string[] = coursesWithDiscount.map((course) => course.thumbnailUrl);
        return thumbnailUrls;
    } catch (error) {
        console.error("Error fetching thumbnail URLs of courses with discount:", error);
        throw error;
    }
}
*/