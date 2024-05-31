import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PopularCard from "~/components/popular-card";
import { PopularCourse } from "~/services/courseData-service";
import { fetchSearchCourses } from "~/services/searchFormation";

interface LoaderData {
	searchResults: PopularCourse[];
}

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const keywords = url.searchParams.get("q") || "";

	const searchResults = await fetchSearchCourses(keywords);
	console.log("searchResults from loader", searchResults)
	return json<LoaderData>({ searchResults });
};

export default function SearchResults() {
	const loaderData = useLoaderData<LoaderData>();
	const searchResults = loaderData.searchResults;
	console.log("searchResults", searchResults)

	const isResultsArray = Array.isArray(searchResults);

	return (
		<div>
				<h1 className="text-center text-4xl font-bold my-8">Résultats de la recherche :</h1>
				<main>
						<div className="popular-card-section">
								{isResultsArray && searchResults.length > 0 ? (
										searchResults.map((course: PopularCourse) => (
												<PopularCard key={course.id} {...course} />
										))
								) : (
										<p className="text-center text-2xl my-4">Aucun résultat trouvé pour votre recherche.</p>
								)}
						</div>
				</main>
		</div>
	);
}
