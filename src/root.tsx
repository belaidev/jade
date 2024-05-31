import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { LayoutComponent } from "@remix-run/react/dist/routeModules";
import { ReactNode } from "react";
import { CartProvider, useCart } from '~/contexts/CartContext';
// @ts-expect-error ...
import stylesheet from "~/root.css?url";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "stylesheet", href: stylesheet }
];

export const meta: MetaFunction = () => [{ title: "jade" }];

const App = () => <Outlet />;
export default App;

const CartIcon = () => {
  const { cart } = useCart();
  return (
    <a className="flex items-center p-2 font-medium" href="/panier">
      {cart.length}&nbsp;
      <MdiCartOutline />
    </a>
  );
};

export const Layout: LayoutComponent = ({ children }: { children: ReactNode }) => {
  return (
    <CartProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="flex h-dvh w-dvw flex-col">
          <div className="contents">
            <header className="bg-primary-1 px-4 py-2 font-display text-on-primary-1">
              <nav className="flex items-center justify-between">
                <div>
                  <a className="flex items-center font-head text-xl font-light lowercase" href="/">
                    <MdiLanguageRuby />
                    &nbsp;Jade
                  </a>
                </div>
                <ul className="flex gap-2">
                  <li>
                    <a className="flex items-center p-2 font-medium" href="/listCours">
                      Formation list
                    </a>
                  </li>
                  <li>
                    <CartIcon />
                  </li>
                  <li>
                    <a className="flex items-center p-2 font-medium" href="/sidentifier">
                      <MdiLogin />
                      &nbsp;{"S'identifier"}
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center rounded-full bg-primary-2 px-4 py-2 font-medium text-on-primary-2"
                      href="/sinscrire"
                    >
                      <MdiAccountPlusOutline />
                      &nbsp;{"S'inscrire"}
                    </a>
                  </li>
                </ul>
              </nav>
            </header>
            {children}
          </div>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </CartProvider>
  );
};
