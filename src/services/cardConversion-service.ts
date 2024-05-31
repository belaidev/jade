import { CourseCard } from "./allCoursesCards-service";
import { PopularCourse } from "./courseData-service";

export const convertToPopularCourse = (course: CourseCard): PopularCourse => {
    return {
        id: course.id,
        title: course.title,
        description: course.description,
        instructor: course.instructorName,
        duration: course.totalDuration ? parseInt(course.totalDuration) : 0, // Assurez-vous que totalDuration est un nombre
        thumbnailUrl: course.thumbnailUrl,
        price: course.price,
        discount: course.discount,
        rating: course.rating,
    };
};