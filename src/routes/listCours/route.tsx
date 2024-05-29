import { json, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Card from "~/components/card";
import { CourseCard, getAllCourses } from "~/services/allCoursesCards-service";

interface LoaderData {
	courses: CourseCard[];
}

// Fonction utilitaire pour reconvertir les chaînes en dates
function parseCourseDates(course: Partial<CourseCard>): CourseCard {
	if (course.startTime) {
		course.startTime = new Date(course.startTime);
	}
	return course as CourseCard;
}

export async function loader() {
	let courses = await getAllCourses();
	courses = courses.map(parseCourseDates); // Convertir les dates
	return json<LoaderData>({ courses });
}

export default function Courses() {
	console.log("page montée");
	const { courses } = useLoaderData<LoaderData>();
	const [sortBy, setSortBy] = useState<string>("");
	const [sortedCourses, setSortedCourses] = useState<CourseCard[]>([]);

	useEffect(() => {
		// Fonction de tri des cours
		const sortCourses = (sortBy: string, courses: CourseCard[]) => {
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
			{sortedCourses.map((course: CourseCard) => (
				<Card course={course} key={course.id} />
			))}
		</div>
	);
}
