
import { db } from "~/common/utils/db.server";
import { courses } from "./schema";



export type CourseCard = {
	id: number;
	title: string;
	description: string;
	instructorId: number;
	thumbnailUrl: string;
	price: number;
	discount: number | null;
}

export async function getAllCours() {
	const result = await db.select().from(courses); 
	return result;
}
