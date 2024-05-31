import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { LayoutComponent } from "@remix-run/react/dist/routeModules";
import { ReactNode } from "react";
// @ts-expect-error ...
import stylesheet from "~/root.css?url";

export const links: LinksFunction = () => [
	{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
	{ rel: "stylesheet", href: stylesheet }
];

export const meta: MetaFunction = () => [{ title: "jade" }];

const App = () => <Outlet />;
export default App;

export const Layout: LayoutComponent = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en">
			{/* Head */}
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>

			{/* Body */}
			<body className="flex h-dvh w-dvw flex-col">
				<div className="contents">
					{/* Header */}
					<header className="bg-primary-1 px-4 py-2 font-display text-on-primary-1">
						<nav className="flex items-center justify-between">
							{/* Brand */}
							<div>
								<a className="flex items-center font-head text-xl font-light lowercase" href="/">
									<MdiLanguageRuby />
									&nbsp;Jade
								</a>
							</div>

							{/* Navigation links */}
							<ul className="flex gap-2">
								{/* Formation page*/}
								<li>
									<a className="flex items-center p-2 font-medium" href="/listCours">
										Formation list
									</a>
								</li>

								<li>
									<a className="flex items-center p-2 font-medium" href="/panier">
										0&nbsp;
										<MdiCartOutline />
									</a>
								</li>

								{/* Sign in */}
								<li>
									<a className="flex items-center p-2 font-medium" href="/connection">
										<MdiLogin />
										&nbsp;{"S'identifier"}
									</a>
								</li>

								{/* Sign up */}
								<li>
									<a
										className="flex items-center rounded-full bg-primary-2 px-4 py-2 font-medium text-on-primary-2"
										href="/inscription"
									>
										<MdiAccountPlusOutline />
										&nbsp;{"S'inscrire"}
									</a>
								</li>
							</ul>
						</nav>
					</header>

					{/* Route content */}
					{children}
				</div>

				{/* Miscellaneous */}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
};
