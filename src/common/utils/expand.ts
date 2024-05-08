import { classes } from "~/feats/synchronous-courses";

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type ExpandRecursively<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: ExpandRecursively<O[K]> }
		: never
	: T;

type ClassesTable = ExpandRecursively<typeof classes>;

type User = { name: string; dob: Date };
type UserExpanded = ExpandRecursively<User>;
