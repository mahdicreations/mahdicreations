import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services web Marrakech – Création de sites, SEO & Marketing | Mahdi Créations",
  description:
    "Découvrez nos solutions digitales à Marrakech : création de sites internet professionnels, de sites vitrines et e-commerce de luxe, SEO et marketing d'acquisition.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
