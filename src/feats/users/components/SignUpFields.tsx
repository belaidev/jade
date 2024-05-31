import { FunctionComponent, ReactElement } from "react";
import { CreateAccountStep } from "./CreateAccountStep";
import { SendOtpStep } from "./SendOtpStep";
import { SignUpStep, useSignUpContext } from "./SignUpContext";
import { VerifyEmailStep } from "./VerifyEmailStep";

export const SIGN_UP_FIELDS_ACTIONS = {
	sendOtp: "sendOtp",
	enterOtp: "enterOtp",
	verifyEmail: "verifyEmail",
	createAccount: "createAccount"
} as const;

export const SignUpFields: FunctionComponent = () => {
	const { step } = useSignUpContext();

	return (
		{
			sendOtp: <SendOtpStep />,
			verifyEmail: <VerifyEmailStep />,
			createAccount: <CreateAccountStep />
		} satisfies Record<SignUpStep, ReactElement>
	)[step];
};
