// routes/_index2/route.tsx
import { RouteComponent } from "@remix-run/react/dist/routeModules";

const Index2Page: RouteComponent = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur Index2</h1>
      <p className="text-lg">Merci de visiter notre page d'accueil.</p>
    </main>
  );
};

export default Index2Page;
