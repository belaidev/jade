import { int, mysqlTable, unique, varchar } from "drizzle-orm/mysql-core";
import { entityCols } from "~/common/models";

export const users = mysqlTable("Users", {
	...entityCols
});

export const emailAccounts = mysqlTable("EmailAccounts", {
	...entityCols,
	userId: int("userId", { unsigned: true })
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	address: varchar("address", { length: 254 }).notNull()
});

export const passwords = mysqlTable(
	"Passwords",
	{
		...entityCols,
		userId: int("userId", { unsigned: true })
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		hash: varchar("hash", { length: 100 }).notNull()
	},
	(password) => ({
		unique: unique().on(password.id, password.userId, password.hash)
	})
);

export const sessions = mysqlTable("Accounts", {
	...entityCols,
	userId: int("userId", { unsigned: true })
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	signInAttempts: int("signInAttempts").default(0).notNull()
});
