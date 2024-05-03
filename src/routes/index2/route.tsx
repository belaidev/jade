// routes/_index2/route.tsx
import { RouteComponent } from "@remix-run/react/dist/routeModules";
import Carousel from "../../../src/components/Carousel.tsx";
import { ReactNode } from "react";

const Index2Page: RouteComponent = ({ children }: { children?: ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur Index2</h1>
      <p className="text-lg">Merci de visiter notre page d'accueil.</p>
      <div>
      <Carousel />
      {children}
      </div>
    </main>
  );
};

export default Index2Page;
