"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Monitor,
  Code2,
  AppWindow,
  Palette,
  Search,
  TrendingUp,
  Sparkles,
  Zap,
  Shield,
  UserCheck,
  Star,
  ArrowRight,
  Server,
  Wrench,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceCard } from "@/components/ServiceCard";
import { ConsultationGratuite } from "@/components/ConsultationGratuite";

// Hero entrance animations
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// Services definitions
const services = [
  {
    icon: Monitor,
    title: "Création de Sites Web",
    description: "Conception de sites vitrines et dynamiques, professionnels et e-commerce modernes, rapides et optimisés pour le référencement SEO.",
    href: "/creation-site-web",
  },
  {
    icon: Code2,
    title: "Développement Web Sur Mesure",
    description: "Solutions web personnalisées, fonctionnalités avancées et intégrations d'API adaptées précisément à votre activité.",
    href: "/services",
  },
  {
    icon: AppWindow,
    title: "Applications Web & SaaS",
    description: "Développement d'applications web hautement performantes pour automatiser et digitaliser vos services d'entreprise.",
    href: "/services",
  },
  {
    icon: Palette,
    title: "Design Graphique & Infographie",
    description: "Création d'identité visuelle de luxe, logos, bannières, supports marketing et visuels de communication professionnels.",
    href: "/services",
  },
  {
    icon: Search,
    title: "Référencement Naturel SEO",
    description: "Amélioration de votre positionnement sur Google grâce à un référencement technique, sémantique et netlinking.",
    href: "/referencement-seo",
  },
  {
    icon: TrendingUp,
    title: "Marketing Digital",
    description: "Stratégie digitale d'acquisition, campagnes publicitaires ciblées (Google Ads, Meta Ads) et animation des réseaux sociaux.",
    href: "/marketing-digital",
  },
  {
    icon: Server,
    title: "Hébergement Web & Domaines",
    description: "Hébergement web sécurisé haute performance au Maroc sur serveurs SSD NVMe, certificats SSL gratuits et gestion de vos noms de domaine .ma ou .com.",
    href: "/services",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support Web",
    description: "Maintenance technique, mises à jour de sécurité régulières, sauvegardes automatiques et correction de bugs rapide pour vos sites web à Marrakech et au Maroc.",
    href: "/services",
  },
];

// Why choose us definitions
const features = [
  {
    icon: Sparkles,
    title: "Design Premium",
    desc: "Des sites modernes, élégants et haut de gamme, conçus sur mesure pour refléter l'excellence de votre marque.",
  },
  {
    icon: Zap,
    title: "Performance & Rapidité",
    desc: "Des architectures légères et optimisées pour garantir des temps de chargement ultra-rapides et une expérience utilisateur parfaite.",
  },
  {
    icon: Shield,
    title: "Référencement SEO intégré",
    desc: "Une optimisation technique rigoureuse dès la conception pour assurer votre visibilité sur Google et attirer des clients.",
  },
  {
    icon: UserCheck,
    title: "Accompagnement personnalisé",
    desc: "Un suivi humain, réactif et professionnel à chaque étape de votre projet, et un support continu après la mise en ligne.",
  },
];

// Realisations definitions
const realisations = [
  {
    title: "Riad Marrakech Luxury",
    category: "Site Vitrine & Dynamique",
    desc: "Présentation immersive et système de réservation directe pour un riad haut de gamme au cœur de la médina.",
    image: "/project-riad.png",
  },
  {
    title: "Argan & Co",
    category: "E-commerce Premium",
    desc: "Boutique en ligne raffinée de produits cosmétiques naturels avec paiement CMI sécurisé et logistique intégrée.",
    image: "/project-argan.png",
  },
  {
    title: "Marrakech Invest",
    category: "Identité Visuelle & Web",
    desc: "Branding complet et plateforme immobilière premium pour une clientèle internationale à Marrakech.",
    image: "/project-invest.png",
  },
];

