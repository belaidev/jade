import { InferSelectModel, sql } from "drizzle-orm";
import { int, mysqlTable, unique, varchar } from "drizzle-orm/mysql-core";

export type User = InferSelectModel<UsersTable>;

export type UsersTable = typeof usersTable;

export const usersTable = mysqlTable("Users", {
	id: int("id", { unsigned: true }).primaryKey().autoincrement(),
	creationTime: int("creationTime", { unsigned: true })
		.default(sql`UNIX_TIMESTAMP()`)
		.notNull(),
	updateTime: int("updateTime", { unsigned: true })
		.default(sql`UNIX_TIMESTAMP()`)
		.notNull()
		.$onUpdate(() => Date.now())
});

export type Email = InferSelectModel<EmailTable>;

export type EmailTable = typeof emailsTable;

export const emailsTable = mysqlTable("Emails", {
	id: int("id", { unsigned: true }).primaryKey().autoincrement(),
	userId: int("userId", { unsigned: true })
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull(),
	address: varchar("address", { length: 254 }).notNull(),
	creationTime: int("creationTime", { unsigned: true })
		.default(sql`UNIX_TIMESTAMP()`)
		.notNull()
});

export type Otp = InferSelectModel<OtpsTable>;

export type OtpsTable = typeof otpsTable;

export const otpsTable = mysqlTable("Otps", {
	id: int("id", { unsigned: true }).primaryKey().autoincrement(),
	email: varchar("email", { length: 254 }).notNull(),
	code: varchar("code", { length: 6 }).notNull(),
	creationTime: int("creationTime", { unsigned: true })
		.default(sql`UNIX_TIMESTAMP()`)
		.notNull()
});

export type Password = InferSelectModel<PasswordsTable>;

export type PasswordsTable = typeof passwordsTable;

export const passwordsTable = mysqlTable(
	"Passwords",
	{
		id: int("id", { unsigned: true }).primaryKey().autoincrement(),
		userId: int("userId", { unsigned: true })
			.references(() => usersTable.id, { onDelete: "cascade" })
			.notNull(),
		hash: varchar("hash", { length: 100 }).notNull(),
		creationTime: int("creationTime", { unsigned: true })
			.default(sql`UNIX_TIMESTAMP()`)
			.notNull()
	},
	(password) => ({
		unique: unique().on(password.userId, password.hash)
	})
);

export type Session = typeof sessionsTable.$inferSelect;

export type SessionsTable = typeof sessionsTable;

export const sessionsTable = mysqlTable("Sessions", {
	id: int("id", { unsigned: true }).primaryKey().autoincrement(),
	userId: int("userId", { unsigned: true })
		.references(() => usersTable.id, { onDelete: "cascade" })
		.notNull(),
	creationTime: int("creationTime", { unsigned: true })
		.default(sql`UNIX_TIMESTAMP()`)
		.notNull()
});