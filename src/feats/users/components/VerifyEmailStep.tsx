import { useSubmit } from "@remix-run/react";
import { FunctionComponent, useRef } from "react";
import {
	Alert,
	AlertDescription,
	Button,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from "shadcn/components/ui";
import { useSignUpContext } from "./SignUpContext";
import { SIGN_UP_FIELDS_ACTIONS } from "./SignUpFields";

export const VerifyEmailStep: FunctionComponent = () => {
	const { setStep, emailAddress, otp, setOtp, submissionIssue } = useSignUpContext();
	const otpInput = useRef<HTMLInputElement>(null);
	const verifyEmailBtn = useRef<HTMLButtonElement>(null);
	const submit = useSubmit();

	const handleOtpFieldChange = (value: string) => {
		setOtp(value);
		if (value.length !== 6) return;
		submit(verifyEmailBtn.current);
	};

	return (
		<>
			{/* Summary */}
			<div>
				<h2 className="h2 font-head">{"Entrez votre code de vérification"}</h2>
				<p className="muted">
					{"Entrez le code de vérification que vous avez reçu à "}
					<b>{emailAddress}</b>
					{" pour vérifier votre address email."}
				</p>
			</div>

			{/* Email address field */}
			<input type="hidden" name="emailAddress" value={emailAddress} />

			{/* OTP field */}
			<div className="flex justify-center">
				<InputOTP
					ref={otpInput}
					minLength={6}
					maxLength={6}
					name="otp"
					value={otp}
					onChange={(value: string) => handleOtpFieldChange(value)}
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
			</div>

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
				{/* Verify email */}
				<button
					ref={verifyEmailBtn}
					className="hidden"
					type="submit"
					name="_action"
					value={SIGN_UP_FIELDS_ACTIONS.verifyEmail}
				/>

				{/* Resend OTP */}
				<Button type="submit" variant="ghost" name="_action" value={SIGN_UP_FIELDS_ACTIONS.sendOtp}>
					{"Renvoyer un code de vérification"}
				</Button>

				{/* Change email address */}
				<Button type="button" variant="ghost" onClick={() => setStep("sendOtp")}>
					{"Changer d'adresse email"}
				</Button>
			</div>
		</>
	);
};
