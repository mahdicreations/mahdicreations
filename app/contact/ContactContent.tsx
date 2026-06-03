"use client";

import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ContactForm } from "@/components/ContactForm";
import { CallBackForm } from "@/components/CallBackForm";

export function ContactContent() {
  return (
    <div className="bg-dark text-text-white">
      {/* Header Banner */}
      <section className="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <AnimatedSection className="flex flex-col gap-4">
            <span className="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">
              Contact
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-7xl text-white">
              Contactez <span className="text-gold-gradient">Mahdi Créations</span>
            </h1>
            <p className="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">
              Un projet web ? Une question ou besoin d'un devis gratuit ? Remplissez notre formulaire ou contactez-nous directement via WhatsApp.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <AnimatedSection>
              <h2 className="font-display font-medium text-2xl md:text-3xl text-text-white mb-2">
                Envoyez-nous un message
              </h2>
              <p className="font-body text-sm text-text-muted mb-6 leading-relaxed">
                Remplissez les champs ci-dessous et décrivez-nous vos objectifs. Notre équipe étudiera vos besoins et vous répondra sous 24h.
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>
          </div>

          {/* Right Column: Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <AnimatedSection>
              <h2 className="font-display font-medium text-2xl md:text-3xl text-text-white mb-2">
                Nos Coordonnées
              </h2>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Vous préférez discuter directement ? Retrouvez nos canaux de communication ou demandez votre consultation web gratuite.
              </p>
            </AnimatedSection>

            {/* Details Cards */}
            <div className="flex flex-col gap-6 font-body text-sm">
              {[
                {
                  icon: MapPin,
                  title: "Notre Bureau",
                  value: "Av. Mohammed V, Gueliz, Marrakech 40000, Maroc",
                  href: null,
                },
                {
                  icon: Mail,
                  title: "Adresse Email",
                  value: "contact@mahdicreations.com",
                  href: "mailto:contact@mahdicreations.com",
                },
                {
                  icon: Phone,
                  title: "Téléphone direct",
                  value: "+212 (0) 6 00 00 00 00",
                  href: "tel:+212600000000",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <AnimatedSection
                    key={idx}
                    delay={idx * 0.1}
                    className="bg-dark-card border border-white/5 rounded-2xl p-6 flex gap-4 hover:border-gold/15 transition-all duration-300"
                  >
                    <div className="text-gold shrink-0 mt-0.5">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-body font-bold text-xs uppercase tracking-wider text-text-muted mb-1">
                        {item.title}
                      </h4>
                      {item.href ? (
                        <a href={item.href} className="text-text-white hover:text-gold transition-colors font-medium">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-text-white font-medium">{item.value}</span>
                      )}
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* CallBack Form */}
            <AnimatedSection>
              <CallBackForm />
            </AnimatedSection>

            {/* WhatsApp Link Card */}
            <AnimatedSection className="bg-dark-card border border-gold/15 rounded-3xl p-8 flex flex-col gap-6 items-center text-center">
              <h3 className="font-display font-medium text-xl text-text-white">
                Besoin d'une réponse rapide ?
              </h3>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Discutez en direct avec l'un de nos chefs de projet sur WhatsApp pour obtenir des réponses instantanées ou réserver votre consultation.
              </p>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-gold-gradient text-dark font-body font-semibold text-sm py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2 hover:shadow-gold/20 transition-all cursor-pointer"
                >
                  <MessageCircle size={18} className="fill-current" />
                  Nous contacter via WhatsApp
                </motion.button>
              </a>
              <span className="text-[10px] text-text-muted uppercase tracking-widest font-body font-semibold">
                Ou demandez votre consultation gratuite directement
              </span>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
