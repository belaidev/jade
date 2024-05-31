export type Tuple<T, U = unknown, V extends readonly U[] = []> = V["length"] extends T
	? V
	: Tuple<T, U, readonly [...V, U]>;

export type TupleHead<T extends readonly unknown[]> = T extends readonly [...infer Head, unknown]
	? Head
	: readonly unknown[];

export type TupleToObj<T extends readonly (string | number | symbol)[]> = {
	[K in T[number]]: K;
};
