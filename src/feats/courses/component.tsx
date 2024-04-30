import { CourseCard } from "./functions";
import { getOneSynchronous } from "../synchronous-courses/functions";

export default function Card(Course : CourseCard) {

//discout?
//durée?
//Synchrone / Asynchrone

	return (


		<div className="max-w-sm overflow-hidden rounded shadow-lg">
			<img className="w-full" src={Course.thumbnailUrl} alt="" />
			<div className="px-6 py-4">
				<div className="mb-2 text-xl font-bold">{Course.title}</div>
				<p className="text-base text-gray-700">
					{Course.instructorId}

					<br />
					{Course.price}
				</p>
			</div>
		</div>
	);
}
