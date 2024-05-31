import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "~/common/utils";
import { personsTable } from "../schema";

export const findPersonById = async ({ tx, id }: { tx: Transaction; id: number }) => {
	const [person] = await tx.select().from(personsTable).where(eq(personsTable.id, id));

	return !person ? <const>[undefined, StatusCodes.NOT_FOUND] : <const>[person, StatusCodes.OK];
};
