import { Tuple } from "./Tuple";

export type Result<T extends number, U = unknown, V = unknown> = readonly [...Tuple<T, U>, V];
