import { sql } from "drizzle-orm";
import { Result } from "../types";
import { db } from "./db.server";
import { dontThrow, dontThrowTuple } from "./dontThrow";

export type Transaction<T = unknown> = Parameters<Parameters<typeof db.transaction<T>>[0]>[0];

export const transact: {
	<const T>(transaction: (tx: Transaction) => Promise<T>): Promise<T | Error>;
} = async <const T>(transaction: (tx: Transaction) => Promise<T>): Promise<T | Error> =>
	dontThrow(() =>
		db.transaction(async (tx) => {
			await tx.execute(sql`SET autocommit = OFF`);
			const result = await transaction(tx);
			await tx.execute(sql`ROLLBACK`);
			return result;
		})
	);

export const transactTuple: {
	<const T extends number, const U extends Result<T>>(
		transaction: (tx: Transaction) => Promise<U>,
		lastResultIdx: T
	): Promise<U | Result<T, undefined, Error>>;
} = async <const T extends number, const U extends Result<T>>(
	transaction: (tx: Transaction) => Promise<U>,
	lastResultIdx: T = 0 as T
): Promise<U | Result<T, undefined, Error>> =>
	dontThrowTuple(
		() =>
			db.transaction(async (tx) => {
				await tx.execute(sql`SET autocommit = OFF`);
				const result = await transaction(tx);
				await tx.execute(sql`ROLLBACK`);
				return result;
			}),
		lastResultIdx
	);

export const commit = async (tx: Transaction) => await tx.execute(sql`COMMIT`);
