import { FunctionComponent, useState } from "react";
import { Button, Checkbox, Input, Label } from "shadcn/components/ui";
import { Alert, AlertDescription } from "shadcn/components/ui/alert";
import { SignInDto } from "../dtos";

export type SignInFieldsProps = {
	issues: Partial<Record<keyof SignInDto, string>> | undefined;
	submissionIssue: string | undefined;
};

export const SIGN_IN_FIELDS_ACTION = "signIn";

export const SignInFields: FunctionComponent<SignInFieldsProps> = ({ issues, submissionIssue }) => {
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			{/* Summary */}
			<div>
				<h2 className="h2 font-head">{"Prêt à apprendre ?"}</h2>
				<p className="muted">
					{"Entrez votre adresse email et votre mot de passe pour vous connecter."}
				</p>
			</div>

			{/* Email address field */}
			<Label className="flex flex-col gap-2">
				{"Adresse email"}
				<Input
					placeholder="mikehunt@collegemv.qc.ca"
					type="email"
					name="emailAddress"
					value={emailAddress}
					onChange={(e) => setEmailAddress(e.currentTarget.value)}
				/>
				<p className="small muted leading-tight text-red-500">{issues?.emailAddress}</p>
			</Label>

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
			</Label>

			<Label className="flex gap-2">
				<Checkbox name="staySignedIn" />
				<div className="flex flex-col gap-2">
					{"Rester connecté"}
					<p className="small muted leading-tight">
						{"Recommandé sur les appareils de confiance."}
					</p>
				</div>
			</Label>

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
				{/* Sign in */}
				<Button type="submit" name="_action" value={SIGN_IN_FIELDS_ACTION}>
					{"Se connecter"}
				</Button>

				{/* Reset password */}
				<Button type="button" variant="ghost">
					{"J'ai perdu mon mot de passe"}
				</Button>
			</div>
		</>
	);
};
