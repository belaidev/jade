import { RouteComponent } from "@remix-run/react/dist/routeModules";

const Page: RouteComponent = () => {
	return (
		<main className="flex grow items-center justify-center">
			<div className="font-head text-5xl lowercase">
				Bienvenue sur <span className="font-thin text-primary-1">jade</span>
			</div>
		</main>
	);
};
export default Page;
