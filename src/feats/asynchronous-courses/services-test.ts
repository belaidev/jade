// feats/asynchronous-courses/services-test.ts
import { Query } from "drizzle-orm/mysql-core";
import { courses } from "~/feats/courses";

// Fonction pour récupérer les cours avec une remise supérieure à 0
export async function getCoursesWithDiscount(): Promise<any[]> {
    try {
        const query = Query
            .select(courses.id, courses.title, courses.thumbnailUrl, courses.discount)
            .from(courses)
            .where((courses.discount as any).isGreaterThan(0));

        const result = await query.run();
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
