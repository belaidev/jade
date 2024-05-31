import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { RouteComponent } from "@remix-run/react/dist/routeModules";
import { CartProvider, useCart } from "~/contexts/CartContext";
// @ts-expect-error ...
import stylesheet from "~/root.css?url";

export const links: LinksFunction = () => [
	{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
	{ rel: "stylesheet", href: stylesheet }
];

export const meta: MetaFunction = () => [{ title: "jade" }];

const CartIcon = () => {
	const { cart } = useCart();
	return (
		<a className="flex items-center p-2 font-medium" href="/panier">
			{cart.length}&nbsp;
			<MdiCartOutline />
		</a>
	);
};

export const Route: RouteComponent = () => {
	return (
		<CartProvider>
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
						{/* Route */}
						<Outlet />
					</div>

					{/* Miscellaneous */}
					<ScrollRestoration />
					<Scripts />
				</body>
			</html>
		</CartProvider>
	);
};
export default Route;
