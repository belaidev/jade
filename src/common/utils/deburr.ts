import { deburr as lodashDeburr } from "lodash-es";

export const deburr = <const T extends string>(str?: T) => lodashDeburr(str?.normalize("NFKD"));
