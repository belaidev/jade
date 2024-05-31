import { LoaderFunction } from "@remix-run/node";
import { Outlet, json, useLoaderData, useLocation } from "@remix-run/react";
import { RouteComponent } from "@remix-run/react/dist/routeModules";
import { StatusCodes } from "http-status-codes";
import { Button } from "shadcn/components/ui/button";
import { commit, transact } from "~/common/utils";
import { Person } from "~/feats/persons/schema";
import { findPersonById } from "~/feats/persons/services";
import { SignInBtn, SignOutBtn, SignUpBtn } from "~/feats/users/components";
import { authenticate } from "~/feats/users/services";

export const loader: LoaderFunction = async ({ request }) =>
	await transact(async (tx) => {
		const cookie = request.headers.get("Cookie");
		if (!cookie) return json({});

		const [session, status1] = await authenticate({ tx, cookie });
		if (status1 !== StatusCodes.OK) return json({}, { status: status1 });

		const [person, status2] = await findPersonById({ tx, id: session.userId });
		if (status2 !== StatusCodes.OK) return json({}, { status: status2 });

		commit(tx);
		return json({ person });
	});

export const Route: RouteComponent = () => {
	const { person } = useLoaderData<{ person: Person }>();
	const location = useLocation();

	return (
		<>
			{/* Header */}
			<header className="sticky top-0 z-50 border-b bg-white px-3 font-display">
				<nav className="flex items-center justify-between">
					{/* Brand */}
					<div className="py-3">
						<a
							className="flex items-center font-head text-xl font-light lowercase text-primary"
							href="/"
						>
							<MdiLanguageRuby className="mr-2" /> Jade
						</a>
					</div>

					<ul className="flex gap-2">
						{/* Sign in */}
						{!person && location.pathname !== "/connection" && (
							<li>
								<SignInBtn route="/connection" />
							</li>
						)}

						{/* Sign out */}
						{person && (
							<li>
								<SignOutBtn route="/?index" />
							</li>
						)}

						{/* Sign up */}
						{!person && location.pathname !== "/inscription" && (
							<li>
								<Button asChild>
									<SignUpBtn route="/inscription" />
								</Button>
							</li>
						)}
					</ul>
				</nav>
			</header>

			{/* Route */}
			<Outlet />
		</>
	);
};
export default Route;
