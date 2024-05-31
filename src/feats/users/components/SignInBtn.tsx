import { FunctionComponent } from "react";
import { Button } from "shadcn/components/ui/button";

export type SignInBtnProps = { route: string };

export const SignInBtn: FunctionComponent<SignInBtnProps> = ({ route }) => (
	<Button variant="outline" asChild>
		<a href={route}>
			<MdiLogin className="mr-2" /> {"Se connecter"}
		</a>
	</Button>
);
