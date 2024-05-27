// feats/courses/functions-said.ts
import { db } from "~/common/utils/db.server";
import { courses } from "~/feats/courses/schema";
import { reviews } from "~/feats/reviews/schema";
import { gt, eq, sql } from "drizzle-orm";
import { persons } from "~/feats/persons";
import { asynchronousCourses, chapters, lessons } from "~/feats/asynchronous-courses/schema";
import { synchronousCourses, classes } from "~/feats/synchronous-courses/schema";

// ------------>>> DÉCLARATION DES TYPES <<<------------------------------------------------------------
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
    instructor?: string;
    duration: number;
    thumbnailUrl: string;
    price: number;
    discount: number | null;
    rating?: number;
};

// Définition des types pour les chapitres et les leçons
export type Chapter = {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
};

export type Lesson = {
    id: number;
    title: string;
    description: string;
    capsuleUrl: string;
    previewable: boolean;
    duration: string;
};

// Définition du type pour les classes
export type Class = {
    id: number;
    startTime: Date;
    endTime: Date;
    meetingUrl: string | null;
};

// ----->>> FONCTIONS POUR LE CAROUSEL <<<---------------------------------------
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

// --------->>> FONCTIONS POUR LES COURS POPULAIRES <<<--------------------------------------
// Fonction pour récupérer les IDs des cours dont le rating dépasse 4
async function getCourseIdsWithHighRating(): Promise<number[]> {
    try {
        const result = await db.select({
            courseId: reviews.courseId,
        })
        .from(reviews)
        .groupBy(reviews.courseId)
        .having(sql`AVG(${reviews.rating}) >= 4.0`);

        const courseIds = result.map(row => row.courseId);
        
        return courseIds;
    } catch (error) {
        console.error("Error fetching course IDs with high rating:", error);
        throw error;
    }
}

