import type { Metadata } from "next";
import { FaqContent } from "./FaqContent";

export const metadata: Metadata = {
  title: "Questions Fréquentes (FAQ) – Agence Web Marrakech | Mahdi Créations",
  description:
    "Trouvez des réponses à toutes vos questions sur la création de sites internet, le référencement naturel SEO, nos tarifs, nos délais et l'accompagnement de notre agence web.",
};

export default function FaqPage() {
  return <FaqContent />;
}
