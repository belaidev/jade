import { getClasses } from '~/feats/asynchronous-courses/functions-said';

export async function fetchClasses(courseId: number) {
    try {
        return await getClasses(courseId);
    } catch (error) {
        console.error("Error fetching classes:", error);
        throw error;
    }
}
