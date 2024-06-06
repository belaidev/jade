import { db } from "~/common/utils/db.server";
import { eq } from "drizzle-orm";
import { asynchronousCourses } from "~/feats/asynchronous-courses/schema";
import { synchronousCourses } from "~/feats/synchronous-courses/schema";

// Fonction pour vérifier si le cours est asynchrone
export async function isAsynchronousCourse(courseId: number): Promise<boolean> {
	const result = await db
		.select()
		.from(asynchronousCourses)
		.where(eq(asynchronousCourses.id, courseId));
	return result.length > 0;
}

// Fonction pour vérifier si le cours est synchrone
export async function isSynchronousCourse(courseId: number): Promise<boolean> {
	const result = await db
		.select()
		.from(synchronousCourses)
		.where(eq(synchronousCourses.id, courseId));
	return result.length > 0;
}
