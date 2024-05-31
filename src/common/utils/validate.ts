import { ZodError, ZodSchema, z } from "zod";
import { dontThrow } from "./dontThrow";

export const validateForm = async <const T extends ZodSchema, const U extends z.infer<T>>(
	schema: T,
	formData: FormData
) => {
	const entries = Object.fromEntries(formData);
	const dto = await dontThrow(() => schema.parse(entries));
	return dto instanceof ZodError
		? <const>[
				undefined,
				dto.issues.reduce((acc: Partial<Record<keyof U, string>>, issue) => {
					const [key] = issue.path as [keyof U];
					acc[key] = issue.message;
					return acc;
				}, {})
			]
		: <const>[dto as z.infer<T>, undefined];
};