// Testimonials definitions
const testimonials = [
  {
    text: "Une agence d'un grand professionnalisme. Notre site vitrine et dynamique est magnifique et génère déjà d'excellents contacts qualifiés au Maroc et à l'international.",
    author: "Amina El Hariri",
    company: "Riad Jardin Secret",
    rating: 5,
  },
  {
    text: "Mahdi Créations a refait notre site e-commerce et optimisé notre SEO. Nos ventes en ligne ont augmenté de 40% en moins de trois mois.",
    author: "Khalid Benjelloun",
    company: "Morocco Craft",
    rating: 5,
  },
  {
    text: "L'accompagnement est tout simplement exceptionnel. Ils sont toujours disponibles, réactifs et de très bon conseil pour notre marketing digital.",
    author: "Sarah Dupont",
    company: "Luxe Living Marrakech",
    rating: 5,
  },
];

const clientLogos = [
  { src: "/client-azhary.png", alt: "Al Azhary de Peintre" },
  { src: "/client-tensift.png", alt: "Agence de Bassin Hydraulique du Tensift" },
  { src: "/client-gueliz.png", alt: "Conseil de Gueliz Marrakech" },
  { src: "/client-assmann.png", alt: "Assmann" },
  { src: "/client-locevent.png", alt: "Loc-Event Maroc" },
  { src: "/client-groupe-excel.png", alt: "Groupe Excel" },
  { src: "/client-sahara-star-tours.png", alt: "Sahara Star Tours" },
  { src: "/client-red-platinum-tour.png", alt: "Red Platinum Tour" },
  { src: "/client-elhajjaji-tours.png", alt: "Elhajjaji Tours" },
  { src: "/client-palais-chahramane.png", alt: "Palais Chahramane" },
  { src: "/client-offerta-in-marocco.png", alt: "Offerta in Marocco" },
  { src: "/client-riad-abqari-youssefi.png", alt: "Riad Abqari Youssefi" },
  { src: "/client-webkech.png", alt: "Webkech" },
  { src: "/client-sanmao-camp.png", alt: "Sanmao Desert Luxury Camp" },
  { src: "/client-ajoudar-tour.png", alt: "Ajoudar Morocco Tour" },
  { src: "/client-riad-anya.png", alt: "Riad Anya" },
  { src: "/client-ennakhil-spa.png", alt: "Ennakhil Spa" },
];

const partnerLogos = [
  { src: "/partner-img1-0.png", alt: "PrestaShop" },
  { src: "/partner-img1-1.png", alt: "AWS Partner Network" },
  { src: "/partner-img1-2.png", alt: "Google Partner" },
  { src: "/partner-img1-3.png", alt: "Google Cloud Partner" },
  { src: "/partner-img2-0.png", alt: "Meta Business Partner" },
  { src: "/partner-img2-1.png", alt: "Shopify Partners" },
  { src: "/partner-wordpress.svg", alt: "WordPress" },
  { src: "/partner-react.svg", alt: "React" },
  { src: "/partner-node.svg", alt: "Node.js" },
];

const bgImages = [
  "/hero-bg-1.png",
  "/hero-bg-2.png",
  "/hero-bg-3.png",
];

