// test/route.tsx
import { fetchThumbnailUrls } from '~/routes/_index/index-service';

const TestPage = () => {
  const testFunction = async () => {
    try {
      const thumbnailUrls = await fetchThumbnailUrls();
      console.log("Thumbnail URLs:", thumbnailUrls);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  testFunction(); // Appel de la fonction au chargement de la page

  return (
    <div>
      <h1>Test Page</h1>
      <p>Ouvrez la console pour voir les URL des miniatures.</p>
    </div>
  );
};

export default TestPage;
