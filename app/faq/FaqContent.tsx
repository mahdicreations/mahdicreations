"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FAQAccordion } from "@/components/FAQAccordion";

const allFaqs = [
  {
    question: "Quels sont les tarifs pratiqués par Mahdi Créations ?",
    answer: "Chaque projet est unique et fait l'objet d'une tarification sur mesure adaptée à vos objectifs et besoins techniques. Après étude de votre cahier des charges ou lors de notre consultation gratuite, nous vous fournissons une proposition commerciale claire et détaillée. Les projets d'audit SEO complet ou d'accompagnement marketing font également l'objet de devis personnalisés.",
  },
  {
    question: "Quels sont vos délais moyens de livraison ?",
    answer: "Un projet de site vitrine et dynamique prend généralement de 2 à 3 semaines de conception après la signature du contrat et la réception de vos éléments graphiques/textuels. Un site e-commerce prend 4 à 6 semaines, et une application web complexe peut exiger de 8 à 12 semaines de développement.",
  },
  {
    question: "Proposez-vous vos services en dehors de Marrakech ?",
    answer: "Absolument. Bien que notre agence web soit basée à Marrakech, nous travaillons avec des clients situés dans tout le Maroc (Casablanca, Rabat, Tanger, Agadir, Fès) ainsi qu'à l'international (France, Belgique, Suisse, Espagne). Les réunions se font en visioconférence et par téléphone de manière fluide et transparente.",
  },
  {
    question: "En quoi consiste la consultation web gratuite ?",
    answer: "C'est un audit complet offert sans engagement de votre part. Si vous possédez déjà un site internet, nous analysons ses performances, son score SEO sur Google, sa réactivité mobile et sa sécurité. Nous vous fournissons ensuite un compte-rendu avec un plan d'action concret pour l'améliorer.",
  },
  {
    question: "Fournissez-vous la maintenance technique après la livraison ?",
    answer: "Oui, nous proposons des contrats de maintenance annuels pour assurer la pérennité de votre outil digital. Cela comprend les sauvegardes hebdomadaires de votre base de données, l'application des correctifs de sécurité, la mise à jour des extensions et du serveur, ainsi qu'un crédit d'heures pour de petites modifications.",
  },
  {
    question: "Quels secteurs d'activité accompagnez-vous ?",
    answer: "Nous collaborons avec une clientèle variée. Nous avons développé une expertise solide dans l'accompagnement des établissements touristiques (hôtels, riads de luxe à Marrakech, maisons d'hôtes), les agences immobilières, les cabinets professionnels (avocats, cliniques), les artisans d'art locaux et les boutiques e-commerce de mode et cosmétiques.",
  },
  {
    question: "Comment mon site sera-t-il optimisé pour le référencement naturel Google ?",
    answer: "Dès la phase de développement, nous mettons en œuvre les meilleures pratiques du SEO : code sémantique optimisé, balisage HTML propre (Title, Hn, alt), images compressées, configuration du protocole HTTPS, et inscription sur la Google Search Console. Nous proposons également des forfaits SEO mensuels avancés pour cibler des mots-clés concurrentiels.",
  },
];

export function FaqContent() {
  return (
    <div className="bg-dark text-text-white">
      {/* Header Banner */}
      <section className="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <AnimatedSection className="flex flex-col gap-4">
            <span className="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">
              FAQ
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-7xl text-white">
              Questions <span className="text-gold-gradient">Fréquentes</span>
            </h1>
            <p className="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">
              Retrouvez toutes les réponses à vos interrogations concernant la création de sites internet, le référencement Google, nos tarifs et nos méthodes de travail.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <AnimatedSection>
          <FAQAccordion items={allFaqs} />
        </AnimatedSection>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center max-w-5xl mx-auto px-4 md:px-8">
        <AnimatedSection className="flex flex-col gap-6 items-center">
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">
            D'autres questions en suspens ?
          </h2>
          <p className="font-body text-base text-text-muted max-w-xl leading-relaxed">
            Notre équipe est disponible pour répondre à vos demandes spécifiques et concevoir la meilleure stratégie digitale pour votre structure.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg cursor-pointer"
              >
                Nous poser une question
              </motion.button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
