import type { Metadata } from "next";
import { BlogIndexContent } from "./BlogIndexContent";

export const metadata: Metadata = {
  title: "Blog – Actualités Web, SEO & Marketing Digital au Maroc | Mahdi Créations",
  description:
    "Découvrez nos articles et guides sur la création de sites web, le référencement SEO, le marketing digital et le branding au Maroc. Conseils d'experts pour réussir votre stratégie digitale.",
};

export default function BlogPage() {
  return <BlogIndexContent />;
}
