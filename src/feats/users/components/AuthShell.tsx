import { FunctionComponent, ReactNode } from "react";

export type AuthShellProps = {
	children: ReactNode;
};

export const AuthShell: FunctionComponent<AuthShellProps> = ({ children }) => {
	return (
		<main className="grid grow grid-cols-2">
			{/* Brand */}
			<div className="flex items-start bg-primary p-3 text-primary-foreground">
				<a className="flex items-center font-head text-xl font-light lowercase" href="/">
					<MdiLanguageRuby className="mr-2" /> {"Jade"}
				</a>
			</div>

			{/* Form */}
			<div className="flex items-center justify-center p-8">{children}</div>
		</main>
	);
};