// Fonction pour récupérer les informations d'un cours en fonction de son ID
export async function getCourseById(courseId: number): Promise<Course | null> {
    try {
        const result = await db.select().from(courses).where(eq(courses.id, courseId));
        // Vérifier s'il y a des résultats
        if (result[0]) {
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

// Fonction pour récupérer la moyenne des notes d'un cours en fonction de son ID
async function getRatingAverageByCourseId(courseId: number): Promise<number> {
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

// Fonction pour récupérer l'id du prof avec l'id du cours
async function getInstructorIdByCourseId(courseId: number): Promise<number | null> {
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
async function getInstructorNameById(instructorId: number): Promise<string> {
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

async function getSynchronousCourseDuration(courseId: number): Promise<number> {
    const result = await db.select().from(classes).where(eq(classes.synchronousCourseId, courseId));
    
    let totalDuration = 0;
    
    result.forEach((classItem) => {
        const startTime = new Date(classItem.startTime).getTime();
        const endTime = new Date(classItem.endTime).getTime();
        const duration = (endTime - startTime) / (1000 * 60); // Durée en minutes
        totalDuration += duration;
    });

    return totalDuration;
}

async function getChaptersByCourseId(courseId: number): Promise<number[]> {
    const result = await db.select().from(chapters).where(eq(chapters.asynchronousCourseId, courseId));
    return result.map(chapter => chapter.id);
}

async function getAsynchronousCourseDuration(courseId: number): Promise<number> {
    const chapterIds = await getChaptersByCourseId(courseId);

    let totalDuration = 0;

    for (const chapterId of chapterIds) {
        const lessonData = await db.select().from(lessons).where(eq(lessons.chapterId, chapterId));
        
        if(lessonData!=undefined){
        lessonData.forEach((lesson) => {
            const durationParts = lesson.duration.split(':');
            let durationInMinutes = 0;
            if(durationParts[0]!=undefined&&durationParts[1]!=undefined) {
                durationInMinutes = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
            } else {
                durationInMinutes = 0;
            }
            totalDuration += durationInMinutes;
        });
        } else {
            return 0;
        }
    }

    return totalDuration;
}

async function getCourseDuration(courseId: number): Promise<number> {
    if (await isAsynchronousCourse(courseId)) {
        return await getAsynchronousCourseDuration(courseId);
    } else if (await isSynchronousCourse(courseId)) {
        return await getSynchronousCourseDuration(courseId);
    } else {
        throw new Error('Course type not found or invalid course ID');
    }
}

// Fonction principale pour récupérer les cours populaires pour les cartes des cours populaires
export async function getPopularCourses(): Promise<PopularCourse[]> {
    try {
        // Récupérer les IDs des cours avec un rating élevé
        const courseIds = await getCourseIdsWithHighRating();

        // Initialiser un tableau pour stocker les informations sur les cours populaires
        const popularCourses: PopularCourse[] = [];

        // Pour chaque ID de cours, récupérer les informations du cours et sa note
        for (const courseId of courseIds) {
            const course = await getCourseById(courseId);
            const rating = await getRatingAverageByCourseId(courseId);
            const instructorId = await getInstructorIdByCourseId(courseId);
            let instructorName;
            if(instructorId!=null){
                instructorName = await getInstructorNameById(instructorId);
            }
            const duration = await getCourseDuration(courseId);
            // Si le cours et la note sont disponibles, ajouter au tableau des cours populaires
            if (course && rating && instructorId && instructorName !== null) {
                popularCourses.push({
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    instructor: instructorName,
                    duration: duration,
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

// -------->>> FONCTIONS POUR RÉCUPÉRER LES DÉTAILS DES COURS ----------------------------------------------
// Fonction pour vérifier si le cours est asynchrone
export async function isAsynchronousCourse(courseId: number): Promise<boolean> {
    const result = await db.select().from(asynchronousCourses).where(eq(asynchronousCourses.id, courseId));
    return result.length > 0;
}

// Fonction pour vérifier si le cours est synchrone
export async function isSynchronousCourse(courseId: number): Promise<boolean> {
    const result = await db.select().from(synchronousCourses).where(eq(synchronousCourses.id, courseId));
    return result.length > 0;
}

// Fonction pour récupérer les chapitres et les leçons d'un cours asynchrone
export async function getChaptersAndLessons(courseId: number): Promise<Chapter[]> {
    const chaptersResult = await db.select().from(chapters).where(eq(chapters.asynchronousCourseId, courseId));
    const chaptersWithLessons = await Promise.all(chaptersResult.map(async (chapter) => {
        const lessonsResult = await db.select().from(lessons).where(eq(lessons.chapterId, chapter.id));
        return {
            ...chapter,
            lessons: lessonsResult
        };
    }));
    return chaptersWithLessons;
}

// Fonction pour récupérer les classes d'un cours synchrone
export async function getClasses(courseId: number): Promise<Class[]> {
    const classesResult = await db.select().from(classes).where(eq(classes.synchronousCourseId, courseId));
    const transformedClasses = classesResult.map((classItem) => ({
        id: classItem.id,
        startTime: classItem.startTime,
        endTime: classItem.endTime,
        meetingUrl: classItem.meetingUrl,
    }));
    return transformedClasses;
}

// Fonction pour récupérer les avis d'un cours
async function getReviewsByCourseId(courseId: number): Promise<Review[]> {
    const reviewsResult = await db.select().from(reviews).where(eq(reviews.courseId, courseId));
    return reviewsResult;
}



//-------------------------------------------------------------------
// Fonction principale pour récupérer les détails d'un cours populaire en fonction de son id
export async function getPopularCourseById(courseId: number): Promise<PopularCourse | null> {
    try {
        const course = await getCourseById(courseId);
        const rating = await getRatingAverageByCourseId(courseId);
        const instructorId = await getInstructorIdByCourseId(courseId);
        let instructorName;
        if(instructorId!=null){
            instructorName = await getInstructorNameById(instructorId);
        }
        const duration = await getCourseDuration(courseId);
        if(course!=null){
            const PopularCourse: PopularCourse = {
                id: course.id,
                title: course.title,
                description: course.description,
                instructor: instructorName,
                duration: duration,
                thumbnailUrl: course.thumbnailUrl || '/img/img-default',
                price: course.price,
                discount: course.discount,
                rating: rating
            };
            return PopularCourse;
        } else {
            console.log("Error fetching data for course. Course could be null.")
            return null;
        }
    } catch (error) {
        console.error("Error fetching popular course:", error);
        throw error;
    }
}

