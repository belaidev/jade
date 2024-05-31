import { z } from "zod";
import { _emailAddress } from "./_emailAddress";
import { _password } from "./_password";

export type SignInDto = z.infer<typeof signInSchema>;

export const signInSchema = z.object({
	emailAddress: _emailAddress,
	password: _password,
	staySignedIn: z
		.enum(["on"])
		.optional()
		.transform((val) => val === "on")
});
