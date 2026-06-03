"use client";

import Link from "next/link";
import { Monitor, ShoppingBag, Code, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FAQAccordion } from "@/components/FAQAccordion";

const siteTypes = [
  {
    icon: Monitor,
    title: "Site Vitrine & Dynamique",
    subtitle: "Renforcez votre image de marque",
    desc: "Idéal pour présenter votre entreprise, vos services, votre hôtel, ou votre riad. Un **site vitrine et dynamique Maroc** d'exception, élégant, fluide et entièrement administrable.",
    features: ["Design unique haut de gamme", "Optimisé SEO local Marrakech", "Formulaires de contact avancés", "Statistiques de visites intégrées"],
    price: "Sur Devis",
  },
  {
    icon: ShoppingBag,
    title: "Site E-commerce Complet",
    subtitle: "Vendez vos produits en ligne",
    desc: "Une boutique en ligne optimisée pour maximiser vos ventes au Maroc et à l'international. Intègre tous les modules modernes de paiement et de gestion.",
    features: ["Paiement sécurisé CMI / PayPal", "Gestion simplifiée du stock", "Calcul des frais de livraison", "Optimisation du panier d'achat"],
    price: "Sur Devis",
  },
  {
    icon: Code,
    title: "Application Web & SaaS",
    subtitle: "Logiciel web sur mesure",
    desc: "Des solutions complexes codées sur mesure pour vos besoins spécifiques (portails clients, intranets, logiciels SaaS). Une agilité et une sécurité absolues.",
    features: ["Architecture Next.js de pointe", "Base de données évolutive", "Sécurité renforcée des données", "Maintenance évolutive"],
    price: "Sur Devis",
  },
];

const webCreationFAQ = [
  {
    question: "Quel est le tarif pour la création de site web au Maroc ?",
    answer: "Chaque projet fait l'objet d'un chiffrage personnalisé gratuit. Le coût de développement dépend de vos objectifs, du niveau de personnalisation graphique, des fonctionnalités requises et de la complexité technique globale. Contactez-nous pour obtenir une étude détaillée et un devis adapté à votre cahier des charges.",
  },
  {
    question: "Quels sont les délais de conception ?",
    answer: "Pour un site vitrine et dynamique standard, les délais sont de 2 à 3 semaines après validation des maquettes. Pour un site e-commerce ou une plateforme sur mesure, le développement dure généralement entre 4 et 8 semaines selon la complexité des modules à intégrer.",
  },
  {
    question: "Mon site sera-t-il optimisé pour Google et le SEO ?",
    answer: "Oui. Toutes nos créations incluent d'office les optimisations techniques SEO essentielles : structure de balises sémantiques propre, vitesse de chargement optimisée, adaptabilité mobile complète, et indexation initiale sur Google Search Console.",
  },
  {
    question: "Proposez-vous la maintenance et le support après lancement ?",
    answer: "Tout à fait. Nous proposons des contrats de maintenance annuels ou mensuels comprenant la sauvegarde régulière de vos données, les mises à jour de sécurité, le support technique et de petites modifications de contenu si nécessaire pour que votre site reste toujours à jour.",
  },
];

