import { ActionFunctionArgs, TypedResponse, json } from "@remix-run/node";
import { StatusCodes } from "http-status-codes";
import { errInstanceToStatusCode } from "./errInstanceToStatusCode";
import { Transaction, transact } from "./transact";

export const act = async (
	args: ActionFunctionArgs,
	actions: Record<
		string,
		(
			args: ActionFunctionArgs,
			extraArgs: { formData: FormData; tx: Transaction }
		) => TypedResponse<unknown> | Error | Promise<TypedResponse<unknown> | Error>
	>
) => {
	const formData = await args.request.formData();
	const action = String(formData.get("_action")) as keyof typeof actions;
	if (!(action in actions)) return json({}, { status: StatusCodes.BAD_REQUEST });

	const response = await transact(async (tx) => actions[action]!(args, { tx, formData }));
	if (response instanceof Error)
		return json(
			{ submissionIssue: "Une erreur s'est produite. Veuillez réessayer." },
			{ status: errInstanceToStatusCode(response) }
		);
	return response;
};
