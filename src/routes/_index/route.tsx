import { RouteComponent } from "@remix-run/react/dist/routeModules";
import Carousel from '~/components/carousel';
import "./style.css";
import React, { useEffect, useState } from 'react';
import { fetchThumbnailUrls } from '~/routes/_index/index-service';

const IndexPage : RouteComponent = ()  => {
	/*
	const defaultImageUrl: string = '/img/img-default.jpg';
	let images: string[] = [
		'/img/img-default.jpg',
		'/img/img-001.jpg',
		'/img/img-002.jpg',
		'/img/img-003.jpg'
	];*/
	const [images, setImages] = useState<string[]>([]);

    const getThumbnailUrls = async () => {
        try {
            const result = await fetchThumbnailUrls();
            setImages(result);
        } catch (error) {
            console.error("Error fetching thumbnail URLs:", error);
        }
    };

    useEffect(() => {
        getThumbnailUrls();
    }, []);

	return (
		<main className="flex flex-col items-center justify-center">
			<div className="flex flex-col items-center">
				<div className="font-head text-5xl lowercase mb-4">
				Bienvenue sur <span className="font-thin text-primary-1">jade</span>
				</div>
				<div className="carousel-section">
					<Carousel images={images} />
				</div>
				<a href="/test">Aller à la page de test</a>
			</div>
			
		</main>
	);

	const root = ReactDOM.createRoot(
		document.getElementById('root')
	  );
	  root.render(element);
};


export default IndexPage;