export function CreationWebContent() {
  return (
    <div className="bg-dark text-text-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <AnimatedSection className="flex flex-col gap-4">
            <span className="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">
              Conception Haut de Gamme
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-7xl text-white">
              Création de Site Web au <span className="text-gold-gradient">Maroc</span>
            </h1>
            <p className="font-body text-base md:text-lg text-text-muted max-w-3xl mx-auto leading-relaxed mt-2">
              Conception de sites vitrines et dynamiques d'exception, boutiques e-commerce élégantes et applications web sur mesure. Offrez à votre entreprise une présence en ligne à la hauteur de vos ambitions.
            </p>
          </AnimatedSection>
        </div>
      </section>
 
      {/* Site Types Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {siteTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <AnimatedSection
                key={idx}
                delay={idx * 0.15}
                className="bg-dark-card border border-gold/15 rounded-3xl p-8 flex flex-col justify-between group hover:border-gold/30 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-2xl w-14 h-14 flex items-center justify-center text-gold mb-6 group-hover:border-gold/30 transition-all duration-300">
                    <Icon size={28} />
                  </div>
                  <span className="text-xs font-semibold text-gold uppercase tracking-wider block mb-1">
                    {type.subtitle}
                  </span>
                  <h3 className="font-display font-medium text-2xl text-text-white mb-4 group-hover:text-gold transition-colors duration-300">
                    {type.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed mb-6">
                    {type.desc}
                  </p>
                  <ul className="flex flex-col gap-2.5 text-xs font-body text-text-muted mb-8 border-t border-white/5 pt-6">
                    {type.features.map((feat, i) => (
                      <li key={i} className="flex gap-2 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
 
                <div className="border-t border-white/5 pt-6 flex justify-between items-center mt-auto">
                  <span className="text-sm font-body text-text-muted">Tarification sur devis</span>
                  <Link href="/contact" className="flex items-center gap-2 group/btn text-gold text-xs font-semibold uppercase tracking-wider">
                    <span>En savoir plus</span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="bg-gold-gradient text-dark rounded-full p-1.5 shadow-md flex items-center justify-center cursor-pointer"
                    >
                      <ArrowRight size={14} />
                    </motion.div>
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Process / Methode */}
      <section className="py-24 bg-dark-section border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <AnimatedSection className="text-center mb-16 flex flex-col gap-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">Notre Méthode</span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white">Le déroulement de votre projet</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { num: "01", title: "Cadrage", desc: "Analyse fine de votre marché et rédaction du cahier des charges détaillé." },
              { num: "02", title: "Webdesign", desc: "Création de maquettes UX/UI uniques adaptées à votre identité de marque." },
              { num: "03", title: "Intégration", desc: "Développement technique propre, rapide et entièrement responsive." },
              { num: "04", title: "Optimisation", desc: "Intégration des règles SEO et tests de sécurité sur plusieurs serveurs." },
              { num: "05", title: "Mise en ligne", desc: "Hébergement, configuration du nom de domaine et indexation Google." },
            ].map((step, i) => (
              <AnimatedSection
                key={i}
                delay={i * 0.1}
                className="bg-dark-card border border-white/5 rounded-2xl p-6 relative flex flex-col gap-4"
              >
                <span className="font-display font-bold text-3xl text-gold/25">{step.num}</span>
                <h4 className="font-display font-medium text-lg text-text-white">{step.title}</h4>
                <p className="font-body text-xs text-text-muted leading-relaxed">{step.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection className="flex flex-col gap-6">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">Nos Engagements</span>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-white leading-tight">
              Un site web performant, sécurisé et évolutif
            </h2>
            <p className="font-body text-base text-text-muted leading-relaxed">
              Mahdi Créations est plus qu'une simple agence technique : nous sommes votre partenaire croissance. Nous accordons une attention méticuleuse à chaque détail de la conception de site web au Maroc.
            </p>
          </AnimatedSection>

          <div className="flex flex-col gap-6">
            {[
              { icon: Zap, title: "Vitesse Optimale", desc: "Nous programmons sur des bases légères et modernes (comme Next.js) afin d'offrir des temps de chargement ultra-courts." },
              { icon: ShieldCheck, title: "Sécurité Maximale", desc: "Chaque site intègre des protocoles HTTPS et des protections serveur robustes pour sécuriser vos formulaires et vos transactions." },
              { icon: Globe, title: "SEO Ready", desc: "Votre site web est structuré pour plaire aux algorithmes de Google afin de faciliter le référencement naturel dès le premier jour." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection
                  key={i}
                  delay={i * 0.1}
                  className="bg-dark-card border border-white/5 rounded-2xl p-6 flex gap-4 hover:border-gold/20 transition-all duration-300"
                >
                  <div className="text-gold shrink-0 mt-1">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-lg text-text-white mb-1">{item.title}</h4>
                    <p className="font-body text-xs text-text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mini FAQ accordion */}
      <section className="py-24 bg-dark-section border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <AnimatedSection className="text-center mb-16 flex flex-col gap-3 max-w-xl mx-auto">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">FAQ Création Web</span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white">Des réponses claires à vos questions</h2>
          </AnimatedSection>

          <FAQAccordion items={webCreationFAQ} />
        </div>
      </section>

      {/* Final CTA Devise */}
      <section className="py-24 text-center max-w-5xl mx-auto px-4 md:px-8">
        <AnimatedSection className="flex flex-col gap-6 items-center">
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">Prêt à créer votre site internet de luxe ?</h2>
          <p className="font-body text-base text-text-muted max-w-xl leading-relaxed">
            Obtenez un chiffrage précis pour votre projet de création de site web au Maroc sous 24h.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg cursor-pointer"
              >
                Demander un devis personnalisé
              </motion.button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
