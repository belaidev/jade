import { json, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
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
	console.log("Component mounted");
	const { courses } = useLoaderData<LoaderData>();
	const [filterType, setFilterType] = useState<string>("A-Z");

	// Liste des cours filtrés
	const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

	useEffect(() => {
		// Trier les cours filtrés par ordre alphabétique des titres
		if (filterType === "A-Z") {
			setFilteredCourses(courses.sort((a, b) => a.title.localeCompare(b.title)));
		} else if (filterType === "price") {
			// Trier les cours filtrés par ordre croissant des prix
			setFilteredCourses(courses.sort((a, b) => a.price - b.price));
		}
	}, [courses, filterType]);

	// Fonction pour mettre à jour le type de filtre
	const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newFilterType = e.target.value;
		console.log("New filter type:", newFilterType);
		setFilterType(newFilterType);
	};

	console.log(filteredCourses);

	return (
		<div>
			{/* Sélecteur de type de filtre */}
			<select value={filterType} onChange={handleFilterTypeChange}>
				<option value="A-Z">Title (A-Z)</option>
				<option value="price">Price (croissant)</option>
			</select>

			{/* Liste des cours filtrés */}
			{filteredCourses.map((course: Course) => (
				<Card key={course.id} {...course} />

			))}
		</div>

	);

}
