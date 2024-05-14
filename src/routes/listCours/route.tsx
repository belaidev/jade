import { json, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Course, getAllCours } from "~/feats/courses/functions";
import Card from "~/routes/listCours/component";

interface LoaderData {
	courses: Course[];
}

export async function loader() {
	const courses = await getAllCours();
	return json<LoaderData>({ courses });
}

export default function Courses() {
	console.log("page montée");
	const { courses } = useLoaderData<LoaderData>();
	const [sortBy, setSortBy] = useState<string>("");
	const [sortedCourses, setSortedCourses] = useState<Course[]>([]);

	useEffect(() => {
		// Fonction de tri des cours
		const sortCourses = (sortBy: string, courses: Course[]) => {
			switch (sortBy) {
				case "A-Z":
					return [...courses].sort((a, b) => a.title.localeCompare(b.title));
				case "price-asc":
					return [...courses].sort((a, b) => a.price - b.price);
				case "price-desc":
					return [...courses].sort((a, b) => b.price - a.price);
				default:
					return courses;
			}
		};
		console.log("courses:", courses);

		// Mettre à jour les cours triés lorsque sortBy change
		const sorted = sortCourses(sortBy, courses);
		setSortedCourses(sorted);
	}, [sortBy, courses]);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortBy(event.target.value);
	};

	return (
		<div>
			{/* Sélecteur de type de filtre */}
			<select value={sortBy} onChange={handleChange}>
				<option value="">Trier par</option>
				<option value="A-Z">Titre (A-Z)</option>
				<option value="price-asc">Prix (croissant)</option>
				<option value="price-desc">Prix (décroissant)</option>
			</select>

			{/* Liste des cours filtrés */}
			{sortedCourses.map((course: Course) => (
				<Card key={course.id} {...course} />
			))}
		</div>
	);
}
