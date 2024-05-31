import { deburr } from "lodash-es";
import { z } from "zod";

export const _password = z
	.string()
	.refine((val) => deburr(val).match(/^(?=.*[A-z]).+$/), "Doit contenir au moins une lettre")
	.refine((val) => deburr(val).match(/^(?=.*\d).+$/), "Doit contenir au moins un chiffre")
	.refine((val) => val.length >= 8, "Doit contenir au moins 8 caractères");
