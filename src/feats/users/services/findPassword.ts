import { desc, eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "~/common/utils";
import { passwordsTable } from "../schema";

export const findInUsePasswordByUserId = async ({
	tx,
	userId
}: {
	tx: Transaction;
	userId: number;
}) => {
	const [password] = await tx
		.select()
		.from(passwordsTable)
		.where(eq(passwordsTable.userId, userId))
		.orderBy(desc(passwordsTable.creationTime))
		.limit(1);
	return !password ? <const>[undefined, StatusCodes.NOT_FOUND] : <const>[password, StatusCodes.OK];
};
