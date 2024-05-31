import { StatusCodes } from "http-status-codes";

export const errInstanceToStatusCode = <const T extends StatusCodes>(
	maybeErrInstance: T | Error
) => {
	if (maybeErrInstance instanceof Error) {
		console.error(maybeErrInstance);
		return StatusCodes.INTERNAL_SERVER_ERROR;
	} else {
		return maybeErrInstance;
	}
};
