import { db } from "~/common/utils/db.server";
import { lessons} from "./schema";
import { eq} from 'drizzle-orm';


export async function getOneAsynchronous(id : number){

	const result = await db.select({ duration: lessons.duration}).from(lessons).where(eq(lessons.id, id))
	return result;

	//foreach
}
