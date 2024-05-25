import { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getChaptersAndLessons } from '~/feats/asynchronous-courses/functions-said';

export const chaptersAndLessonsLoader = async ({ params }: LoaderFunctionArgs) => {
    const { courseId } = params;
    if (!courseId) {
        throw new Error("Course ID is required");
    }

    const chaptersAndLessons = await getChaptersAndLessons(parseInt(courseId, 10));
    return json(chaptersAndLessons);
};
