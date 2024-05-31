import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { StatusCodes } from "http-status-codes";
import { commit, transact } from "~/common/utils";
import { AuthShell } from "~/feats/users/components";
import { authenticate } from "~/feats/users/services";

export const loader: LoaderFunction = async ({ request }) =>
	await transact(async (tx) => {
		const cookie = request.headers.get("Cookie");
		if (!cookie) return json({});

		const [, status] = await authenticate({ tx, cookie });
		if (status !== StatusCodes.OK) return json({}, { status });

		commit(tx);
		return redirect("/");
	});

const Page = () => {
	return (
		<AuthShell>
			{/* Route */}
			<Outlet />
		</AuthShell>
	);
};
export default Page;
