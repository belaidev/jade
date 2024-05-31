import { Form } from "@remix-run/react";
import { FunctionComponent } from "react";
import { Button } from "shadcn/components/ui";

export type SignOutBtnProps = { route: string };

export const SIGN_OUT_FORM_ACTION = "signOut";

export const SignOutBtn: FunctionComponent<SignOutBtnProps> = ({ route }) => (
	<Form action={route} method="post">
		<Button
			variant="outline"
			className="flex items-center gap-2"
			type="submit"
			name="_action"
			value="signOut"
		>
			<MdiLogout /> {"Se déconnecter"}
		</Button>
	</Form>
);
