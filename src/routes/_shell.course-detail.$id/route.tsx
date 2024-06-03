import { json, LoaderFunction } from "@remix-run/node";
import { fetchPopularCourseById } from "~/services/fetchPopularCourseById-service";
import { useLoaderData } from "@remix-run/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "shadcn/components/ui/accordion";
import type { PopularCourse, Chapter, Class } from "~/services/courseData-service";
import StarRating from "~/components/star-rating";
import { checkCourseCategory, fetchAsynchronousCourseData, fetchSynchronousCourseData } from "~/services/fetchCourseStructure-service";
import { formatDuration } from "~/services/formatDuration-service";
import { useCart } from '~/contexts/CartContext';
import "./course-detail.css";
import "~/components/star-rating.css";
import { Button } from 'shadcn/components/ui';

type LoaderData = {
	course: PopularCourse;
	isAsynchronous: boolean;
	isSynchronous: boolean;
	chaptersWithLessons: Chapter[];
	classes: Class[];
};

export const loader: LoaderFunction = async ({ params }) => {
	const { id } = params;
	if (!id) {
		throw new Response("Course ID is required", { status: 400 });
	}
	const courseId = parseInt(id, 10);
	if (isNaN(courseId)) {
		throw new Response("Invalid course ID", { status: 400 });
	}

	const course = await fetchPopularCourseById(courseId);
	if (!course) {
		throw new Response("Course not found", { status: 404 });
	}

	let data: LoaderData = {
		course,
		isAsynchronous: false,
		isSynchronous: false,
		chaptersWithLessons: [],
		classes: []
	};

	const { isAsynchronous, isSynchronous } = await checkCourseCategory(courseId);

	if (isAsynchronous) {
		const chaptersWithLessons = await fetchAsynchronousCourseData(courseId);
		data = { ...data, isAsynchronous: true, chaptersWithLessons };
	} else if (isSynchronous) {
		const transformedClasses = await fetchSynchronousCourseData(courseId);
		data = { ...data, isSynchronous: true, classes: transformedClasses };
	}

	return json(data);
};

export default function CourseDetailRoute() {
    const { course, isAsynchronous, isSynchronous, chaptersWithLessons, classes } = useLoaderData<LoaderData>();
    const { addToCart, isInCart } = useCart();

    const handleAddToCart = () => {
        addToCart(course);
    };

    return (
        <div className="course-detail">
            <h1 className="course-title">{course.title}</h1>
            <img src={course.thumbnailUrl} alt={course.title} className="course-thumbnail" />
            <p className="course-description">{course.description}</p>
            <p className="course-instructor">Professeur: {course.instructor || 'N/A'}</p>
            <p className="course-duration">Durée totale du cours: {formatDuration(course.duration)}</p>
            <p className="course-price">Prix: ${course.price}</p>
            {course.discount ? <p className="course-discount">Promotion: -{course.discount }%</p> : null}
            {course.rating !== undefined && (
                <div className="rating-container">
                    <span>Note: </span>
                    <StarRating rating={course.rating !== undefined ? course.rating : 0} />
                    <span> ({course.rating !== undefined ? course.rating.toFixed(1) : 'No rating'})</span>
                </div>
            )}
            <div className="course-structure-section">
                {isAsynchronous && (
                    <Accordion type="multiple">
                        {chaptersWithLessons.map((chapter) => (
                            <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`} className="chapter-item">
                                <AccordionTrigger className="chapter-trigger">{chapter.title}</AccordionTrigger>
                                <AccordionContent className="chapter-content">
                                    <p>{chapter.description}</p>
                                    <Accordion type="multiple">
                                        {chapter.lessons.map((lesson) => (
                                            <AccordionItem key={lesson.id} value={`lesson-${lesson.id}`} className="lesson-item">
                                                <AccordionTrigger className="lesson-trigger">{lesson.title}</AccordionTrigger>
                                                <AccordionContent className="lesson-content">
                                                    <p><strong>Description :</strong> {lesson.description}</p>
                                                    <p><strong>Durée :</strong> {lesson.duration}</p>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
                {isSynchronous && (
                    <Accordion type="multiple">
                        {classes.map((classItem) => (
                            <AccordionItem key={classItem.id} value={`Séance - ${classItem.id}`} className="chapter-item">
                                <AccordionTrigger className="chapter-trigger"><strong>Séance -</strong>&nbsp;{classItem.id}</AccordionTrigger>
                                <AccordionContent className="chapter-content">
                                    <p><strong>Horraire :</strong> {classItem.startTime} - {classItem.endTime}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>

            <div className="commande-section">
            <Button className="btn-add"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAddToCart;
                                    }}
                                    disabled={isInCart(course.id)}
                                >
                                    {isInCart(course.id) ? 'Ajouté' : 'Ajouter au panier'}
                                </Button>
            </div>
        </div>
    );
}
