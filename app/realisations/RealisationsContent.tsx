"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

const categories = ["Tous", "Site Vitrine & Dynamique", "E-commerce", "Identité Visuelle"];

const projects = [
  {
    title: "Riad Marrakech Luxury",
    category: "Site Vitrine & Dynamique",
    desc: "Un site vitrine et dynamique haut de gamme avec réservations directes pour un riad de luxe à Marrakech.",
    image: "/project-riad.png",
  },
  {
    title: "Argan & Co",
    category: "E-commerce",
    desc: "Boutique en ligne premium de cosmétiques naturels d'argan, avec passerelle de paiement CMI intégrée.",
    image: "/project-argan.png",
  },
  {
    title: "Marrakech Invest",
    category: "Identité Visuelle",
    desc: "Branding complet, logotype de luxe et charte graphique pour une agence d'investissement immobilier.",
    image: "/project-invest.png",
  },
  {
    title: "Atlas Trekking",
    category: "Site Vitrine & Dynamique",
    desc: "Plateforme d'excursions guidées dans le Toubkal et le désert, avec gestionnaire de réservation.",
    image: "/project-trekking.png",
  },
  {
    title: "Moroccan Rugs Studio",
    category: "E-commerce",
    desc: "Showroom digital haut de gamme et vente en ligne de tapis berbères faits main à destination de l'international.",
    image: "/project-rugs.png",
  },
  {
    title: "Gueliz Dental Clinic",
    category: "Identité Visuelle",
    desc: "Logotype élégant et identité visuelle épurée pour un cabinet dentaire moderne dans le quartier de Guéliz.",
    image: "/project-dental.png",
  },
  {
    title: "Kech Law Firm",
    category: "Site Vitrine & Dynamique",
    desc: "Site web professionnel pour un cabinet d'avocats international basé à Marrakech, axé sur l'élégance et la crédibilité.",
    image: "/project-law.png",
  },
  {
    title: "Bab Atlas Spa",
    category: "Identité Visuelle",
    desc: "Identité visuelle de prestige, logotype de luxe et packaging de produits de soin pour un spa haut de gamme à Marrakech.",
    image: "/project-spa.png",
  },
  {
    title: "Aya Chic Boutique",
    category: "E-commerce",
    desc: "Boutique en ligne moderne de prêt-à-porter de créateurs marocains, optimisée pour mobile et conversion.",
    image: "/project-boutique.png",
  },
  {
    title: "Medina Culinary",
    category: "Site Vitrine & Dynamique",
    desc: "Site vitrine et dynamique interactif pour une prestigieuse école de cuisine marocaine avec réservation en ligne.",
    image: "/project-culinary.png",
  },
  {
    title: "Dar Zellige",
    category: "Identité Visuelle",
    desc: "Branding, papeterie de luxe et charte éditoriale pour un showroom d'artisanat d'art et de zelliges haut de gamme.",
    image: "/project-zellige.png",
  },
  {
    title: "Marrakech Auto Rental",
    category: "E-commerce",
    desc: "Plateforme de réservation et location de voitures de luxe à Marrakech avec paiement en ligne sécurisé.",
    image: "/project-rental.png",
  },
];

export function RealisationsContent() {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "Tous") return true;
    return project.category === activeFilter;
  });

  return (
    <div className="bg-dark text-text-white">
      {/* Header Banner */}
      <section className="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <AnimatedSection className="flex flex-col gap-4">
            <span className="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">
              Notre Portfolio
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-7xl text-white">
              Parmi nos <span className="text-gold-gradient">réalisations</span>
            </h1>
            <p className="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">
              Découvrez nos récents projets web et design. Des solutions raffinées conçues avec précision pour nos clients au Maroc et ailleurs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Options */}
      <section className="py-12 border-b border-white/5 bg-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all cursor-pointer ${
                activeFilter === category
                  ? "bg-gold-gradient text-dark shadow-md"
                  : "border border-white/10 text-text-muted hover:border-gold/30 hover:text-gold"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                key={project.title}
                className="bg-dark-card border border-white/5 rounded-3xl overflow-hidden group hover:border-gold/30 transition-all duration-300 flex flex-col h-full shadow-lg"
              >
                {/* Stylized Project Image Mockup */}
                <div className="h-48 sm:h-56 relative overflow-hidden bg-dark">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="font-display font-medium text-base text-gold-light drop-shadow-md">
                      {project.title}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                  <div>
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-display font-medium text-xl text-text-white group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-text-muted leading-relaxed mt-2">
                      {project.desc}
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-4 mt-4">
                    <Link href="/contact">
                      <span className="font-body text-xs font-semibold text-gold group-hover:text-gold-light flex items-center gap-1 group-hover:underline cursor-pointer">
                        Étudier un projet similaire
                        <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
