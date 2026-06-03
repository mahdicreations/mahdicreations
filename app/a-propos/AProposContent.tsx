"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Trophy, Lightbulb, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

const values = [
  {
    icon: Sparkles,
    title: "L'Excellence du Design",
    desc: "Nous pensons que l'esthétique est un pilier de la confiance. Chaque pixel est méticuleusement pensé pour créer une expérience utilisateur mémorable et haut de gamme.",
  },
  {
    icon: Trophy,
    title: "La Rigueur Technique",
    desc: "Un beau site doit être performant. Nous utilisons des technologies de pointe (Next.js, TypeScript) pour garantir vitesse, sécurité et évolutivité.",
  },
  {
    icon: Lightbulb,
    title: "La Culture du Résultat",
    desc: "Nous ne créons pas seulement des sites web, nous construisons des outils d'acquisition de clients. Notre objectif principal est le retour sur investissement de nos partenaires.",
  },
  {
    icon: Compass,
    title: "La Proximité Humaine",
    desc: "Basés à Marrakech, nous cultivons un accompagnement transparent, réactif et à l'écoute de nos clients pour construire des collaborations de confiance à long terme.",
  },
];

export function AProposContent() {
  return (
    <div className="bg-dark text-text-white">
      {/* Header Banner */}
      <section className="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <AnimatedSection className="flex flex-col gap-4">
            <span className="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">
              Notre Essence
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-7xl text-white">
              Qui est <span className="text-gold-gradient">Mahdi Créations</span> ?
            </h1>
            <p className="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">
              Une agence web d'exception à Marrakech, mêlant sensibilité artistique et haute rigueur technologique pour façonner l'identité des marques d'aujourd'hui.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <AnimatedSection className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">Notre Histoire</span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white leading-tight">
              Créer des ponts entre art et technologie
            </h2>
            <p className="font-body text-sm md:text-base text-text-muted leading-relaxed">
              Fondée à Marrakech par passion pour le design raffiné et le code propre, Mahdi Créations est née avec une ambition claire : offrir aux entreprises marocaines et internationales des solutions digitales qui rivalisent avec les plus hauts standards mondiaux.
            </p>
            <p className="font-body text-sm md:text-base text-text-muted leading-relaxed">
              Inspirés par la richesse culturelle, la lumière, et l'élégance de Marrakech, nous concevons des identités visuelles et des architectures web sur mesure. De la conception initiale au référencement SEO sur Google, chaque étape est guidée par le sens du détail, le goût de la symétrie, et le sens des affaires.
            </p>
          </AnimatedSection>

          {/* Elegant placeholder layout for agency graphics with a large logo */}
          <AnimatedSection className="lg:col-span-5 bg-dark-card border border-gold/15 rounded-3xl p-8 h-[440px] flex flex-col justify-between items-center relative overflow-hidden group hover:border-gold/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl" />
            <span className="font-display text-xs font-semibold text-gold uppercase tracking-widest self-start">
              L'Esprit Marrakech
            </span>
            <div className="flex-grow flex items-center justify-center py-4 w-full">
              <Image
                src="/logo-transparent.png"
                alt="Mahdi Créations"
                width={1200}
                height={300}
                className="h-[300px] w-auto object-contain drop-shadow-[0_0_40px_rgba(201,150,12,0.25)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="border-t border-white/5 pt-4 text-xs font-body text-gold flex justify-between w-full">
              <span>Agence Digitale &middot; Marrakech</span>
              <span>Maroc</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-dark-section border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <AnimatedSection className="text-center mb-16 flex flex-col gap-3 max-w-xl mx-auto">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">Nos Valeurs</span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white">Ce qui nous guide au quotidien</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <AnimatedSection
                  key={idx}
                  delay={idx * 0.1}
                  className="bg-dark-card border border-white/5 rounded-2xl p-8 flex gap-6 hover:border-gold/20 transition-all duration-300"
                >
                  <div className="bg-gold/10 text-gold rounded-xl p-3 shrink-0 h-12 w-12 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-xl text-text-white mb-2">
                      {val.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-text-muted">
                      {val.desc}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 text-center max-w-5xl mx-auto px-4 md:px-8">
        <AnimatedSection className="flex flex-col gap-6 items-center">
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">
            Collaborons ensemble
          </h2>
          <p className="font-body text-base text-text-muted max-w-xl leading-relaxed">
            Nous sommes impatients de découvrir vos idées et de vous proposer l'architecture digitale parfaite pour les concrétiser.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg cursor-pointer"
              >
                Discuter de votre projet
              </motion.button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
