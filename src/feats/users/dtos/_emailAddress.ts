import { z } from "zod";

export const _emailAddress = z
	.string()
	.email("Adresse email invalide")
	.max(254, "Adresse email invalide")
	.min(1, "Champ requis");
