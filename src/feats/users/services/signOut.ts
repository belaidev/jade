import { and, eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "~/common/utils";
import { sessionsTable } from "../schema";
import { _sessionStorage } from "../utils";

export const signOut = async ({ tx, cookie: cookie }: { tx: Transaction; cookie: string }) => {
	const remixSession = await _sessionStorage.getSession(cookie);
	const sessionId = parseInt(String(remixSession.get("sessionId")));
	if (!sessionId) return <const>[undefined, StatusCodes.BAD_REQUEST];

	const [[{ affectedRows }], newCookie] = await Promise.all([
		tx.delete(sessionsTable).where(and(eq(sessionsTable.id, sessionId))),
		_sessionStorage.destroySession(remixSession)
	]);
	return !affectedRows
		? <const>[newCookie, StatusCodes.NOT_FOUND]
		: <const>[newCookie, StatusCodes.OK];
};
