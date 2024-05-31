import { and, eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "~/common/utils";
import { otpsTable } from "../schema";

// const SECOND = 1000;

export const verifyEmail = async ({
	tx,
	emailAddress,
	otp
}: {
	tx: Transaction;
	emailAddress: string;
	otp: string;
}) => {
	const [otpEntity] = await tx
		.select()
		.from(otpsTable)
		.where(and(eq(otpsTable.email, emailAddress), eq(otpsTable.code, otp)));

	if (!otpEntity) return <const>[undefined, StatusCodes.NOT_FOUND];
	// if (Date.now() - otpEntity.creationTime * SECOND > ms("5m"))
	// 	return <const>[undefined, StatusCodes.UNAUTHORIZED];
	return <const>[otpEntity, StatusCodes.OK];
};
