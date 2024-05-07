import { getAllCours, Course } from "~/feats/courses/functions";
import { json } from "@remix-run/react";
import Card from "~/feats/courses/component";
import { useLoaderData } from "@remix-run/react";

interface LoaderData {
	courses: Course[];
}

export async function loader() {
	const courses  = await getAllCours();
	return json<LoaderData>({ courses });
}

export default function Courses() {
	const { courses } = useLoaderData<LoaderData>(); // Spécifier le type de données chargées

	return (
			<div>
					{courses.map((course: Course) => (
							Card(course)
					))}
			</div>
	);
}
