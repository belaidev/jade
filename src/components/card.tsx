import { CourseCard, CourseCardAsync, CourseCardSync } from "~/services/allCoursesCards-service";
import StarRating from "./star-rating";
import "~/components/star-rating.css";

export default function Card({ course }: { course: CourseCard }) {
	// Déterminer le type de cours (synchrone ou asynchrone)
	const isSyncCourse = (course: CourseCard): course is CourseCardSync => course.type === "sync";
	const isAsyncCourse = (course: CourseCard): course is CourseCardAsync => course.type === "async";

	return (
		<a href={`/course-detail/${course.id}`} className="card-link">
			<div className="max-w-sm overflow-hidden rounded shadow-lg">
				<img className="w-full" src={course.thumbnailUrl} alt={course.title} />
				<div className="px-6 py-4">
					<div className="mb-2 text-xl font-bold">{course.title}</div>
					<p className="text-base text-gray-700">
						Description: {course.description}
						<br />
						Instructor: {course.instructorName}
						<br />
						{isAsyncCourse(course) && (
							<>
								Duration: {course.totalDuration}
								{console.log("duration :", course.totalDuration)}
								<br />
							</>
						)}
						{isSyncCourse(course) && (
							<>
								Start Time: {course.startTime.toLocaleString()}
								{console.log("date :", course.startTime)}
								<br />
							</>
						)}
						Price: ${course.price}
						<div className="rating-container">
							<span>Note: </span>
								<StarRating rating={course.rating !== undefined ? course.rating : 0} />
							<span> ({course.rating !== undefined ? course.rating.toFixed(1) : "No rating"})</span>
						</div>
					</p>
				</div>
			</div>
		</a>
	);
}
