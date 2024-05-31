import { StatusCodes } from "http-status-codes";

export const maskStatusCode = <const T extends StatusCodes, const U extends StatusCodes>(
	devStatusCode: T,
	prodStatusCode: U
) => (process.env.NODE_ENV === "development" ? devStatusCode : prodStatusCode);