export default function HomePage() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ──────────────────────────────────────
          SECTION 1: HERO
          ────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center noise-overlay py-20">
        {/* Background Slideshow Slider */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentBg}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${bgImages[currentBg]})` }}
            />
          </AnimatePresence>
          {/* Gradients and radial glows for text readability */}
          <div className="absolute inset-0 bg-dark/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.06)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center z-10 relative">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 max-w-4xl mx-auto"
          >
            {/* Small Label */}
            <motion.span
              variants={heroItemVariants}
              className="text-xs font-semibold tracking-[0.35em] text-gold uppercase"
            >
              Agence Web & Digitale &middot; Marrakech, Maroc
            </motion.span>

            {/* H1 Title */}
            <motion.h1
              variants={heroItemVariants}
              className="font-display font-semibold text-5xl sm:text-6xl md:text-8xl leading-tight text-white"
            >
              Créations Web <br />
              <span className="text-gold-gradient">d'Exception</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={heroItemVariants}
              className="font-body text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
            >
              Création de sites web &middot; Référencement SEO &middot; Marketing Digital
            </motion.p>

            {/* Main Paragraph */}
            <motion.p
              variants={heroItemVariants}
              className="font-body text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed opacity-95"
            >
              Mahdi Créations est votre agence web à Marrakech spécialisée dans la création de sites web professionnels, le référencement naturel sur Google et le marketing digital au Maroc.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg shadow-gold/15 cursor-pointer"
                >
                  Demander un devis
                </motion.button>
              </Link>
              <Link href="/contact?type=consultation">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-gold text-gold font-body font-semibold text-base px-8 py-3.5 rounded-full hover:bg-gold/5 transition-all cursor-pointer"
                >
                  Consultation gratuite
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={heroItemVariants}
              className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-6 md:gap-12 text-xs sm:text-sm font-body text-text-muted"
            >
              <span>200+ Sites & Applications créés</span>
              <span className="text-gold/30">|</span>
              <span>100% Clients satisfaits</span>
              <span className="text-gold/30">|</span>
              <span>15 ans d'expérience</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          SECTION: NOS PARTENAIRES (MARQUEE)
          ────────────────────────────────────── */}
      <section className="py-12 bg-dark border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center mb-6">
          <span className="text-[10px] uppercase font-body font-bold tracking-[0.3em] text-text-muted/70">
            Nos Partenaires & Technologies
          </span>
        </div>
        
        <div className="relative w-full overflow-hidden py-4 select-none">
          {/* Left & Right gradient fades for smooth fade edges */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee gap-16 flex items-center">
            {/* First list */}
            {partnerLogos.map((logo, i) => (
              <div key={`partner-1-${i}`} className="relative h-16 flex items-center justify-center shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={56}
                  className="h-14 w-auto object-contain transition-all duration-300 hover:scale-105"
                />
              </div>
            ))}
            {/* Second list for seamless loop */}
            {partnerLogos.map((logo, i) => (
              <div key={`partner-2-${i}`} className="relative h-16 flex items-center justify-center shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={56}
                  className="h-14 w-auto object-contain transition-all duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          SECTION 1.5: VALUE PROPOSITION
          ────────────────────────────────────── */}
      <section className="py-16 bg-dark relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(201,150,12,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <AnimatedSection className="bg-dark-card border border-gold/20 rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl shadow-gold/5 relative overflow-hidden group flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Subtle inner glow that reacts to hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Left Column: Title & Icon */}
            <div className="relative z-10 flex-shrink-0 lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold/10 text-gold rounded-full p-2.5 shadow-[0_0_20px_rgba(201,150,12,0.2)]">
                  <Sparkles size={20} />
                </div>
                <span className="text-[10px] uppercase font-body font-bold tracking-[0.2em] text-gold-light">
                  Notre Vision
                </span>
              </div>
              
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-white leading-tight">
                Avoir un site web <br className="hidden lg:block" />
                <span className="text-gold-gradient">ne suffit plus.</span>
              </h2>
            </div>
            
            {/* Vertical/Horizontal Divider */}
            <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            <div className="block lg:hidden h-px w-full max-w-xs bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            
            {/* Right Column: Text */}
            <div className="relative z-10 lg:w-3/5 flex flex-col gap-4 text-center lg:text-left">
              <p className="font-body text-base md:text-lg text-text-muted leading-relaxed">
                Nous concevons pour vous une plateforme performante, <strong className="text-text-white font-medium">100% responsive</strong> (adaptée à tous les écrans) et <strong className="text-text-white font-medium">ultra-optimisée pour le SEO</strong>.
              </p>
              
              <p className="font-body text-base md:text-lg text-gold-light leading-relaxed font-medium">
                Notre véritable objectif ? Vous rendre visible sur Google, offrir une expérience fluide à vos visiteurs, et les <span className="text-white">transformer en clients</span>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ──────────────────────────────────────
          SECTION 2: SERVICES APERÇU
          ────────────────────────────────────── */}
      <section className="py-24 bg-dark-section border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <AnimatedSection className="text-center mb-16 flex flex-col gap-3 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">
              Nos Services
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white">
              Des solutions digitales complètes
            </h2>
            <p className="font-body text-base text-text-muted mt-2">
              De la création de votre site web à son référencement sur Google, nous vous accompagnons à chaque étape de votre présence digitale.
            </p>
          </AnimatedSection>

          {/* Service Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          SECTION 3: CONSULTATION WEB GRATUITE
          ────────────────────────────────────── */}
      <ConsultationGratuite />

      {/* ──────────────────────────────────────
          SECTION 4: POURQUOI CHOISIR MAHDI CRÉATIONS
          ────────────────────────────────────── */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <AnimatedSection className="text-center mb-16 flex flex-col gap-3">
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">
              Pourquoi choisir Mahdi Créations ?
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection
                  key={idx}
                  delay={idx * 0.1}
                  className="bg-dark-card border border-white/5 rounded-2xl p-8 flex gap-6 hover:border-gold/25 transition-all duration-300"
                >
                  <div className="bg-gold/10 text-gold rounded-xl p-3 shrink-0 h-12 w-12 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-xl text-text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-text-muted">
                      {feature.desc}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Client Logos Marquee at the bottom of Why Choose Us section */}
          <div className="mt-20 pt-16 border-t border-white/5">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase font-body font-bold tracking-[0.3em] text-text-muted/70">
                Ils nous font confiance
              </span>
            </div>
            
            <div className="relative w-full overflow-hidden py-8 select-none bg-zinc-200 rounded-3xl border border-white/10 shadow-inner">
              {/* Left & Right gradient fades for smooth fade edges */}
              <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-zinc-200 to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-zinc-200 to-transparent z-10 pointer-events-none" />
              
              <div className="animate-marquee gap-18 flex items-center">
                {/* First list */}
                {clientLogos.map((logo, i) => (
                  <div key={`client-1-${i}`} className="relative h-20 flex items-center justify-center shrink-0">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={220}
                      height={64}
                      className="h-16 w-auto object-contain transition-all duration-300 hover:scale-105"
                    />
                  </div>
                ))}
                {/* Second list for seamless loop */}
                {clientLogos.map((logo, i) => (
                  <div key={`client-2-${i}`} className="relative h-20 flex items-center justify-center shrink-0">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={220}
                      height={64}
                      className="h-16 w-auto object-contain transition-all duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          SECTION 5: CRÉATION DE SITES WEB AU MAROC (SEO)
          ────────────────────────────────────── */}
      <section className="py-24 bg-cream text-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <AnimatedSection className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xs uppercase font-body font-bold tracking-wider text-gold-deep">
                Leader du Digital
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-5xl text-dark leading-tight">
                Création de site web au Maroc & à Marrakech
              </h2>
            </AnimatedSection>
            <AnimatedSection className="lg:col-span-5 text-sm md:text-base text-dark/80 font-body leading-relaxed">
              En tant qu'**agence web Marrakech** de référence, nous mettons notre expertise au service de la **création de site web Maroc**. Que vous ayez besoin d'un **site vitrine et dynamique Maroc** pour votre image de marque ou d'un **site e-commerce Maroc** performant, nous concevons des plateformes optimales pour vous assurer une présence digitale percutante.
            </AnimatedSection>
          </div>

          {/* 3 type cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Site Vitrine & Dynamique",
                desc: "Valorisez vos services et votre savoir-faire avec un design premium, adapté aux mobiles et optimisé pour le référencement local.",
              },
              {
                title: "Site E-commerce",
                desc: "Développez votre commerce en ligne avec une plateforme sécurisée, optimisée pour le taux de conversion et compatible avec le paiement CMI.",
              },
              {
                title: "Application Web",
                desc: "Digitalisez vos processus métiers grâce à des outils et des architectures web avancées développées sur mesure.",
              },
            ].map((card, idx) => (
              <AnimatedSection
                key={idx}
                delay={idx * 0.15}
                className="bg-white rounded-2xl p-8 border border-dark/5 shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display font-medium text-2xl text-dark mb-4">
                    {card.title}
                  </h3>
                  <p className="font-body text-sm text-dark/70 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>
                <Link
                  href="/creation-site-web"
                  className="font-body text-xs font-semibold text-gold-deep flex items-center gap-1 group mt-auto hover:text-gold transition-colors"
                >
                  Découvrir
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                    &rarr;
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-dark text-white font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg cursor-pointer"
              >
                Demander un devis gratuit
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          SECTION 6: RÉFÉRENCEMENT SEO MAROC
          ────────────────────────────────────── */}
      <section className="py-24 bg-dark-section border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <AnimatedSection className="lg:col-span-6 flex flex-col gap-4">
              <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">
                Visibilité Maximale
              </span>
              <h2 className="font-display font-medium text-3xl md:text-5xl text-white">
                Référencement Naturel & SEO au Maroc
              </h2>
            </AnimatedSection>
            <AnimatedSection className="lg:col-span-6 text-sm md:text-base text-text-muted font-body leading-relaxed">
              Le **SEO référencement** est le levier le plus puissant pour pérenniser votre activité. Nos experts mettent en place des stratégies de **référencement Google Maroc** et de **référencement naturel Marrakech** ciblées pour propulser vos pages en tête des résultats de recherche.
            </AnimatedSection>
          </div>

          {/* 4-step process */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Audit SEO",
                desc: "Analyse complète de la structure technique de votre site, de son contenu et de vos concurrents.",
              },
              {
                step: "02",
                title: "Stratégie",
                desc: "Recherche poussée de mots-clés à fort potentiel de conversion pour votre secteur d'activité.",
              },
              {
                step: "03",
                title: "Optimisation",
                desc: "Optimisation de votre code, de vos textes (on-page) et acquisition de backlinks (off-page).",
              },
              {
                step: "04",
                title: "Résultats",
                desc: "Suivi rigoureux de vos positions sur Google et envoi de rapports de performance mensuels.",
              },
            ].map((proc, idx) => (
              <AnimatedSection
                key={idx}
                delay={idx * 0.1}
                className="bg-dark-card border border-white/5 rounded-2xl p-6 relative hover:border-gold/20 transition-all duration-300"
              >
                <div className="font-display text-4xl font-bold text-gold/20 mb-4">{proc.step}</div>
                <h3 className="font-display font-medium text-lg text-text-white mb-2">
                  {proc.title}
                </h3>
                <p className="font-body text-xs text-text-muted leading-relaxed">
                  {proc.desc}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          SECTION 7: RÉALISATIONS APERÇU
          ────────────────────────────────────── */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
            <AnimatedSection className="flex flex-col gap-3">
              <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">
                Notre Portfolio
              </span>
              <h2 className="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">
                Parmi nos Réalisations
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <Link
                href="/realisations"
                className="font-body text-sm font-semibold text-gold hover:text-gold-light flex items-center gap-1 group transition-colors"
              >
                Voir toutes nos réalisations
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>

          {/* Portfolio grid with 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {realisations.map((item, idx) => (
              <AnimatedSection
                key={idx}
                delay={idx * 0.15}
                className="bg-dark-card border border-white/5 rounded-3xl overflow-hidden group hover:border-gold/30 transition-all duration-300 flex flex-col h-full"
              >
                {/* Stylized CSS Placeholder Image Frame */}
                <div className="h-48 md:h-56 relative overflow-hidden bg-dark">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="font-display font-medium text-base text-gold-light drop-shadow-md">
                      {item.title}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-3 flex-grow">
                  <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-display font-medium text-xl text-text-white group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          SECTION 8: TÉMOIGNAGES
          ────────────────────────────────────── */}
      <section className="py-24 bg-dark-section border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <AnimatedSection className="text-center mb-16 flex flex-col gap-3 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">
              Témoignages
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white">
              Ce que disent nos clients
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <AnimatedSection
                key={idx}
                delay={idx * 0.1}
                className="bg-dark-card border border-white/5 rounded-2xl p-8 flex flex-col gap-6"
              >
                <div className="flex gap-1 text-gold">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="font-body text-sm italic leading-relaxed text-text-muted flex-grow">
                  &ldquo;{test.text}&rdquo;
                </p>
                <div className="border-t border-white/5 pt-4">
                  <h4 className="font-display font-medium text-base text-text-white">
                    {test.author}
                  </h4>
                  <p className="font-body text-xs text-gold mt-0.5">{test.company}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────
          SECTION 9: FINAL CTA
          ────────────────────────────────────── */}
      <section className="relative py-28 bg-dark noise-overlay overflow-hidden">
        {/* Subtle radial gold glow behind text */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.08)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10">
          <AnimatedSection className="flex flex-col gap-6 items-center">
            <h2 className="font-display font-semibold text-4xl md:text-6xl text-gold-gradient">
              Prêt à lancer votre projet web ?
            </h2>
            <p className="font-body text-base md:text-lg text-text-muted max-w-2xl leading-relaxed">
              Parlons de votre projet et donnons vie à vos ambitions digitales. Notre équipe est à votre entière écoute pour concevoir des solutions sur mesure qui feront décoller votre activité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg shadow-gold/10 cursor-pointer"
                >
                  Demander un devis
                </motion.button>
              </Link>
              <Link href="/contact?type=consultation">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-gold text-gold font-body font-semibold text-base px-8 py-3.5 rounded-full hover:bg-gold/5 transition-all cursor-pointer"
                >
                  Consultation gratuite
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
