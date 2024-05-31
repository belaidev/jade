export type ObjToTuple<T extends object> = {
	[K in keyof T]: K;
}[keyof T];
