import { useLoaderData, json } from "@remix-run/react";
import PopularCard from "~/components/popular-card";
import { PopularCourse } from "~/services/courseData-service";
import { fetchDiscountCourses } from "~/services/discountCourses-service";

interface LoaderData {
	discountCourses: PopularCourse[];
}

export async function loader() {
	const discountCourses = await fetchDiscountCourses();
	return json<LoaderData>({ discountCourses });
}

export default function discountCourses() {
	const { discountCourses } = useLoaderData<LoaderData>();

	return (
		<main>
			<div className="popular-card-section">
				{discountCourses.map((course) => (
					<PopularCard key={course.id} {...course} />
				))}
			</div>
		</main>
	);
}
