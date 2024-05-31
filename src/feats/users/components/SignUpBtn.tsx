import { FunctionComponent } from "react";
import { Button } from "shadcn/components/ui/button";

export type SignUpBtnProps = { route: string };

export const SignUpBtn: FunctionComponent<SignUpBtnProps> = ({ route }) => (
	<Button asChild>
		<a href={route}>
			<MdiAccountPlus className="mr-2" /> {"S'inscrire"}
		</a>
	</Button>
);
