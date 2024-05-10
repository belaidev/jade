import { useLoaderData, json } from "@remix-run/react";
import { Course, CourseCard, getOneCours } from "./functions";

interface LoaderData {
	courseInfo: CourseCard[];
}

export async function loader(course: Course) {
	const courseInfo = await getOneCours(course.id);
	return json(JSON.stringify({ courseInfo }));
}

export function DurationTime() {
	const { courseInfo } = useLoaderData<LoaderData>();
	let totalDuration = 0;

	for (const duration of courseInfo.duration) {
			totalDuration += duration;
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
