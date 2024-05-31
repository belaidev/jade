import { StatusCodes } from "http-status-codes";
import { Transaction } from "~/common/utils";
import { Person, personsTable } from "../schema";

export const createPerson = async (props: {
	tx: Transaction;
	userId: number;
	firstName: string;
	lastName?: string;
	pronoun: Person["pronoun"];
	occupation: Person["occupation"];
}) => {
	const { tx, userId, ...rest } = props;
	const [{ insertId: personId }] = await tx.insert(personsTable).values({ id: userId, ...rest });
	return <const>[personId, StatusCodes.CREATED];
};
