import { fetchDiscountCourses } from "./discountCourses-service";

// Fonction pour récupérer les URLs d'images des cours en promotion
export async function fetchDiscountThumbnailUrls(): Promise<string[]> {
	try {
		// Initialisez le tableau images
		let images: string[] = [];

		// Effectuez la requête pour récupérer les cours avec une remise
		const result = await fetchDiscountCourses();

		// Parcourez les résultats de la requête et ajoutez les images au tableau images
		for (const course of result) {
			images.push(course.thumbnailUrl);
		}

		// Retournez le tableau images
		return images;
	} catch (error) {
		console.error("Error fetching courses with discount:", error);
		throw error;
	}
}
