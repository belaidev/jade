import * as argon2 from "argon2";
import { StatusCodes } from "http-status-codes";
import ms from "ms";
import { Transaction } from "~/common/utils";
import { sessionsTable } from "../schema";
import { _sessionStorage } from "../utils";
import { findInUseEmailByAddress } from "./findEmail";
import { findInUsePasswordByUserId } from "./findPassword";

const SECOND = 1000;

export const signIn = async ({
	tx,
	emailAddress,
	password,
	staySignedIn
}: {
	tx: Transaction;
	emailAddress: string;
	password: string;
	staySignedIn?: boolean;
}) => {
	const [email, status] = await findInUseEmailByAddress({
		tx,
		emailAddress
	});
	if (status !== StatusCodes.OK) return <const>[undefined, status];

	const [passwordEntity] = await findInUsePasswordByUserId({ tx, userId: email.userId });
	if (!passwordEntity) return <const>[undefined, StatusCodes.NOT_FOUND];
	if (!(await argon2.verify(passwordEntity.hash, password)))
		return <const>[undefined, StatusCodes.UNAUTHORIZED];

	const [{ insertId: sessionId }] = await tx.insert(sessionsTable).values({ userId: email.userId });
	const remixSession = await _sessionStorage.getSession();
	remixSession.set("sessionId", sessionId);
	const cookie = await _sessionStorage.commitSession(
		remixSession,
		staySignedIn ? { maxAge: ms("1m") / SECOND } : {}
	);
	return <const>[cookie, StatusCodes.CREATED];
};
