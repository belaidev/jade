import { Course, CourseCard, CourseCardAsync, CourseCardSync} from "./functions";
import { getOneCours } from "./functions";
import { json } from "drizzle-orm/pg-core";
import { useLoaderData } from "@remix-run/react";



export async function loader(course: Course) {
  const courseInfo = await getOneCours(course.id);
  return json(JSON.stringify({ courseInfo }));
}


export default function Card(course : CourseCard ) {

  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      <img className="w-full" src={course.thumbnailUrl} alt={course.title} />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{course.title}</div>
        <p className="text-base text-gray-700">
          Instructor: {course.instructorId}
          <br />
					Duration : {course.duration}
          <br />
          Price: {course.price}
					{course.id}
        </p>
      </div>
    </div>
  );
}
