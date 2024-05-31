import { ActionFunction, MetaFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { RouteComponent } from "@remix-run/react/dist/routeModules";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { act, commit, maskStatusCode, validateForm } from "~/common/utils";
import { CreatePersonFieldsProps } from "~/feats/persons/components";
import { createPersonSchema } from "~/feats/persons/dtos";
import { createPerson } from "~/feats/persons/services";
import {
	SIGN_UP_FIELDS_ACTIONS,
	SignUpContextProps,
	SignUpContextProvider,
	SignUpFields,
	SignUpStep
} from "~/feats/users/components";
import { createAccountSchema, sendOtpSchema, verifyEmailSchema } from "~/feats/users/dtos";
import { createAccount, generateOtp, signIn, verifyEmail } from "~/feats/users/services";

export const action: ActionFunction = async (args) =>
	act(args, {
		[SIGN_UP_FIELDS_ACTIONS.sendOtp]: async (_, { tx, formData }) => {
			const [dto, createAccountIssues] = await validateForm(sendOtpSchema, formData);
			if (createAccountIssues) return json({ createAccountIssues }, StatusCodes.BAD_REQUEST);

			const [, status] = await generateOtp({ tx, ...dto });
			await commit(tx);
			return json({ step: "verifyEmail" }, { status: maskStatusCode(status, StatusCodes.OK) });
		},

		[SIGN_UP_FIELDS_ACTIONS.enterOtp]: async (_, { formData }) => {
			const [, createAccountIssues] = await validateForm(sendOtpSchema, formData);
			if (createAccountIssues) return json({ createAccountIssues }, StatusCodes.BAD_REQUEST);

			return json({ step: "verifyEmail" });
		},

		[SIGN_UP_FIELDS_ACTIONS.verifyEmail]: async (_, { tx, formData }) => {
			const [dto, createAccountIssues] = await validateForm(verifyEmailSchema, formData);
			if (createAccountIssues) return json({ createAccountIssues }, StatusCodes.BAD_REQUEST);

			const [, status] = await verifyEmail({ tx, ...dto });
			if (status !== StatusCodes.OK)
				return json(
					{ submissionIssue: "Code de vérification incorrect ou expiré. Veuillez réessayer." },
					maskStatusCode(status, StatusCodes.UNAUTHORIZED)
				);
			await commit(tx);
			return json({ step: "createAccount" });
		},

		[SIGN_UP_FIELDS_ACTIONS.createAccount]: async (_, { tx, formData }) => {
			const [createAccountDto, createAccountIssues] = await validateForm(
				createAccountSchema,
				formData
			);
			if (createAccountIssues) return json({ createAccountIssues }, StatusCodes.BAD_REQUEST);

			const [, status1] = await verifyEmail({ tx, ...createAccountDto });
			if (status1 !== StatusCodes.OK)
				return json(
					{ submissionIssue: "Code de vérification incorrect ou expiré. Veuillez réessayer." },
					maskStatusCode(status1, StatusCodes.UNAUTHORIZED)
				);

			const [userId, status2] = await createAccount({ tx, ...createAccountDto });
			if (status2 !== StatusCodes.CREATED)
				return json(
					{ submissionIssue: "Une erreur s'est produite. Veuillez réessayer." },
					{ status: maskStatusCode(status2, StatusCodes.INTERNAL_SERVER_ERROR) }
				);

			const [createPersonDto, createPersonIssues] = await validateForm(
				createPersonSchema,
				formData
			);
			if (createPersonIssues) return json({ createPersonIssues }, StatusCodes.BAD_REQUEST);

			const [, status3] = await createPerson({ tx, userId, ...createPersonDto });
			if (status3 !== StatusCodes.CREATED)
				return json(
					{ submissionIssue: "Une erreur s'est produite. Veuillez réessayer." },
					{ status: maskStatusCode(status3, StatusCodes.INTERNAL_SERVER_ERROR) }
				);

			const [cookie, status4] = await signIn({ tx, ...createAccountDto });
			if (status4 !== StatusCodes.CREATED)
				return json(
					{ submissionIssue: "Une erreur s'est produite. Veuillez réessayer." },
					{ status: maskStatusCode(status4, StatusCodes.INTERNAL_SERVER_ERROR) }
				);
			await commit(tx);
			return redirect("/", { headers: { "Set-Cookie": cookie } });
		}
	});

export const meta: MetaFunction = () => [{ title: "Inscription - Jade" }];

const Page: RouteComponent = () => {
	const data = useActionData<{
		step?: SignUpStep;
		createAccountIssues?: SignUpContextProps["issues"];
		submissionIssue?: string;
		createPersonIssues?: CreatePersonFieldsProps["issues"];
	}>();

	const [step, setStep] = useState<SignUpStep>("sendOtp");

	useEffect(() => {
		if (data?.step) setStep(data.step);
	}, [data]);

	return (
		<Form
			className="flex w-full max-w-96 flex-col gap-4"
			method="post"
			autoComplete="off"
			noValidate
		>
			<SignUpContextProvider
				step={step}
				setStep={setStep}
				issues={data?.createAccountIssues}
				submissionIssue={data?.submissionIssue}
				createPersonIssues={data?.createPersonIssues}
			>
				<SignUpFields />
			</SignUpContextProvider>
		</Form>
	);
};
export default Page;
