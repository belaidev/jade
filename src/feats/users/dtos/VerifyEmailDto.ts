import { z } from "zod";
import { createAccountSchema } from "./CreateAccountDto";

export type VerifyEmailDto = z.infer<typeof verifyEmailSchema>;

export const verifyEmailSchema = createAccountSchema.pick({ emailAddress: true, otp: true });
