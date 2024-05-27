import { db } from "~/common/utils/db.server";
import { eq } from "drizzle-orm";
import { chapters, lessons } from "~/feats/asynchronous-courses/schema";
import { classes } from "~/feats/synchronous-courses/schema";
import { isAsynchronousCourse, isSynchronousCourse } from "~/services/checkCourseCategory-service";

export const fetchAsynchronousCourseData = async (courseId: number) => {
    const chaptersResult = await db.select().from(chapters).where(eq(chapters.asynchronousCourseId, courseId));
    const chaptersWithLessons = await Promise.all(chaptersResult.map(async (chapter) => {
        const lessonsResult = await db.select().from(lessons).where(eq(lessons.chapterId, chapter.id));
        return {
            ...chapter,
            lessons: lessonsResult
        };
    }));
    return chaptersWithLessons;
};

export const fetchSynchronousCourseData = async (courseId: number) => {
    const classesResult = await db.select().from(classes).where(eq(classes.synchronousCourseId, courseId));
    const transformedClasses = classesResult.map((classItem) => ({
        id: classItem.id,
        startTime: classItem.startTime,
        endTime: classItem.endTime,
        meetingUrl: classItem.meetingUrl,
    }));
    return transformedClasses;
};

export const checkCourseCategory = async (courseId: number) => {
    const isAsynchronous = await isAsynchronousCourse(courseId);
    const isSynchronous = await isSynchronousCourse(courseId);
    return { isAsynchronous, isSynchronous };
};
