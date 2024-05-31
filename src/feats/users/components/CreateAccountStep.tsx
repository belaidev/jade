import { FunctionComponent } from "react";
import { Alert, AlertDescription, Button, Input, Label } from "shadcn/components/ui";
import { CreatePersonFields } from "~/feats/persons/components";
import { useSignUpContext } from "./SignUpContext";
import { SIGN_UP_FIELDS_ACTIONS } from "./SignUpFields";

export const CreateAccountStep: FunctionComponent = () => {
	const {
		setStep,
		emailAddress,
		otp,
		password,
		setPassword,
		issues,
		submissionIssue,
		createPersonIssues
	} = useSignUpContext();

	return (
		<>
			{/* Summary */}
			<h2 className="h2 font-head">{"Complétez votre inscription"}</h2>

			{/* Email address field */}
			<input type="hidden" name="emailAddress" value={emailAddress} />

			{/* OTP field */}
			<input type="hidden" name="otp" value={otp} />

			{/* Password field */}
			<Label className="flex flex-col gap-2">
				{"Mot de passe"}
				<Input
					placeholder={"•".repeat(8)}
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>
				<p className="small muted leading-tight text-red-500">{issues?.password}</p>
				<p className="small muted leading-tight">
					{"Doit contenir au moins 8 caractères, dont au moins un chiffre et une lettre"}
				</p>
			</Label>

			{/* HACK Importing from other features breaks low coupling principle, figure out a more elegant solution */}
			<CreatePersonFields issues={createPersonIssues} />

			{/* Submission issue */}
			{submissionIssue && (
				<Alert variant="destructive">
					<div className="flex items-center gap-2 font-medium">
						<MdiAlertCircle />
						<AlertDescription>{submissionIssue}</AlertDescription>
					</div>
				</Alert>
			)}

			<div className="flex flex-col gap-2">
				{/* Create account */}
				<Button type="submit" name="_action" value={SIGN_UP_FIELDS_ACTIONS.createAccount}>
					{"Créer mon compte"}
				</Button>

				{/* Change email address */}
				<Button type="button" variant="ghost" onClick={() => setStep("sendOtp")}>
					{"Changer d'adresse email"}
				</Button>
			</div>
		</>
	);
};
