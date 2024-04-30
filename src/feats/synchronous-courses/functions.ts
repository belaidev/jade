import { db } from "~/common/utils/db.server";
import { classes } from "./schema";
import { eq} from 'drizzle-orm';


export async function getOneSynchronous(id : number){

	const result = await db.select().from(classes).where(eq(classes.id, id))
	return result;
}
