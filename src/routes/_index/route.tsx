import { RouteComponent } from "@remix-run/react/dist/routeModules";
import Carousel from '~/components/carousel';
import "./style.css";

const images = [
	'https://via.placeholder.com/800x400/ff5733/fff',
	'https://via.placeholder.com/800x400/33ff57/fff',
	'https://via.placeholder.com/800x400/5733ff/fff',
  ];

const Page: RouteComponent = () => {
	return (
		<main className="flex flex-col items-center justify-center">
			<div className="flex flex-col items-center">
				<div className="font-head text-5xl lowercase mb-4">
				Bienvenue sur <span className="font-thin text-primary-1">jade</span>
				</div>
				<div className="carousel-section">
				<Carousel images={images} />
				</div>
			</div>
		</main>
	);
};
export default Page;
