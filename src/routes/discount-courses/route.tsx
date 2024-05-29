import { useLoaderData } from "@remix-run/react";
import { json } from "drizzle-orm/mysql-core";
import { PopularCourse } from "~/services/courseData-service";
import { fetchPopularCourses } from "~/services/fetchPopularCourses-service";

interface LoaderData {
    popularCourses: PopularCourse[];
}

export async function loader() {
    const popularCourses = await fetchPopularCourses();
    return json<LoaderData>({ popularCourses });
}

export default function discountCourses() {
    const discountCourses = useLoaderData<LoaderData>();
}