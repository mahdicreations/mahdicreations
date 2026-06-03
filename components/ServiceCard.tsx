"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  const CardContent = (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="bg-dark-card border border-gold/15 rounded-2xl p-8 h-full flex flex-col justify-between gold-glow-hover relative overflow-hidden group cursor-pointer"
    >
      {/* Decorative background subtle glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors duration-500" />

      <div>
        {/* SVG Gradient definition for Lucide Icon */}
        <div className="w-0 h-0 absolute pointer-events-none">
          <svg>
            <linearGradient id="gold-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0d080" />
              <stop offset="35%" stopColor="#c9960c" />
              <stop offset="100%" stopColor="#8b6914" />
            </linearGradient>
          </svg>
        </div>

        {/* Icon Container */}
        <div className="mb-6 p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl w-14 h-14 flex items-center justify-center group-hover:border-gold/30 transition-all duration-300">
          <Icon className="w-8 h-8" style={{ stroke: "url(#gold-icon-grad)" }} />
        </div>

        {/* Title */}
        <h3 className="font-display font-medium text-xl md:text-2xl text-text-white mb-3 group-hover:text-gold-light transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm leading-relaxed text-text-muted mb-6">
          {description}
        </p>
      </div>

      {/* Link Text */}
      {href && (
        <div className="font-body text-xs font-semibold text-gold group-hover:text-gold-light flex items-center gap-1 mt-auto">
          En savoir plus
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">
            &rarr;
          </span>
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
