import { RouteComponent } from "@remix-run/react/dist/routeModules";
import Carousel from '~/components/carousel';
import "./style.css";
import { getThumbnailUrlsOfCoursesWithDiscount } from "~/feats/asynchronous-courses/services-test";

const Page: RouteComponent = () => {
	const defaultImageUrl: string = '/img/img-default.jpg';
	let images: string[] = [];

	async function fetchImages() {
		images = await getThumbnailUrlsOfCoursesWithDiscount();
	}

	console.log('contenu de la var images: ', images);

	return (
		<main className="flex flex-col items-center justify-center">
			<div className="flex flex-col items-center">
				<div className="font-head text-5xl lowercase mb-4">
				Bienvenue sur <span className="font-thin text-primary-1">jade</span>
				</div>
				<div className="carousel-section">
					<Carousel images={images} />
				</div>
				<div className="affichage-section">
                    Contenu de la variable images : {images.join(", ")}
                </div>
			</div>
		</main>
	);
};
export default Page;
