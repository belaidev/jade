// ATTRIBUTION https://github.com/ts-essentials/ts-essentials/blob/365612c0de7f32d203552861d8431986c0d291c4/lib/prettify/index.ts
export type Prettify<T> = {
	[K in keyof T]: T[K];
	// eslint-disable-next-line @typescript-eslint/ban-types
} & {};
