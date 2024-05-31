import { Result, Tuple } from "../types";

const returnErrInstance: {
	(err: unknown): Error;
} = (err: unknown): Error => {
	const errInstance = err instanceof Error ? err : new Error(String(err));
	return errInstance;
};

export const dontThrow: {
	<const T>(throwingFn: () => T): T | Error;
	<const T>(throwingFn: () => Promise<T>): Promise<T | Error>;
} = (throwingFn) => {
	try {
		const result = throwingFn();
		return result instanceof Promise
			? result.then((result) => result).catch((err) => returnErrInstance(err))
			: result;
	} catch (err) {
		return returnErrInstance(err);
	}
};

const returnErrInstanceTuple: {
	<const T extends number>(err: unknown, lastResultIdx: T): Result<T, undefined, Error>;
} = <const T extends number>(err: unknown, lastResultIdx: T): Result<T, undefined, Error> => {
	const errInstance = err instanceof Error ? err : new Error(String(err));
	return [...new Array<undefined>(lastResultIdx), errInstance] as [...Tuple<T, undefined>, Error];
};

export const dontThrowTuple: {
	<const T extends number, const U extends Result<T>>(
		throwingFn: () => U,
		lastResultIdx: T
	): U | Result<T, undefined, Error>;

	<const T extends number, const U extends Result<T>>(
		throwingFn: () => Promise<U>,
		lastResultIdx: T
	): Promise<U | Result<T, undefined, Error>>;
} = <const T extends number, const U extends Result<T, undefined, Error>>(
	throwingFn: (() => U) | (() => Promise<U>),
	lastResultIdx: T = 0 as T
): U | Result<T, undefined, Error> | Promise<U | Result<T, undefined, Error>> => {
	try {
		const result = throwingFn();
		return result instanceof Promise
			? result
					.then((result) => result)
					.catch((err) => returnErrInstanceTuple<T>(err, lastResultIdx))
			: result;
	} catch (err) {
		return returnErrInstanceTuple<T>(err, lastResultIdx);
	}
};
