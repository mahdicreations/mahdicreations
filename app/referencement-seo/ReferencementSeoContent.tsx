"use client";

import Link from "next/link";
import { Search, BarChart3, Edit3, Settings, Trophy, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

const seoSteps = [
  {
    icon: Search,
    title: "1. Audit SEO Technique",
    desc: "Nous analysons en profondeur le code source, la structure des URL, le crawl des robots et la vitesse de chargement de votre site existant.",
  },
  {
    icon: Settings,
    title: "2. Optimisation Technique (On-Page)",
    desc: "Nous structurons vos balises HTML (Title, Hn, alt), configurons le HTTPS, améliorons l'ergonomie mobile et le balisage sémantique.",
  },
  {
    icon: Edit3,
    title: "3. Optimisation du Contenu",
    desc: "Nos rédacteurs rédigent des contenus de haute qualité pour mieux référencer un site sur Google en ciblant des requêtes stratégiques.",
  },
  {
    icon: BarChart3,
    title: "4. Netlinking & Popularité",
    desc: "Nous mettons en place des campagnes d'acquisition de liens externes (backlinks) de qualité pour accroître l'autorité de votre domaine.",
  },
];

export function ReferencementSeoContent() {
  return (
    <div className="bg-dark text-text-white">
      {/* Header Banner */}
      <section className="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <AnimatedSection className="flex flex-col gap-4">
            <span className="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">
              Visibilité sur Google
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-7xl text-white">
              Référencement Naturel <span className="text-gold-gradient">SEO</span> au Maroc
            </h1>
            <p className="font-body text-base md:text-lg text-text-muted max-w-3xl mx-auto leading-relaxed mt-2">
              Propulsez votre site internet en tête des résultats de recherche Google. Attirez un trafic qualifié de clients prêts à acheter vos services.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Qu'est-ce que le SEO Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection className="flex flex-col gap-6">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">Pourquoi le SEO ?</span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white leading-tight">
              Pourquoi le référencement naturel est-il crucial ?
            </h2>
            <p className="font-body text-base text-text-muted leading-relaxed">
              Le **SEO référencement** consiste à optimiser un site internet pour qu'il soit jugé pertinent et de qualité par les algorithmes de Google. Contrairement aux annonces payantes, le **référencement naturel Maroc** vous offre une visibilité gratuite et pérenne dans le temps.
            </p>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Qu'il s'agisse de cibler des clients locaux avec le référencement naturel Marrakech ou d'atteindre des acheteurs internationaux, notre agence vous accompagne pour **référencer un site sur Google** avec efficacité et éthique.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Trophy, title: "Trafic Qualifié", desc: "Ciblez précisément les internautes qui recherchent activement vos services." },
              { icon: ShieldAlert, title: "Autorité & Confiance", desc: "Être classé en haut de Google renforce instantanément la crédibilité de votre marque." },
            ].map((box, i) => {
              const Icon = box.icon;
              return (
                <AnimatedSection
                  key={i}
                  delay={i * 0.1}
                  className="bg-dark-card border border-white/5 rounded-2xl p-6 flex flex-col gap-4"
                >
                  <div className="text-gold w-10 h-10 flex items-center justify-center bg-gold/10 rounded-lg">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-display font-medium text-lg text-text-white">{box.title}</h4>
                  <p className="font-body text-xs text-text-muted leading-relaxed">{box.desc}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notre Methode Steps */}
      <section className="py-24 bg-dark-section border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <AnimatedSection className="text-center mb-16 flex flex-col gap-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">Notre Méthodologie</span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white">Comment nous optimisons votre site</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seoSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <AnimatedSection
                  key={idx}
                  delay={idx * 0.1}
                  className="bg-dark-card border border-gold/15 rounded-2xl p-8 flex gap-6 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="bg-gold/10 text-gold rounded-xl p-3 shrink-0 h-12 w-12 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-xl text-text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-text-muted">
                      {step.desc}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO Local Marrakech */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection className="flex flex-col gap-6 order-2 lg:order-1 bg-dark-card border border-gold/15 rounded-3xl p-8">
            <h3 className="font-display font-medium text-2xl text-text-white">Le SEO Local : indispensable pour Marrakech</h3>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Marrakech est la capitale touristique et économique de référence. Si vous possédez un riad, un hôtel, une agence immobilière ou un restaurant, le SEO local vous permet d'apparaître en tête des résultats de recherche locaux sur Google Maps (Google My Business) et sur les téléphones des visiteurs.
            </p>
            <ul className="flex flex-col gap-2 text-xs font-body text-text-muted">
              <li className="flex gap-2 items-center">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                <span>Optimisation de votre fiche Google Business Profile</span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                <span>Recherche de mots-clés géolocalisés (ex: "riad de luxe marrakech")</span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                <span>Gestion de l'e-réputation et des avis clients</span>
              </li>
            </ul>
          </AnimatedSection>

          <AnimatedSection className="flex flex-col gap-6 order-1 lg:order-2">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">SEO Localisé</span>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-white leading-tight">
              Ciblez vos clients à Marrakech
            </h2>
            <p className="font-body text-base text-text-muted leading-relaxed">
              Nous concevons des stratégies pour maximiser votre présence locale. Obtenez une visibilité chirurgicale auprès des touristes et des professionnels résidant ou visitant Marrakech.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 text-center max-w-5xl mx-auto px-4 md:px-8">
        <AnimatedSection className="flex flex-col gap-6 items-center">
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">
            Voulez-vous doubler votre trafic organique ?
          </h2>
          <p className="font-body text-base text-text-muted max-w-xl leading-relaxed">
            Contactez notre agence SEO à Marrakech. Demandez un audit SEO initial gratuit et sans engagement de votre site web.
          </p>
          <div className="pt-4">
            <Link href="/contact?type=seo">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg cursor-pointer"
              >
                Réserver mon audit SEO gratuit
              </motion.button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
