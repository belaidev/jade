import { ActionFunction } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { StatusCodes } from "http-status-codes";
import { act, maskStatusCode } from "~/common/utils";
import Carousel from "~/components/carousel";
import PopularCard from "~/components/popular-card";
import { SIGN_OUT_FORM_ACTION } from "~/feats/users/components";
import { signOut } from "~/feats/users/services";
import { fetchDiscountThumbnailUrls } from "~/services/carousel-service.ts";
import type { PopularCourse } from "~/services/courseData-service";
import { fetchPopularCourses } from "~/services/fetchPopularCourses-service";
import "./style.css";

interface LoaderData {
	images: string[];
	popularCourses: PopularCourse[];
}

export async function loader() {
	const rawImages = await fetchDiscountThumbnailUrls();
	const images = rawImages.slice(0, 10); // affichage limité à 10 cours en promotion
	const popularCourses = await fetchPopularCourses();
	return json<LoaderData>({ images, popularCourses });
}

export const action: ActionFunction = async (args) =>
	act(args, {
		[SIGN_OUT_FORM_ACTION]: async ({ request }, { tx }) => {
			const cookie = request.headers.get("Cookie");
			if (!cookie) return json({});

			const [newCookie, status] = await signOut({ tx, cookie });

			if (status !== StatusCodes.OK)
				return json({}, { status: maskStatusCode(status, StatusCodes.BAD_REQUEST) });
			return redirect("/", { headers: { "Set-Cookie": newCookie } });
		}
	});

export default function IndexPage() {
	const { images, popularCourses } = useLoaderData<LoaderData>();

	return (
		<main className="flex flex-col items-center justify-center">
			<div className="flex w-full flex-col items-center">
				<div className="mb-4 font-head text-5xl lowercase">
					<p className="welcome-text">
						Bienvenue sur <span className="font-thin text-primary">jade</span>
					</p>
				</div>

				<div className="promotion-section">
					<h2 className="promotion-title">Cours en Promotion</h2>
					<p className="promotion-description">
						Découvrez nos cours en promotion et profitez des offres spéciales !
					</p>
					<div className="carousel-section">
						<Carousel images={images} />
					</div>
					<a href="/discount-courses" className="promotion-link">
						Voir toutes les promotions
					</a>
				</div>

				<div className="popular-section w-full">
					<h2 className="popular-title">
						Cours Populaires
						<MdiFlame className="fire-icon" />
					</h2>
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
