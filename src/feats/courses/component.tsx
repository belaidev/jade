import { Course, CourseCardSync, CourseCardAsync  } from "./functions";



export default function Card({ course }: { course: Course }) {

	const isSyncCourse = (course: Course): course is CourseCardSync => course.type === "sync";
	const isAsyncCourse = (course: Course): course is CourseCardAsync => course.type === "async";


	return (
		<a href={`/course-detail/${course.id}`} className='card-link'>
			<div className="max-w-sm overflow-hidden rounded shadow-lg">
				<img className="w-full" src={course.thumbnailUrl} alt={course.title} />
				<div className="px-6 py-4">
					<div className="mb-2 text-xl font-bold">{course.title}</div>
					<p className="text-base text-gray-700">
						Description: {course.description}
						<br />
						Instructor: {course.instructorId}
						<br />
						{isAsyncCourse(course) && (
							<>
								Duration: {course.totalDuration}
								{console.log("duration :", course.totalDuration )}
								<br />
							</>
						)}
						{isSyncCourse(course) && (
							<>
								Start Time: {new Date(course.startTime).toLocaleString()}
								{console.log("date :", course.startTime )}
								<br />
							</>
						)}
						Price: {course.price}
					</p>
				</div>
			</div>
		</a>
	);
}
