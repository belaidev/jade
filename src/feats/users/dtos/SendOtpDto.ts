import { z } from "zod";
import { createAccountSchema } from "./CreateAccountDto";

export type SendOtpDto = z.infer<typeof sendOtpSchema>;

export const sendOtpSchema = createAccountSchema.pick({ emailAddress: true });
