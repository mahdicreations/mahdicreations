"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Monitor,
  Code2,
  AppWindow,
  Palette,
  Search,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Server,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

const serviceDetails = [
  {
    icon: Monitor,
    title: "Création de Sites Web",
    desc: "Nous concevons des sites vitrines et e-commerce d'exception, alliant élégance visuelle et performances techniques de pointe.",
    benefits: [
      "Design luxueux sur mesure",
      "Optimisé à 100% pour mobiles & tablettes",
      "Vitesse de chargement ultra-rapide",
      "Intégration du paiement sécurisé marocain (CMI)",
    ],
    process: ["Cadrage & CDC", "Maquettes UX/UI", "Développement", "Tests & Lancement"],
    href: "/creation-site-web",
  },
  {
    icon: Code2,
    title: "Développement Web Sur Mesure",
    desc: "Nous créons des fonctionnalités avancées et des plateformes dynamiques codées selon vos besoins spécifiques.",
    benefits: [
      "Architecture logicielle évolutive",
      "Intégration d'API et de services externes",
      "Panneau d'administration personnalisé",
      "Sécurité renforcée des données",
    ],
    process: ["Analyse fonctionnelle", "Architecture BDD", "Codage (NextJS/Node)", "Sécurisation"],
    href: "/contact",
  },
  {
    icon: AppWindow,
    title: "Applications Web & SaaS",
    desc: "Développez des solutions logicielles cloud-native à destination de vos clients ou pour vos processus internes.",
    benefits: [
      "Interface utilisateur intuitive",
      "Automatisation des processus métiers",
      "Gestion d'utilisateurs et rôles",
      "Hébergement cloud sécurisé",
    ],
    process: ["Spécifications", "Prototypage", "Développement Agile", "Hébergement & Maintenance"],
    href: "/contact",
  },
  {
    icon: Palette,
    title: "Design Graphique & Infographie",
    desc: "Notre équipe de créatifs crée des chartes visuelles de luxe qui captent l'essence et les valeurs de votre marque.",
    benefits: [
      "Création de logos originaux vectoriels",
      "Charte graphique complète (couleurs, typos)",
      "Supports de communication print & digital",
      "Bannières publicitaires haut de gamme",
    ],
    process: ["Moodboard créatif", "Propositions de logos", "Finalisation", "Kit de marque complet"],
    href: "/contact",
  },
  {
    icon: Search,
    title: "Référencement Naturel SEO",
    desc: "Positionnez votre entreprise en tête des résultats de recherche Google au Maroc et ciblez vos clients idéaux.",
    benefits: [
      "Audit technique SEO complet",
      "Recherche de mots-clés stratégiques",
      "Rédaction de contenus optimisés",
      "Stratégie de backlinks de qualité",
    ],
    process: ["Audit technique", "Recherche mots-clés", "Optimisations On-Page", "Netlinking"],
    href: "/referencement-seo",
  },
  {
    icon: TrendingUp,
    title: "Marketing Digital",
    desc: "Déployez des campagnes publicitaires performantes pour générer des prospects qualifiés et accroître votre notoriété.",
    benefits: [
      "Publicités Google Search & Display",
      "Campagnes Facebook & Instagram Ads",
      "Stratégie de content marketing",
      "Rapports de performance mensuels transparents",
    ],
    process: ["Définition objectifs", "Création des visuels/textes", "Lancement & A/B testing", "Optimisations"],
    href: "/marketing-digital",
  },
  {
    icon: Server,
    title: "Hébergement Web & Noms de Domaine",
    desc: "Hébergement ultra-performant et gestion complète de votre portefeuille de noms de domaine pour garantir une présence en ligne ininterrompue.",
    benefits: [
      "Serveurs SSD NVMe haute performance au Maroc et en Europe",
      "Enregistrement de domaine en .ma, .com, .net, etc.",
      "Certificats SSL gratuits et gestion DNS",
      "Espaces de stockage redondés",
    ],
    process: ["Choix du serveur", "Réservation de domaine", "Configuration", "Mise en ligne"],
    href: "/contact",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support Web",
    desc: "Des contrats de maintenance personnalisés pour assurer la pérennité, la sécurité et la mise à jour constante de vos outils digitaux.",
    benefits: [
      "Mises à jour de sécurité régulières",
      "Sauvegardes quotidiennes externalisées",
      "Interventions correctives rapides",
      "Monitoring 24/7 des performances",
    ],
    process: ["Audit initial", "Définition du SLA", "Mise en place outils", "Support continu"],
    href: "/contact",
  },
];

