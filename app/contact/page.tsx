import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact – Mahdi Créations | Agence Web Marrakech",
  description:
    "Contactez Mahdi Créations pour lancer votre projet web. Demandez un devis gratuit ou réservez votre consultation web gratuite. Agence web à Marrakech, Maroc.",
};

export default function ContactPage() {
  return <ContactContent />;
}
