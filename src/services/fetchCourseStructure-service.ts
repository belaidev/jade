import { isAsynchronousCourse, isSynchronousCourse } from "~/services/checkCourseCategory-service";
import { getChaptersAndLessons, getClasses } from "~/services/courseData-service";

export const fetchAsynchronousCourseData = async (courseId: number) => {
    const chaptersWithLessons = await getChaptersAndLessons(courseId);
    return chaptersWithLessons;
};

export const fetchSynchronousCourseData = async (courseId: number) => {
    const transformedClasses = await getClasses(courseId);
    return transformedClasses;
};

export const checkCourseCategory = async (courseId: number) => {
    const isAsynchronous = await isAsynchronousCourse(courseId);
    const isSynchronous = await isSynchronousCourse(courseId);
    return { isAsynchronous, isSynchronous };
};