export function ServicesContent() {
  return (
    <div className="bg-dark text-text-white">
      {/* Header Banner */}
      <section className="relative min-h-[50vh] flex items-center justify-center border-b border-white/5 noise-overlay">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg-2.png"
            alt="Nos services web et digitaux"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.08)_0%,transparent_60%)] pointer-events-none" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10 py-24">
          <AnimatedSection className="flex flex-col gap-4">
            <span className="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold drop-shadow-sm">
              Expertise & Solutions
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-7xl text-white drop-shadow-md">
              Nos <span className="text-gold-gradient">Services</span>
            </h1>
            <p className="font-body text-base md:text-lg text-text-white max-w-3xl mx-auto leading-relaxed mt-2 drop-shadow">
              Nous offrons une gamme complète de services digitaux haut de gamme pour propulser votre entreprise, accroître votre visibilité et développer votre chiffre d'affaires.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Detail List */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col gap-24">
        {serviceDetails.map((service, index) => {
          const Icon = service.icon;
          const isEven = index % 2 === 0;

          return (
            <AnimatedSection
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-white/5 pb-20 last:border-0 last:pb-0`}
            >
              {/* SVG Gradient definition per service section to ensure rendering */}
              <div className="w-0 h-0 absolute pointer-events-none">
                <svg>
                  <linearGradient id={`gold-icon-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f0d080" />
                    <stop offset="35%" stopColor="#c9960c" />
                    <stop offset="100%" stopColor="#8b6914" />
                  </linearGradient>
                </svg>
              </div>

              {/* Text Side */}
              <div
                className={`lg:col-span-7 flex flex-col gap-6 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-gold">
                    <Icon className="w-8 h-8" style={{ stroke: `url(#gold-icon-grad-${index})` }} />
                  </div>
                  <h2 className="font-display font-medium text-3xl md:text-4xl text-text-white">
                    {service.title}
                  </h2>
                </div>

                <p className="font-body text-base text-text-muted leading-relaxed">
                  {service.desc}
                </p>

                {/* Benefits Checklist */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-display font-semibold text-gold text-sm uppercase tracking-wider">
                    Avantages Clés
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-body text-text-muted">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <CheckCircle size={16} className="text-gold shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process Steps */}
                <div className="flex flex-col gap-3 mt-2">
                  <h4 className="font-display font-semibold text-gold text-sm uppercase tracking-wider">
                    Notre Processus
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {service.process.map((step, i) => (
                      <div key={i} className="bg-dark-card border border-white/5 rounded-xl p-3 text-center">
                        <span className="block text-xs font-semibold text-gold mb-1">Étape 0{i + 1}</span>
                        <span className="text-xs font-body text-text-white block font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Link */}
                <div className="pt-4">
                  <Link href={service.href}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gold-gradient text-dark font-body font-semibold text-sm px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-gold/10"
                    >
                      Démarrer un projet
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Graphic/Visual Side */}
              <div
                className={`lg:col-span-5 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                } bg-dark-card border border-gold/15 rounded-3xl p-8 h-80 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-gold/30 transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="text-gold/20 font-display text-8xl font-bold select-none group-hover:scale-105 transition-transform duration-500">
                    0{index + 1}
                  </div>
                  <span className="font-display text-xl font-medium text-gold-light">
                    Mahdi Créations
                  </span>
                  <span className="font-body text-xs text-text-muted uppercase tracking-widest">
                    Expertise de Luxe
                  </span>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </section>
    </div>
  );
}
