import { sql } from "drizzle-orm";
import { int, timestamp } from "drizzle-orm/mysql-core";

export const entityCols = {
	id: int("id", { unsigned: true }).primaryKey().autoincrement(),
	creationTime: timestamp("creationTime")
		.default(sql`CURRENT_TIMESTAMP()`)
		.notNull(),

	// TODO Configure Drizzle to recognize and update the `updateTime` attribute
	// correctly, as it is named differently from the default `updatedAt`
	updateTime: timestamp("updateTime")
		.default(sql`CURRENT_TIMESTAMP()`)
		.notNull()
		.$onUpdate(() => new Date())
};
