import { FunctionComponent, useEffect } from "react";
import { Alert, AlertDescription, Button, Input, Label } from "shadcn/components/ui";
import { useSignUpContext } from "./SignUpContext";
import { SIGN_UP_FIELDS_ACTIONS } from "./SignUpFields";

export const SendOtpStep: FunctionComponent = () => {
	const { emailAddress, setEmailAddress, setOtp, issues, submissionIssue } = useSignUpContext();

	useEffect(() => setOtp(""));

	return (
		<>
			{/* Summary */}
			<div>
				<h2 className="h2 font-head">{"Prêt à apprendre ?"}</h2>
				<p className="muted">
					{"Entrez votre adresse email pour envoyer un code de vérification. "}
					<b>{"Le code expirera après 5 minutes."}</b>
				</p>
			</div>

			{/* Email address field */}
			<Label className="flex flex-col gap-2">
				<Input
					placeholder="mikehunt@collegemv.qc.ca"
					type="email"
					name="emailAddress"
					value={emailAddress}
					onChange={(e) => setEmailAddress(e.currentTarget.value)}
				/>
				<p className="small muted leading-tight text-red-500">{issues?.emailAddress}</p>
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
				{/* Send OTP */}
				<Button type="submit" name="_action" value={SIGN_UP_FIELDS_ACTIONS.sendOtp}>
					{"Envoyer un code"}
				</Button>

				{/* Next step */}
				<Button
					type="submit"
					variant="ghost"
					name="_action"
					value={SIGN_UP_FIELDS_ACTIONS.enterOtp}
				>
					{"J'ai un code"}
				</Button>

				{/* Disclaimer */}
				<p className="small muted leading-tight">
					{"En continuant, vous acceptez nos "}
					<a className="border-b border-zinc-500" href="/">
						{"conditions d'utilisation "}
					</a>
					{"et notre "}
					<a className="border-b border-zinc-500" href="/">
						{"politique de confidentialité"}
					</a>
					{"."}
				</p>
			</div>
		</>
	);
};
