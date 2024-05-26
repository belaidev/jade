import { json, LoaderFunction } from "@remix-run/node";
import { fetchPopularCourseById } from "~/services/popular-course-details-service";
import { useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";
import { db } from "~/common/utils/db.server";
import { chapters, lessons } from "~/feats/asynchronous-courses/schema";
import { classes } from "~/feats/synchronous-courses/schema";
import { isAsynchronousCourse, isSynchronousCourse } from "~/services/popular-course-category-service";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PopularCourse } from "~/feats/asynchronous-courses/functions-said";
import type { Chapter } from "~/feats/asynchronous-courses/functions-said";
import StarRating from "~/components/star-rating";
import "./course-detail.css";
import "~/components/star-rating.css";

export type Class = {
    id: number;
    title: string;
    description: string;
    schedule: string;
};

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

    let data: LoaderData = { course, isAsynchronous: false, isSynchronous: false, chaptersWithLessons: [], classes: [] };

    if (await isAsynchronousCourse(courseId)) {
        const chaptersResult = await db.select().from(chapters).where(eq(chapters.asynchronousCourseId, courseId));
        const chaptersWithLessons = await Promise.all(chaptersResult.map(async (chapter) => {
            const lessonsResult = await db.select().from(lessons).where(eq(lessons.chapterId, chapter.id));
            return {
                ...chapter,
                lessons: lessonsResult
            };
        }));
        data = { ...data, isAsynchronous: true, chaptersWithLessons };
    } else if (await isSynchronousCourse(courseId)) {
        const classesResult = await db.select().from(classes).where(eq(classes.synchronousCourseId, courseId));
        const transformedClasses = classesResult.map((classItem) => ({
            id: classItem.id,
            title: `Class ${classItem.id}`,
            description: `From ${classItem.startTime} to ${classItem.endTime}`,
            schedule: `${classItem.startTime} - ${classItem.endTime}`,
        }));
        data = { ...data, isSynchronous: true, classes: transformedClasses };
    }

    return json(data);
};

export default function CourseDetailRoute() {
    const { course, isAsynchronous, isSynchronous, chaptersWithLessons, classes } = useLoaderData<LoaderData>();

    return (
        <div className="course-detail">
            <h1 className="course-title">{course.title}</h1>
            <img src={course.thumbnailUrl} alt={course.title} className="course-thumbnail" />
            <p className="course-description">{course.description}</p>
            <p className="course-instructor">Professeur: {course.instructor || 'N/A'}</p>
            <p className="course-duration">Durée totale du cours: {course.duration} minutes</p>
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
                            <AccordionItem key={classItem.id} value={`class-${classItem.id}`} className="chapter-item">
                                <AccordionTrigger className="chapter-trigger">{classItem.title}</AccordionTrigger>
                                <AccordionContent className="chapter-content">
                                    <p>{classItem.description}</p>
                                    <p><strong>Schedule :</strong> {classItem.schedule}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    );
}
