import { FunctionComponent, ReactNode, createContext, useContext, useState } from "react";
import { ObjToTuple } from "~/common/types";
import { CreatePersonDto } from "~/feats/persons/dtos";
import { CreateAccountDto } from "../dtos";
import { SIGN_UP_FIELDS_ACTIONS } from "./SignUpFields";

export type SignUpStep = ObjToTuple<Omit<typeof SIGN_UP_FIELDS_ACTIONS, "enterOtp">>;

// export type Pronoun = "il" | "elle";

// export type Occupation = "professionnel" | "étudiant" | "entrepreneur" | "hobbyist";

export type SignUpContextProps = {
	step: SignUpStep;
	setStep: (value: SignUpStep) => void;
	emailAddress: string;
	setEmailAddress: (value: string) => void;
	otp: string;
	setOtp: (value: string) => void;
	password: string;
	setPassword: (value: string) => void;
	// firstName: string;
	// setFirstName: (value: string) => void;
	// lastName: string;
	// setLastName: (value: string) => void;
	// pronoun?: Pronoun;
	// setPronoun: (value: Pronoun) => void;
	// occupation?: Occupation;
	// setOccupation: (value: Occupation) => void;
	issues: Partial<Record<keyof CreateAccountDto, string>> | undefined;
	submissionIssue: string | undefined;

	// HACK Importing from other features breaks low coupling principle, figure out a more elegant solution
	createPersonIssues: Partial<Record<keyof CreatePersonDto, string>> | undefined;
};

const SignUpContext = createContext<SignUpContextProps | undefined>(undefined);

export const useSignUpContext = () => {
	const signUpContext = useContext(SignUpContext);
	if (!signUpContext) throw new Error("`SignUpContext` current value is undefined");
	return signUpContext;
};

export type SignUpContextProviderProps = {
	step: SignUpStep;
	setStep: (value: SignUpStep) => void;
	issues: Partial<Record<keyof CreateAccountDto, string>> | undefined;
	submissionIssue: string | undefined;
	children: ReactNode;

	// HACK Importing from other features breaks low coupling principle, figure out a more elegant solution
	createPersonIssues: Partial<Record<keyof CreatePersonDto, string>> | undefined;
};

export const SignUpContextProvider: FunctionComponent<SignUpContextProviderProps> = (props) => {
	const [emailAddress, setEmailAddress] = useState("");
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");
	// const [firstName, setFirstName] = useState("");
	// const [lastName, setLastName] = useState("");
	// const [pronoun, setPronoun] = useState<Pronoun>();
	// const [occupation, setOccupation] = useState<Occupation>();

	return (
		<SignUpContext.Provider
			value={{
				emailAddress,
				setEmailAddress,
				otp,
				setOtp,
				password,
				setPassword,

				// firstName,
				// setFirstName,
				// lastName,
				// setLastName,
				// pronoun,
				// setPronoun,
				// occupation,
				// setOccupation,
				...props
			}}
		>
			{props.children}
		</SignUpContext.Provider>
	);
};
