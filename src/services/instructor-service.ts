import { eq } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { courses } from "~/feats/courses/schema";
import { persons } from "~/feats/persons/schema";

// Fonction pour récupérer l'id du prof avec l'id du cours
export async function getInstructorIdByCourseId(courseId: number): Promise<number | null> {
    try {
        const result = await db
        .select({instructorId: courses.instructorId})
        .from(courses)
        .where(eq(courses.id, courseId));

        if (result[0]) {
        return result[0].instructorId;
        }else {
            // Si aucun résultat trouvé, retourner null
            console.log(`Aucun id de prof trouvé pour l'id ${courseId}:`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching course IDs with high rating:", error);
        throw error;
    }
}

// Fonction pour récupérer le nom du professeur avec l'ID du cours
export async function getInstructorNameById(instructorId: number): Promise<string> {
    try {
        const result = await db
            .select({instructorFirstName: persons.firstName, instructorLastName: persons.lastName})
            .from(persons)
            .where(eq(persons.id, instructorId));

        if (result[0]) {
            const firstName = result[0].instructorFirstName;
            const lastName = result[0].instructorLastName;
            return `${firstName} ${lastName}`;
        } else {
            // Si aucun résultat trouvé, retourner null
            console.log(`Aucun nom de professeur trouvé pour l'ID ${instructorId}:`);
            return "";
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du nom du professeur:", error);
        throw error;
    }
}
