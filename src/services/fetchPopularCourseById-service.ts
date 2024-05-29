import { getCourseById, PopularCourse } from '~/services/courseData-service';
import { getRatingAverageByCourseId } from './courseRating-service';
import { getInstructorIdByCourseId, getInstructorNameById } from './instructor-service';
import { getCourseDuration } from './courseDuration-service';

export async function fetchPopularCourseById(courseId: number): Promise<PopularCourse | null> {
    try {
        const course = await getCourseById(courseId);
        const rating = await getRatingAverageByCourseId(courseId);
        const instructorId = await getInstructorIdByCourseId(courseId);
        let instructorName;
        if(instructorId!=null){
            instructorName = await getInstructorNameById(instructorId);
        }
        const duration = await getCourseDuration(courseId);
        if(course!=null){
            const PopularCourse: PopularCourse = {
                id: course.id,
                title: course.title,
                description: course.description,
                instructor: instructorName,
                duration: duration,
                thumbnailUrl: course.thumbnailUrl || '/img/img-default',
                price: course.price,
                discount: course.discount,
                rating: rating
            };
            return PopularCourse;
        } else {
            console.log("Error fetching data for course. Course could be null.")
            return null;
        }
    } catch (error) {
        console.error("Error fetching popular course:", error);
        throw error;
    }
}