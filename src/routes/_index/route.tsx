// routes/_index/route.tsx (IndexPage)
import { useLoaderData, json } from "@remix-run/react";
import { fetchThumbnailUrls } from '~/services/carousel-service.ts';
import Carousel from '~/components/carousel';
import "./style.css";

interface LoaderData {
    images: string[];
}

export async function loader() {
    const rawImages = await fetchThumbnailUrls();
	const images = rawImages.slice(0, 10); // affichage limité à 10 cours en promotion
    return json<LoaderData>({ images });
}

export default function IndexPage() {
    const { images } = useLoaderData<LoaderData>();

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="font-head text-5xl lowercase mb-4">
                    <p className="welcome-text">Bienvenue sur <span className="font-thin text-primary-1">jade</span></p>
                </div>
                
				<div className="promotion-section">
                    <h2 className="promotion-title">Cours en Promotion</h2>
                    <p className="promotion-description">Découvrez nos cours en promotion et profitez des offres spéciales !</p>
					<div className="carousel-section">
                    <Carousel images={images} />
                	</div>
                    <a href="#" className="promotion-link">Voir toutes les promotions</a>
                </div>
            </div>
        </main>
    );
}

