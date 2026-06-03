import type { Metadata } from "next";
import { CreationWebContent } from "./CreationWebContent";

export const metadata: Metadata = {
  title: "Création de Site Web au Maroc – Site Vitrine & Dynamique & E-commerce | Mahdi Créations",
  description:
    "Création de sites web professionnels au Maroc et à Marrakech. Conception de sites vitrines et dynamiques, boutiques e-commerce de luxe et solutions sur mesure optimisés SEO. Devis gratuit sous 24h.",
};

export default function CreationWebPage() {
  return <CreationWebContent />;
}
