import { randomInt } from "crypto";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "~/common/utils";
import { otpsTable } from "../schema";
import { findInUseEmailByAddress } from "./findEmail";

export const generateOtp = async ({
	tx,
	emailAddress
}: {
	tx: Transaction;
	emailAddress: string;
}) => {
	const [, err] = await findInUseEmailByAddress({ tx, emailAddress: emailAddress });
	if (err !== StatusCodes.NOT_FOUND)
		return err !== StatusCodes.OK
			? <const>[undefined, err]
			: <const>[undefined, StatusCodes.CONFLICT];

	const code = Array.from({ length: 6 }, () => randomInt(0, 10).toString()).join("");
	const [{ insertId: otpId }] = await tx.insert(otpsTable).values({ email: emailAddress, code });
	console.log(`One-time passcode for '${emailAddress}': ${code}`);
	return <const>[otpId, StatusCodes.CREATED];
};
