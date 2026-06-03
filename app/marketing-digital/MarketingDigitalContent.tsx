"use client";

import Link from "next/link";
import { Megaphone, Mail, Share2, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

const marketingPillars = [
  {
    icon: Megaphone,
    title: "Publicité Digitale (Google Ads & Meta Ads)",
    desc: "Nous concevons et gérons des campagnes publicitaires à fort impact. Générez des leads qualifiés immédiatement grâce à un ciblage géographique et comportemental précis.",
    features: ["Campagnes Google Search & Display", "Publicités d'acquisition Facebook & Instagram", "Optimisation continue du coût par acquisition (CPA)", "A/B testing des créatifs et textes"],
  },
  {
    icon: Share2,
    title: "Gestion des Réseaux Sociaux (Social Media)",
    desc: "Développez et engagez votre communauté sur Instagram, Facebook et LinkedIn. Nous assurons la création de contenus esthétiques et premium qui valorisent votre marque.",
    features: ["Création de calendriers éditoriaux", "Production visuelle haut de gamme", "Gestion de l'engagement & modération", "Partenariats influenceurs locaux"],
  },
  {
    icon: Mail,
    title: "Email Marketing & Automation",
    desc: "Fidélisez vos clients existants et convertissez vos prospects en acheteurs réguliers grâce à des séquences d'emails personnalisées et automatisées.",
    features: ["Conception de newsletters élégantes", "Scénarios d'automation (relance panier, bienvenue)", "Segmentation fine de votre base de données", "Analyse des taux d'ouverture et clics"],
  },
  {
    icon: Layers,
    title: "Stratégie de Contenu & Inbound",
    desc: "Attirez naturellement vos prospects en produisant des contenus à forte valeur ajoutée (articles de blog, e-books, vidéos) qui établissent votre autorité de marché.",
    features: ["Stratégie de communication digitale Marrakech", "Rédaction d'articles optimisés SEO", "Création de supports de vente digitaux", "Copywriting de pages de vente"],
  },
];

export function MarketingDigitalContent() {
  return (
    <div className="bg-dark text-text-white">
      {/* Header Banner */}
      <section className="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <AnimatedSection className="flex flex-col gap-4">
            <span className="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">
              Acquisition & Branding
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-7xl text-white">
              Agence Marketing <span className="text-gold-gradient">Digital</span> à Marrakech
            </h1>
            <p className="font-body text-base md:text-lg text-text-muted max-w-3xl mx-auto leading-relaxed mt-2">
              Développez votre visibilité et augmentez vos ventes au Maroc grâce à une stratégie d'acquisition multicanale performante et sur mesure.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Marketing Pillars Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {marketingPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <AnimatedSection
                key={idx}
                delay={idx * 0.1}
                className="bg-dark-card border border-gold/15 rounded-3xl p-8 flex flex-col justify-between hover:border-gold/30 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-gold">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-display font-medium text-2xl text-text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-text-muted leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                  <ul className="flex flex-col gap-3 font-body text-xs text-text-muted border-t border-white/5 pt-6 mb-8">
                    {pillar.features.map((feat, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2">
                  <Link href="/contact">
                    <span className="font-body text-xs font-semibold text-gold hover:text-gold-light flex items-center gap-1 group cursor-pointer transition-colors">
                      Discuter de cette stratégie
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Marrakech Communication Digitale */}
      <section className="py-24 bg-dark-section border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection className="flex flex-col gap-6">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">Impact Régional</span>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-white leading-tight">
              Une communication digitale ancrée à Marrakech
            </h2>
            <p className="font-body text-base text-text-muted leading-relaxed">
              En tant qu'**agence marketing digital Marrakech** de premier plan, nous comprenons les dynamiques locales du marché marocain et des secteurs clés tels que l'immobilier, l'hôtellerie de luxe, la restauration, et l'artisanat d'art.
            </p>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Nous concevons des campagnes de **communication digitale Marrakech** qui s'alignent avec les spécificités de votre audience cible, combinant élégance visuelle, rigueur analytique, et résultats mesurables.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-dark-card border border-gold/15 rounded-3xl p-8 flex flex-col gap-6">
            <h3 className="font-display font-medium text-2xl text-text-white">Nos Objectifs Clés</h3>
            <div className="flex flex-col gap-4">
              {[
                { title: "Notoriété", desc: "Augmentez le souvenir publicitaire et la mémorisation de votre marque auprès du public cible." },
                { title: "Génération de Leads", desc: "Remplissez votre CRM de contacts de prospects qualifiés prêts à être convertis." },
                { title: "Conversion E-commerce", desc: "Optimisez vos coûts publicitaires pour maximiser le retour sur investissement (ROAS)." },
              ].map((obj, i) => (
                <div key={i} className="flex gap-4 items-start border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="bg-gold/10 text-gold rounded-lg p-2 font-display text-sm font-semibold shrink-0">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-body font-bold text-sm text-text-white">{obj.title}</h4>
                    <p className="font-body text-xs text-text-muted mt-0.5">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 text-center max-w-5xl mx-auto px-4 md:px-8">
        <AnimatedSection className="flex flex-col gap-6 items-center">
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">
            Prêt à faire décoller votre acquisition client ?
          </h2>
          <p className="font-body text-base text-text-muted max-w-xl leading-relaxed">
            Élaborons ensemble la stratégie marketing digital la plus efficace pour votre entreprise au Maroc.
          </p>
          <div className="pt-4">
            <Link href="/contact?type=marketing">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg cursor-pointer"
              >
                Planifier un appel stratégique
              </motion.button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
