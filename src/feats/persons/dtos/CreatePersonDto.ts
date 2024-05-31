import { deburr } from "lodash-es";
import { z } from "zod";
import { Person } from "../schema";

export type CreatePersonDto = z.infer<typeof createPersonSchema>;

export const createPersonSchema = z.object({
	firstName: z
		.string()
		.refine((val) => deburr(val).match(/^[A-z].*[A-z]$/), "Doit commencer et finir par une lettre")
		.refine(
			(val) => val.match(/^(?!.*[-\s]{2,}).*$/),
			"Ne doit pas contenir de tirets et d'espaces consécutifs"
		)
		.refine(
			(val) => deburr(val).match(/^[A-z-\s]*$/),
			"Doit contenir que des lettres, des tirets et des espaces"
		)
		.refine((val) => val.length > 0, "Champ requis")
		.refine((val) => val.length <= 25, "Ne doit pas contenir plus de 25 caractères"),
	lastName: z
		.string()
		.transform((val) => val || undefined)
		.refine(
			(val) => !val || deburr(val).match(/^[A-z].*[A-z]$/),
			"Doit commencer et finir par une lettre"
		)
		.refine(
			(val) => !val || val.match(/^(?!.*[-\s]{2,}).*$/),
			"Ne doit pas contenir de tirets et d'espaces consécutifs"
		)
		.refine(
			(val) => !val || deburr(val).match(/^[A-z-\s]*$/),
			"Doit contenir que des lettres, des tirets et des espaces"
		)
		.refine((val) => !val || val.length <= 25, "Ne doit pas contenir plus de 25 caractères")
		.optional(),
	pronoun: z.enum((<const>["il", "elle"]) satisfies Person["pronoun"][], {
		message: "Champs requis"
	}),
	occupation: z.enum(
		(<const>[
			"professionnel",
			"étudiant",
			"entrepreneur",
			"hobbyist"
		]) satisfies Person["occupation"][],
		{ message: "Champs requis" }
	)
});
