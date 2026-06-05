"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { blogArticles } from "./data";

export function BlogIndexContent() {
  return (
    <div className="bg-dark text-text-white">
      {/* Header Banner */}
      <section className="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,150,12,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
          <AnimatedSection className="flex flex-col gap-4">
            <span className="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">
              Actualités & Conseils
            </span>
            <h1 className="font-display font-semibold text-5xl md:text-7xl text-white">
              Notre <span className="text-gold-gradient">Blog</span>
            </h1>
            <p className="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">
              Guides, conseils et actualités sur la création web, le référencement SEO, le marketing digital et le branding au Maroc.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogArticles.map((article, idx) => (
            <AnimatedSection
              key={article.slug}
              delay={idx * 0.1}
              className="bg-dark-card border border-white/5 rounded-3xl overflow-hidden group hover:border-gold/30 transition-all duration-300 flex flex-col h-full shadow-lg"
            >
              {/* Article Image */}
              <div className="h-48 sm:h-56 relative overflow-hidden bg-dark">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent opacity-85" />
                <div className="absolute top-4 left-6">
                  <span className="bg-gold/90 text-dark text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                <div>
                  {/* Date & Read Time */}
                  <div className="flex items-center gap-4 text-[11px] text-text-muted font-body mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-gold/60" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-gold/60" />
                      {article.readTime} de lecture
                    </span>
                  </div>

                  <h2 className="font-display font-medium text-lg text-text-white group-hover:text-gold transition-colors duration-300 leading-snug">
                    {article.title}
                  </h2>
                  <p className="font-body text-xs text-text-muted leading-relaxed mt-2">
                    {article.excerpt}
                  </p>
                </div>
                <div className="border-t border-white/5 pt-4 mt-4">
                  <Link href={`/blog/${article.slug}`}>
                    <span className="font-body text-xs font-semibold text-gold group-hover:text-gold-light flex items-center gap-1 group-hover:underline cursor-pointer">
                      Lire l&apos;article
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
