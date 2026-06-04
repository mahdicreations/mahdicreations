"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Création Web", href: "/creation-site-web" },
  { label: "SEO", href: "/referencement-seo" },
  { label: "Marketing", href: "/marketing-digital" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll detection for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled
          ? "bg-dark/95 backdrop-blur-md border-gold/15 py-3"
          : "bg-dark border-gold/10 py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
        {/* Logo Left */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-transparent.png"
            alt="Mahdi Créations — Agence web Marrakech"
            width={360}
            height={90}
            className="h-[90px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Nav Center - Desktop */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-body transition-colors relative py-1 hover:text-gold ${isActive(link.href) ? "text-gold font-medium" : "text-text-muted"
                }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA Right - Desktop */}
        <div className="hidden lg:block">
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gold-gradient text-dark font-body font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-gold/20 transition-all cursor-pointer"
            >
              Demander un devis
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-text-muted hover:text-gold p-1"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-dark border-t border-gold/15 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-body py-2 hover:text-gold border-b border-white/5 transition-colors ${isActive(link.href) ? "text-gold font-medium" : "text-text-muted"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link href="/contact">
                  <button className="w-full bg-gold-gradient text-dark font-body font-semibold text-base py-3 rounded-full shadow-lg">
                    Demander un devis
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
