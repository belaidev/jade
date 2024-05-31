import { z } from "zod";
import { _emailAddress } from "./_emailAddress";
import { _password } from "./_password";

export type CreateAccountDto = z.infer<typeof createAccountSchema>;

export const createAccountSchema = z.object({
	emailAddress: _emailAddress,
	otp: z.string().regex(/^\d{6}$/),
	password: _password
});
