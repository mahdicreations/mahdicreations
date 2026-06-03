import type { Metadata } from "next";
import { ReferencementSeoContent } from "./ReferencementSeoContent";

export const metadata: Metadata = {
  title: "Référencement Naturel SEO à Marrakech & au Maroc | Mahdi Créations",
  description:
    "Améliorez votre positionnement sur Google grâce à notre agence SEO à Marrakech. Référencement naturel, audit technique SEO, optimisation éditoriale et netlinking de qualité au Maroc.",
};

export default function ReferencementSeoPage() {
  return <ReferencementSeoContent />;
}
