import { ActionFunction, MetaFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { RouteComponent } from "@remix-run/react/dist/routeModules";
import { StatusCodes } from "http-status-codes";
import { act, commit, maskStatusCode, validateForm } from "~/common/utils";
import { SIGN_IN_FIELDS_ACTION, SignInFields, SignInFieldsProps } from "~/feats/users/components";
import { signInSchema } from "~/feats/users/dtos";
import { signIn } from "~/feats/users/services";

export const action: ActionFunction = async (args) =>
	act(args, {
		[SIGN_IN_FIELDS_ACTION]: async (_, { tx, formData }) => {
			const [dto, issues] = await validateForm(signInSchema, formData);
			if (issues) return json({ issues }, StatusCodes.BAD_REQUEST);

			const [cookie, status] = await signIn({ tx, ...dto });
			if (status !== StatusCodes.CREATED)
				return json(
					{ submissionIssue: "Identifiants incorrects. Veuillez réessayer." },
					{ status: maskStatusCode(status, StatusCodes.UNAUTHORIZED) }
				);
			await commit(tx);
			return redirect("/", { headers: { "Set-Cookie": cookie } });
		}
	});

export const meta: MetaFunction = () => [{ title: "Connection - Jade" }];

const Page: RouteComponent = () => {
	const { issues, submissionIssue } =
		useActionData<{ issues?: SignInFieldsProps["issues"]; submissionIssue?: string }>() ?? {};

	return (
		<Form
			className="flex w-full max-w-96 flex-col gap-4"
			method="post"
			autoComplete="off"
			noValidate
		>
			<SignInFields issues={issues} submissionIssue={submissionIssue} />
		</Form>
	);
};
export default Page;
