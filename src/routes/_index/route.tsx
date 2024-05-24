// routes/_index/route.tsx (IndexPage)
import { useLoaderData, json } from "@remix-run/react";
import { fetchThumbnailUrls } from '~/services/carousel-service.ts';
import { fetchPopularCourses } from "~/services/carousel-service.ts";
import Carousel from '~/components/carousel';
import PopularCard from "~/components/popular-card";
import "./style.css";
import type { PopularCourse } from '~/feats/asynchronous-courses/functions-said';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from "@fortawesome/free-solid-svg-icons";

interface LoaderData {
    images: string[];
    popularCourses: PopularCourse[];
}

export async function loader() {
    const rawImages = await fetchThumbnailUrls();
	const images = rawImages.slice(0, 10); // affichage limité à 10 cours en promotion
    const popularCourses = await fetchPopularCourses();
    return json<LoaderData>({ images, popularCourses });
}

export default function IndexPage() {
    const { images, popularCourses } = useLoaderData<LoaderData>();

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center w-full">
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

                <div className="popular-section w-full">
                    <h2 className="popular-title">Cours Populaires<FontAwesomeIcon icon={faFire} className="fire-icon" /></h2>
                    <p className="popular-description">Découvrez nos cours les plus populaires !</p>
                    <div className="popular-card-section">
                        {popularCourses.map((course) => (
                                <PopularCard key={course.id} {...course} />
                            ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

