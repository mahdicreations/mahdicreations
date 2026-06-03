import type { Metadata } from "next";
import { MarketingDigitalContent } from "./MarketingDigitalContent";

export const metadata: Metadata = {
  title: "Agence Marketing Digital Marrakech – Communication Digitale | Mahdi Créations",
  description:
    "Agence de marketing digital et de communication à Marrakech. Stratégie digitale, gestion de réseaux sociaux, campagnes publicitaires Google Ads & Meta Ads au Maroc.",
};

export default function MarketingDigitalPage() {
  return <MarketingDigitalContent />;
}
