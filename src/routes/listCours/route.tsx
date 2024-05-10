import { json, useLoaderData } from "@remix-run/react";
import Card from "~/feats/courses/component";
import { Course, getAllCours } from "~/feats/courses/functions";

interface LoaderData {
	courses: Course[];
}

export async function loader() {
	const courses = await getAllCours();
	return json<LoaderData>({ courses });
}

export default function Courses() {
	const { courses } = useLoaderData<LoaderData>(); // Spécifier le type de données chargées

	return (
		<div>
			{courses.map((course: Course) => (
				<Card key={course.id} {...course} />
			))}
		</div>
	);
}
