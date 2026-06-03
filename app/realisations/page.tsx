import type { Metadata } from "next";
import { RealisationsContent } from "./RealisationsContent";

export const metadata: Metadata = {
  title: "Parmi nos Réalisations – Projets Web & Design | Mahdi Créations",
  description:
    "Découvrez notre portfolio de créations digitales à Marrakech. Sites vitrines haut de gamme, boutiques e-commerce élégantes et identités visuelles pour nos clients au Maroc.",
};

export default function RealisationsPage() {
  return <RealisationsContent />;
}
