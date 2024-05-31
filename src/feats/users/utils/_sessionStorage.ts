import { Session, createCookieSessionStorage } from "@remix-run/node";
import { getEnv } from "~/common/utils/getEnv";

export type RemixSessionData = { sessionId: number; userId: number };

export type RemixSessionFlashData = { sessionId: number; userId: number };

export type RemixSession = Session<RemixSessionData, RemixSessionFlashData>;

export const _sessionStorage = createCookieSessionStorage<RemixSessionData, RemixSessionFlashData>({
	cookie: {
		name: "_session",
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secure: true,
		// QUESTION Does this result in the cookie being encrypted, or simply signed?
		secrets: [getEnv("SECRET_KEY")]
	}
});
