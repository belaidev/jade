import { useLoaderData, json } from "@remix-run/react";
import { fetchThumbnailUrls } from '~/routes/_index/index-service';
import Carousel from '~/components/carousel';
import "./style.css";

interface LoaderData {
    images: string[];
}

export async function loader() {
    const images = await fetchThumbnailUrls();
    return json<LoaderData>({ images });
}

export default function IndexPage() {
    const { images } = useLoaderData<LoaderData>();

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
}

