import * as argon2 from "argon2";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "~/common/utils";
import { emailsTable, passwordsTable, usersTable } from "../schema";
import { findInUseEmailByAddress } from "./findEmail";

export const createAccount = async ({
	tx,
	emailAddress,
	password
}: {
	tx: Transaction;
	emailAddress: string;
	password: string;
}) => {
	const [, status] = await findInUseEmailByAddress({ tx, emailAddress: emailAddress });
	if (status !== StatusCodes.NOT_FOUND) return <const>[undefined, StatusCodes.CONFLICT];

	const [{ insertId: userId }] = await tx.insert(usersTable).values({});
	void (await Promise.all([
		tx.insert(emailsTable).values({ userId, address: emailAddress }),
		(async () => {
			const hash = await argon2.hash(password);
			await tx.insert(passwordsTable).values({ userId, hash });
		})()
	]));
	return <const>[userId, StatusCodes.CREATED];
};
