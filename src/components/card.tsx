import { CourseCard, CourseCardAsync, CourseCardSync } from "~/services/allCoursesCards-service";
import StarRating from "./star-rating";
import { useCart } from '~/contexts/CartContext';
import "~/components/star-rating.css";
import { convertToPopularCourse } from "~/services/cardConversion-service";

export default function Card({ course }: { course: CourseCard }) {
    const { addToCart } = useCart();

    const isSyncCourse = (course: CourseCard): course is CourseCardSync => course.type === "sync";
    const isAsyncCourse = (course: CourseCard): course is CourseCardAsync => course.type === "async";

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Pour empêcher la redirection du lien
		const cartCourse = convertToPopularCourse(course);
        addToCart(cartCourse);
    };

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

                                <br />
                            </>
                        )}
                        {isSyncCourse(course) && (
                            <>
                                Start Time: {course.startTime.toLocaleString()}
                                
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
                    <button onClick={handleAddToCart} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ajouter au panier</button>
                </div>
            </div>
        </a>
    );
}