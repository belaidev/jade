import { useLoaderData } from "@remix-run/react";
import { json } from "drizzle-orm/mysql-core";
import { Course, CourseCard } from "./functions";
import { getOneCours } from "~/feats/courses/getOneCours";
import { serverOnly$ } from "vite-env-only";

interface LoaderData {
	courseInfo: CourseCard[];
}

export async function loader(course: Course) {
	const courseInfo = serverOnly$(await getOneCours(course.id));
	return json(JSON.stringify({ courseInfo }));
}

export function DurationTime() {
	const { courseInfo } = useLoaderData<LoaderData>();
	let totalDuration = 0;

	// Parcourir chaque élément de courseInfo
	for (const info of courseInfo) {
		// Vérifier si l'élément est de type CourseCardAsync
		if ("duration" in info) {
			totalDuration += parseInt(info.duration); // Ajouter la durée à totalDuration
		}
	}

	return totalDuration;
}

export default function Card(course: Course) {
	return (
		<div className="max-w-sm overflow-hidden rounded shadow-lg">
			<img className="w-full" src={course.thumbnailUrl} alt={course.title} />
			<div className="px-6 py-4">
				<div className="mb-2 text-xl font-bold">{course.title}</div>
				<p className="text-base text-gray-700">
					Instructor: {course.instructorId}
					<br />
					<br />
					Price: {course.price}
					{course.id}
				</p>
			</div>
		</div>
	);
}
