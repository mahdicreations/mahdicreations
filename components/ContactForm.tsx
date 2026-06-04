"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";

interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact",
          ...data,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Une erreur est survenue lors de l'envoi.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setSubmitError(err.message || "Impossible d'envoyer votre message pour le moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark-card border border-gold/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-4 shadow-xl"
      >
        <div className="bg-gold/10 p-4 rounded-full text-gold">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="font-display font-medium text-2xl text-text-white">
          Message Envoyé !
        </h3>
        <p className="font-body text-sm text-text-muted max-w-sm leading-relaxed">
          Merci pour votre message. Un conseiller de Mahdi Créations vous recontactera sous 24 heures pour étudier votre projet.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 border border-gold text-gold hover:bg-gold hover:text-dark px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-dark-card border border-gold/15 rounded-3xl p-8 flex flex-col gap-6 shadow-xl relative"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
            Nom complet *
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ex: Youssef El Alami"
            className={`bg-dark border rounded-xl px-4 py-3 text-sm text-text-white font-body focus:outline-none focus:ring-1 transition-all ${
              errors.name
                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                : "border-gold/20 focus:border-gold focus:ring-gold"
            }`}
            {...register("name", { required: "Veuillez renseigner votre nom." })}
          />
          {errors.name && (
            <span className="text-xs text-red-400">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
            Adresse email *
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ex: youssef@gmail.com"
            className={`bg-dark border rounded-xl px-4 py-3 text-sm text-text-white font-body focus:outline-none focus:ring-1 transition-all ${
              errors.email
                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                : "border-gold/20 focus:border-gold focus:ring-gold"
            }`}
            {...register("email", {
              required: "Veuillez renseigner votre email.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Format d'adresse email invalide.",
              },
            })}
          />
          {errors.email && (
            <span className="text-xs text-red-400">{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
            Téléphone / WhatsApp *
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Ex: +212 6 12 34 56 78"
            className={`bg-dark border rounded-xl px-4 py-3 text-sm text-text-white font-body focus:outline-none focus:ring-1 transition-all ${
              errors.phone
                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                : "border-gold/20 focus:border-gold focus:ring-gold"
            }`}
            {...register("phone", {
              required: "Veuillez renseigner votre numéro de téléphone.",
              pattern: {
                value: /^(?:\+212|0)[5-7]\d{8}$/,
                message: "Format marocain valide requis (ex: 0612345678 ou +212612345678).",
              },
            })}
          />
          {errors.phone && (
            <span className="text-xs text-red-400">{errors.phone.message}</span>
          )}
        </div>

        {/* Service Dropdown */}
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
            Service Souhaité *
          </label>
          <select
            id="service"
            className={`bg-dark border rounded-xl px-4 py-3 text-sm text-text-white font-body focus:outline-none focus:ring-1 transition-all appearance-none ${
              errors.service
                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                : "border-gold/20 focus:border-gold focus:ring-gold"
            }`}
            {...register("service", { required: "Veuillez sélectionner un service." })}
          >
            <option value="" disabled className="text-white/40">Choisir un service...</option>
            <option value="site-vitrine">Création de Site Vitrine et Dynamique</option>
            <option value="site-ecommerce">Création de Site E-commerce</option>
            <option value="app-sur-mesure">Développement Web Sur Mesure</option>
            <option value="seo">Référencement Naturel SEO</option>
            <option value="marketing-digital">Stratégie Marketing Digital</option>
            <option value="design-graphique">Design Graphique & Identité</option>
            <option value="autre">Autre Projet</option>
          </select>
          {errors.service && (
            <span className="text-xs text-red-400">{errors.service.message}</span>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
          Parlez-nous de votre projet *
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Décrivez brièvement vos besoins, vos objectifs et vos délais..."
          className={`bg-dark border rounded-xl px-4 py-3 text-sm text-text-white font-body focus:outline-none focus:ring-1 transition-all ${
            errors.message
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
              : "border-gold/20 focus:border-gold focus:ring-gold"
          }`}
          {...register("message", {
            required: "Veuillez détailler votre projet.",
            minLength: { value: 15, message: "Veuillez écrire au moins 15 caractères." },
          })}
        />
        {errors.message && (
          <span className="text-xs text-red-400">{errors.message.message}</span>
        )}
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="text-sm text-red-400 bg-red-950/20 border border-red-500/30 rounded-xl p-3 text-center">
          {submitError}
        </div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gold-gradient text-dark font-body font-semibold text-base py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2 hover:shadow-gold/20 transition-all disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Envoyer ma demande
          </>
        )}
      </motion.button>
    </form>
  );
}
