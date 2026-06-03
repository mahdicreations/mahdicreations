"use client";

import { Check } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

import { CallBackForm } from "./CallBackForm";

interface ChecklistItem {
  title: string;
}

const checklistItems: ChecklistItem[] = [
  { title: "Audit du design, de l'ergonomie et de l'expérience utilisateur" },
  { title: "Analyse de la vitesse de chargement sur mobile et desktop" },
  { title: "Vérification des protocoles de sécurité et du SSL" },
  { title: "Diagnostic complet du référencement naturel SEO Google" },
  { title: "Recommandations concrètes et plan d'action de croissance" },
];

export function ConsultationGratuite() {
  return (
    <section className="relative py-20 bg-gold-gradient text-dark overflow-hidden">
      {/* Decorative premium shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Offer Details */}
          <AnimatedSection className="flex flex-col gap-6">
            <span className="text-xs uppercase font-body font-bold tracking-[0.25em] text-dark/70">
              Offre Exclusive
            </span>
            <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-dark leading-tight">
              Consultation Web Gratuite
            </h2>
            <p className="font-body text-base text-dark/80 leading-relaxed">
              Vous avez déjà un site web ? Nous l'analysons gratuitement pour vous proposer des optimisations techniques et stratégiques immédiates.
            </p>
            
            {/* Checklist of what's included */}
            <div className="flex flex-col gap-3.5 my-2">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className="bg-dark text-white rounded-full p-1 shrink-0 flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="font-body text-sm font-semibold text-dark/85">{item.title}</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-body font-medium text-dark/65 italic">
              Sans engagement &middot; Réponse sous 24h &middot; 100% gratuit
            </p>
          </AnimatedSection>

          {/* Right Column: Callback Form */}
          <AnimatedSection className="flex flex-col gap-6">
            <CallBackForm />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
