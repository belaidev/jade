import { desc, eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "~/common/utils";
import { emailsTable } from "../schema";
import { _findInUseEntities } from "../utils";

export const findInUseEmailByUserId = async ({
	tx,
	userId
}: {
	tx: Transaction;
	userId: number;
}) => {
	const [email] = await tx
		.select()
		.from(emailsTable)
		.where(eq(emailsTable.userId, userId))
		.orderBy(desc(emailsTable.creationTime))
		.limit(1);
	return !email ? <const>[undefined, StatusCodes.NOT_FOUND] : <const>[email, StatusCodes.OK];
};

export const findInUseEmailByAddress = async ({
	tx,
	emailAddress
}: {
	tx: Transaction;
	emailAddress: string;
}) => {
	const email = (await _findInUseEntities({ tx, table: emailsTable })).find(
		(email) => email.address === emailAddress
	);
	return !email ? <const>[undefined, StatusCodes.NOT_FOUND] : <const>[email, StatusCodes.OK];
};
