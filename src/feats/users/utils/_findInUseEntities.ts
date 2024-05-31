import { InferSelectModel, sql } from "drizzle-orm";
import { MySqlTable } from "drizzle-orm/mysql-core";
import { Transaction } from "~/common/utils/transact";

export const _findInUseEntities = async <T extends MySqlTable>({
	tx,
	table
}: {
	tx: Transaction;
	table: T;
}) => {
	const [inUseEntities] = (await tx.execute(sql`
		SELECT *
		FROM ${table} email
		JOIN (
				SELECT userId, MAX(creationTime) AS maxCreationTime
				FROM ${table}
				GROUP BY userId
		) AS inUseEmail ON email.userId = inUseEmail.userId AND email.creationTime = inUseEmail.maxCreationTime;
	`)) as unknown as [InferSelectModel<T>[]];
	return inUseEntities;
};
