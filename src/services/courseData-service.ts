import { db } from "~/common/utils/db.server";
import { courses } from "~/feats/courses/schema";
import { eq } from "drizzle-orm";
import { chapters, lessons } from "~/feats/asynchronous-courses/schema";
import { classes } from "~/feats/synchronous-courses/schema";

// DÉCLARATION DES TYPES <<<------------------------------
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

// FONCTIONS <---------------------------------
// Fonction pour récupérer les informations d'un cours avec son id
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

// Fonction pour récupérer les chapitres à partir de l'id d'un cours
export async function getChaptersByCourseId(courseId: number): Promise<number[]> {
	const result = await db
		.select()
		.from(chapters)
		.where(eq(chapters.asynchronousCourseId, courseId));
	return result.map((chapter) => chapter.id);
}

// Fonction pour récupérer les chapitres et les leçons d'un cours asynchrone à partir de l'id d'un cours
export async function getChaptersAndLessons(courseId: number): Promise<Chapter[]> {
	const chaptersResult = await db
		.select()
		.from(chapters)
		.where(eq(chapters.asynchronousCourseId, courseId));
	const chaptersWithLessons = await Promise.all(
		chaptersResult.map(async (chapter) => {
			const lessonsResult = await db
				.select()
				.from(lessons)
				.where(eq(lessons.chapterId, chapter.id));
			return {
				...chapter,
				lessons: lessonsResult
			};
		})
	);
	return chaptersWithLessons;
}

// Fonction pour récupérer les classes d'un cours synchrone à partir de l'id d'un cours
export async function getClasses(courseId: number): Promise<Class[]> {
	const classesResult = await db
		.select()
		.from(classes)
		.where(eq(classes.synchronousCourseId, courseId));
	const transformedClasses = classesResult.map((classItem) => ({
		id: classItem.id,
		startTime: classItem.startTime,
		endTime: classItem.endTime,
		meetingUrl: classItem.meetingUrl
	}));
	return transformedClasses;
}
