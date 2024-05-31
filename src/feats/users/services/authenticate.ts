import { eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "~/common/utils";
import { sessionsTable } from "../schema";
import { _sessionStorage } from "../utils";

export const authenticate = async ({ tx, cookie }: { tx: Transaction; cookie: string }) => {
	const remixSession = await _sessionStorage.getSession(cookie);
	const sessionId = remixSession.get("sessionId");
	if (!sessionId) return <const>[undefined, StatusCodes.BAD_REQUEST];

	const [session] = await tx.select().from(sessionsTable).where(eq(sessionsTable.id, sessionId));
	return !session ? <const>[undefined, StatusCodes.UNAUTHORIZED] : <const>[session, StatusCodes.OK];
};
