import type { Metadata } from "next";
import { AProposContent } from "./AProposContent";

export const metadata: Metadata = {
  title: "Qui est Mahdi Créations ? – Agence Web Marrakech | Mahdi Créations",
  description:
    "Découvrez l'histoire, les valeurs et l'approche humaine et technique de Mahdi Créations, votre agence partenaire de création de sites web et marketing à Marrakech, Maroc.",
};

export default function AProposPage() {
  return <AProposContent />;
}
