import { Course, CourseCard, CourseCardAsync, CourseCardSync} from "./functions";
import { getOneCours } from "./functions";
import { json } from "drizzle-orm/pg-core";
import { useLoaderData } from "@remix-run/react";


interface LoaderData {
	courseInfo: CourseCard;
}

export async function loader(Course) {
  const courseInfo = await getOneCours(Course.id);
  return json(JSON.stringify({ courseInfo }));
}


export default function Card(course: Course) {
	const { courseInfo } = useLoaderData<LoaderData>();


  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      <img className="w-full" src={course.thumbnailUrl} alt={course.title} />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{course.title}</div>
        <p className="text-base text-gray-700">
          Instructor: {course.instructorId}
          <br />
          Chapter: {courseInfo.chapterId}
          <br />
          Price: {course.price}
        </p>
      </div>
    </div>
  );
}
