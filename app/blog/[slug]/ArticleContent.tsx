"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { getArticleBySlug, getRelatedArticles } from "../data";

function renderContent(content: string[], inlineImages: string[], title: string) {
  let imageIndex = 0;

  return content.map((block, idx) => {
    // Check for image placeholder
    if (block.startsWith("<<IMAGE_")) {
      const imgSrc = inlineImages[imageIndex];
      imageIndex++;
      if (!imgSrc) return null;
      return (
        <div key={`img-${idx}`} className="my-8 rounded-2xl overflow-hidden border border-white/5">
          <Image
            src={imgSrc}
            alt={`Illustration pour ${title}`}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      );
    }

    // H2 heading
    if (block.startsWith("## ")) {
      return (
        <h2
          key={idx}
          className="font-display font-medium text-2xl md:text-3xl text-gold-gradient mt-12 mb-4"
        >
          {block.replace("## ", "")}
        </h2>
      );
    }

    // H3 heading
    if (block.startsWith("### ")) {
      return (
        <h3
          key={idx}
          className="font-display font-medium text-xl md:text-2xl text-text-white mt-8 mb-3"
        >
          {block.replace("### ", "")}
        </h3>
      );
    }

    // Regular paragraph - render bold text
    const parts = block.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={idx} className="font-body text-sm md:text-base text-text-muted leading-relaxed mb-4">
        {parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i} className="text-text-white font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  });
}

export function ArticleContent({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug);

  if (!article) return null;

  const relatedArticles = getRelatedArticles(article);

  return (
    <div className="bg-dark text-text-white">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <span className="bg-gold/90 text-dark text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit">
                {article.category}
              </span>
              <h1 className="font-display font-semibold text-3xl md:text-5xl text-white leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-xs text-text-muted font-body">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-gold/60" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-gold/60" />
                  {article.readTime} de lecture
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag size={14} className="text-gold/60" />
                  {article.keyword}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
          {/* Back to blog link */}
          <AnimatedSection>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-body text-gold hover:text-gold-light transition-colors mb-10 group"
            >
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              Retour au blog
            </Link>
          </AnimatedSection>

          {/* Article Body */}
          <AnimatedSection className="prose-dark">
            {renderContent(article.content, article.inlineImages, article.title)}
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection className="mt-16 bg-dark-card border border-gold/20 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="font-display font-semibold text-2xl md:text-3xl text-gold-gradient mb-4">
              Besoin d&apos;un accompagnement professionnel ?
            </h3>
            <p className="font-body text-sm md:text-base text-text-muted max-w-xl mx-auto mb-6 leading-relaxed">
              Notre équipe d&apos;experts est à votre écoute pour transformer votre projet digital en réalité. Consultation gratuite et devis sous 24h.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg shadow-gold/15 cursor-pointer"
              >
                Contactez-nous
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-24 bg-dark-section border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <AnimatedSection className="text-center mb-16 flex flex-col gap-3">
              <span className="text-xs uppercase font-body font-semibold tracking-wider text-gold">
                À lire aussi
              </span>
              <h2 className="font-display font-medium text-3xl md:text-4xl text-white">
                Articles similaires
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedArticles.map((related, idx) => (
                <AnimatedSection
                  key={related.slug}
                  delay={idx * 0.1}
                  className="bg-dark-card border border-white/5 rounded-3xl overflow-hidden group hover:border-gold/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-48 relative overflow-hidden bg-dark">
                    <Image
                      src={related.heroImage}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent opacity-85" />
                    <div className="absolute top-4 left-6">
                      <span className="bg-gold/90 text-dark text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {related.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                    <div>
                      <h3 className="font-display font-medium text-lg text-text-white group-hover:text-gold transition-colors duration-300 leading-snug">
                        {related.title}
                      </h3>
                      <p className="font-body text-xs text-text-muted leading-relaxed mt-2">
                        {related.excerpt}
                      </p>
                    </div>
                    <div className="border-t border-white/5 pt-4 mt-4">
                      <Link href={`/blog/${related.slug}`}>
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
          </div>
        </section>
      )}
    </div>
  );
}
