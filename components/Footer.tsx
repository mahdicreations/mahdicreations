"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark text-text-white border-t border-gold/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Logo, Description & Socials */}
        <div className="flex flex-col gap-6">
          <Link href="/">
            <Image
              src="/logo-transparent.png"
              alt="Mahdi Créations — Agence web Marrakech"
              width={400}
              height={100}
              className="h-[100px] w-auto object-contain"
            />
          </Link>
          <p className="text-text-muted text-sm font-body leading-relaxed">
            Mahdi Créations est une agence web et marketing digital de premier plan à Marrakech. Nous créons des expériences digitales de luxe, alliant design raffiné et performances techniques d'exception.
          </p>
          <div className="flex items-center gap-4 text-text-muted">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5 stroke-current"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.062 5.248 5.308 0 11.786 0c3.14 0 6.095 1.22 8.317 3.441 2.222 2.22 3.441 5.176 3.44 8.317-.005 6.486-5.25 11.735-11.725 11.735-2.004-.001-3.974-.51-5.713-1.479L0 24zm6.59-4.846c1.6.95 3.167 1.45 4.887 1.455 5.253 0 9.526-4.267 9.53-9.522a9.458 9.458 0 0 0-2.775-6.733 9.467 9.467 0 0 0-6.74-2.77c-5.258 0-9.53 4.272-9.534 9.53a9.489 9.489 0 0 0 1.503 5.097l-.997 3.637 3.737-.981c1.547.84 3.097 1.282 4.624 1.282zm9.722-6.52c-.27-.135-1.602-.79-1.85-.88-.25-.09-.432-.135-.612.135-.18.27-.697.88-.855 1.062-.158.18-.315.2-.585.065-.27-.135-1.138-.42-2.17-1.34-1.03-.92-1.72-2.05-1.92-2.39-.2-.34-.02-.52.15-.69.15-.15.34-.395.51-.59.17-.195.23-.34.34-.565.11-.22.06-.42-.03-.59-.09-.17-.61-1.48-.84-2.025-.224-.54-.47-.466-.646-.475-.166-.008-.356-.01-.546-.01-.19 0-.5.07-.76.36-.26.29-.99 1.01-.99 2.46 0 1.45 1.05 2.85 1.2 3.05.15.2 2.07 3.224 5.02 4.5 1.83.79 2.5 1.01 3.4 1.01.91 0 2.76-.79 3.06-1.57.3-.77.3-1.44.21-1.57-.09-.13-.27-.22-.54-.355z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Services Links */}
        <div className="flex flex-col gap-6">
          <h3 className="font-display font-medium text-lg text-gold">Nos Services</h3>
          <ul className="flex flex-col gap-3 font-body text-sm text-text-muted">
            <li>
              <Link href="/creation-site-web" className="hover:text-gold transition-colors">
                Création de Sites Web
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors">
                Développement Web sur Mesure
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors">
                Applications Web & SaaS
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors">
                Design Graphique & Logos
              </Link>
            </li>
            <li>
              <Link href="/referencement-seo" className="hover:text-gold transition-colors">
                Référencement Naturel SEO
              </Link>
            </li>
            <li>
              <Link href="/marketing-digital" className="hover:text-gold transition-colors">
                Marketing Digital & Pub
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors">
                Hébergement Web & Domaines
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors">
                Maintenance & Support Web
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Pages Links */}
        <div className="flex flex-col gap-6">
          <h3 className="font-display font-medium text-lg text-gold">Plan du site</h3>
          <ul className="flex flex-col gap-3 font-body text-sm text-text-muted">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:text-gold transition-colors">
                À propos de l'agence
              </Link>
            </li>
            <li>
              <Link href="/realisations" className="hover:text-gold transition-colors">
                Parmi nos Réalisations
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-gold transition-colors">
                Questions Fréquentes (FAQ)
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gold transition-colors">
                Blog & Actualités
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold transition-colors">
                Contactez-nous
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="flex flex-col gap-6 font-body text-sm">
          <h3 className="font-display font-medium text-lg text-gold">Contact</h3>
          <ul className="flex flex-col gap-4 text-text-muted">
            <li className="flex gap-3">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span>Av. Mohammed V, Gueliz, Marrakech 40000, Maroc</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold shrink-0" />
              <a href="mailto:mahdicreation.group@gmail.com" className="hover:text-gold transition-colors">
                mahdicreation.group@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold shrink-0" />
              <a href="tel:+212674747589" className="hover:text-gold transition-colors">
                +212 (0) 6 74 74 75 89
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-body text-text-muted">
        <div>
          &copy; {new Date().getFullYear()} Mahdi Créations. Tous droits réservés.
        </div>
        <div className="flex gap-4">
          <span>Agence web Marrakech</span>
          <span>|</span>
          <Link href="/privacy" className="hover:text-gold transition-colors">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
