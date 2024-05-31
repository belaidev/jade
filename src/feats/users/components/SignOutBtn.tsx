import { Form } from "@remix-run/react";
import { FunctionComponent } from "react";

export type SignOutBtnProps = { route: string };

export const SIGN_OUT_FORM_ACTION = "signOut";

export const SignOutBtn: FunctionComponent<SignOutBtnProps> = ({ route }) => (
	<Form action={route} method="post">
		<button className="flex items-center gap-2" type="submit" name="_action" value="signOut">
			<MdiLogout /> {"Se déconnecter"}
		</button>
	</Form>
);
