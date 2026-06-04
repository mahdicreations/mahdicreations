"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Phone, Calendar, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface CallBackInput {
  name: string;
  phone: string;
  callDate: string;
}

export function CallBackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CallBackInput>({
    defaultValues: {
      name: "",
      phone: "",
      callDate: "",
    },
  });

  const onSubmit = async (data: CallBackInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "callback",
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
      setSubmitError(err.message || "Impossible de planifier l'appel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark/40 backdrop-blur-md border border-dark/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-4 shadow-xl min-h-[350px]"
      >
        <div className="bg-dark text-gold p-4 rounded-full">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="font-display font-medium text-2xl text-dark">
          Demande Reçue !
        </h3>
        <p className="font-body text-sm text-dark/80 max-w-xs leading-relaxed">
          Merci. Un conseiller de Mahdi Créations vous appellera le jour et à l'heure convenus pour votre entretien personnalisé.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 bg-dark text-white hover:bg-dark/90 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer shadow-md"
        >
          Planifier un autre appel
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/30 shadow-xl flex flex-col gap-6">
      <div>
        <h3 className="font-display font-semibold text-2xl text-dark mb-1">
          Laissez-nous vous contacter
        </h3>
        <p className="font-body text-xs text-dark/75">
          Renseignez vos coordonnées pour être rappelé gratuitement par nos experts.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="callback-name" className="font-body text-[10px] font-bold text-dark/80 uppercase tracking-wider">
            Nom complet *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-dark/60">
              <User size={16} />
            </span>
            <input
              id="callback-name"
              type="text"
              placeholder="Ex: Youssef El Alami"
              className={`w-full bg-white/70 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-dark placeholder-dark/40 font-body focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                errors.name
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                  : "border-dark/15 focus:border-dark focus:ring-dark"
              }`}
              {...register("name", { required: "Veuillez renseigner votre nom." })}
            />
          </div>
          {errors.name && (
            <span className="text-[10px] text-red-700 font-medium">{errors.name.message}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="callback-phone" className="font-body text-[10px] font-bold text-dark/80 uppercase tracking-wider">
            Numéro de téléphone *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-dark/60">
              <Phone size={16} />
            </span>
            <input
              id="callback-phone"
              type="tel"
              placeholder="Ex: 0612345678"
              className={`w-full bg-white/70 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-dark placeholder-dark/40 font-body focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                errors.phone
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                  : "border-dark/15 focus:border-dark focus:ring-dark"
              }`}
              {...register("phone", {
                required: "Veuillez renseigner votre numéro.",
                pattern: {
                  value: /^(?:\+212|0)[5-7]\d{8}$/,
                  message: "Numéro marocain requis (ex: 0612345678).",
                },
              })}
            />
          </div>
          {errors.phone && (
            <span className="text-[10px] text-red-700 font-medium">{errors.phone.message}</span>
          )}
        </div>

        {/* Date to be called */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="callback-date" className="font-body text-[10px] font-bold text-dark/80 uppercase tracking-wider">
            Date & Heure souhaitées *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-dark/60">
              <Calendar size={16} />
            </span>
            <input
              id="callback-date"
              type="datetime-local"
              className={`w-full bg-white/70 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-dark placeholder-dark/40 font-body focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                errors.callDate
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                  : "border-dark/15 focus:border-dark focus:ring-dark"
              }`}
              {...register("callDate", { required: "Veuillez choisir une date d'appel." })}
            />
          </div>
          {errors.callDate && (
            <span className="text-[10px] text-red-700 font-medium">{errors.callDate.message}</span>
          )}
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="text-xs text-red-700 bg-red-100 border border-red-200 rounded-xl p-3 text-center font-medium">
            {submitError}
          </div>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 w-full bg-dark text-white font-body font-semibold text-sm py-3 rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-dark/95 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Validation...
            </>
          ) : (
            <>
              Planifier mon appel
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
