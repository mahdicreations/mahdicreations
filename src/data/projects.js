// Portfolio projects data
const projects = [
  { title: "Riad Marrakech Luxury", category: "Site Vitrine & Dynamique", desc: "Un site vitrine et dynamique haut de gamme avec réservations directes pour un riad de luxe à Marrakech.", image: "/images/project-riad.png" },
  { title: "Argan & Co", category: "E-commerce", desc: "Boutique en ligne premium de cosmétiques naturels d'argan, avec passerelle de paiement CMI intégrée.", image: "/images/project-argan.png" },
  { title: "Marrakech Invest", category: "Identité Visuelle", desc: "Branding complet, logotype de luxe et charte graphique pour une agence d'investissement immobilier.", image: "/images/project-invest.png" },
  { title: "Atlas Trekking", category: "Site Vitrine & Dynamique", desc: "Plateforme d'excursions guidées dans le Toubkal et le désert, avec gestionnaire de réservation.", image: "/images/project-trekking.png" },
  { title: "Moroccan Rugs Studio", category: "E-commerce", desc: "Showroom digital haut de gamme et vente en ligne de tapis berbères faits main à destination de l'international.", image: "/images/project-rugs.png" },
  { title: "Gueliz Dental Clinic", category: "Identité Visuelle", desc: "Logotype élégant et identité visuelle épurée pour un cabinet dentaire moderne dans le quartier de Guéliz.", image: "/images/project-dental.png" },
  { title: "Kech Law Firm", category: "Site Vitrine & Dynamique", desc: "Site web professionnel pour un cabinet d'avocats international basé à Marrakech, axé sur l'élégance et la crédibilité.", image: "/images/project-law.png" },
  { title: "Bab Atlas Spa", category: "Identité Visuelle", desc: "Identité visuelle de prestige, logotype de luxe et packaging de produits de soin pour un spa haut de gamme.", image: "/images/project-spa.png" },
  { title: "Aya Chic Boutique", category: "E-commerce", desc: "Boutique en ligne moderne de prêt-à-porter de créateurs marocains, optimisée pour mobile et conversion.", image: "/images/project-boutique.png" },
  { title: "Medina Culinary", category: "Site Vitrine & Dynamique", desc: "Site vitrine et dynamique interactif pour une prestigieuse école de cuisine marocaine avec réservation en ligne.", image: "/images/project-culinary.png" },
  { title: "Dar Zellige", category: "Identité Visuelle", desc: "Branding, papeterie de luxe et charte éditoriale pour un showroom d'artisanat d'art et de zelliges haut de gamme.", image: "/images/project-zellige.png" },
  { title: "Marrakech Auto Rental", category: "E-commerce", desc: "Plateforme de réservation et location de voitures de luxe à Marrakech avec paiement en ligne sécurisé.", image: "/images/project-rental.png" },
  { title: "Kech Marketplace", category: "Application Web", desc: "Plateforme B2B/B2C d'artisanat marocain avec gestion logistique internationale et suivi des commandes.", image: "/images/project-marketplace.png" },
  { title: "Riad Management SaaS", category: "Application Web", desc: "Application SaaS de gestion hôtelière complète (PMS), Channel Manager et facturation automatique pour les Riads.", image: "/images/project-rms.png" },
  { title: "Atlas Tour Operator", category: "Application Web", desc: "Système ERP sur mesure pour voyagistes, intégrant la gestion des circuits, des guides et des réservations.", image: "/images/project-tours.png" },
  { title: "Marrakech Food Delivery", category: "Application Web", desc: "Application web progressive (PWA) de commande de repas gastronomiques avec géolocalisation et suivi en temps réel.", image: "/images/project-delivery.png" },
  { title: "Kech Space Co-working", category: "Application Web", desc: "Portail de réservation d'espaces de travail collaboratifs, gestion des abonnements et accès automatisés.", image: "/images/project-coworking.png" },
  { title: "Morocco Clinique Portal", category: "Application Web", desc: "Portail médical sécurisé pour la prise de rendez-vous en ligne, dossiers patients et téléconsultations.", image: "/images/project-clinique.png" },
];

// Homepage preview (3 cards)
const homepageRealisations = [
  { title: "Riad Marrakech Luxury", category: "Site Vitrine & Dynamique", desc: "Présentation immersive et système de réservation directe pour un riad haut de gamme au cœur de la médina.", image: "/images/project-riad.png" },
  { title: "Argan & Co", category: "E-commerce Premium", desc: "Boutique en ligne raffinée de produits cosmétiques naturels avec paiement CMI sécurisé et logistique intégrée.", image: "/images/project-argan.png" },
  { title: "Marrakech Invest", category: "Identité Visuelle & Web", desc: "Branding complet et plateforme immobilière premium pour une clientèle internationale à Marrakech.", image: "/images/project-invest.png" },
];

const categories = ["Tous", "Site Vitrine & Dynamique", "E-commerce", "Application Web", "Identité Visuelle"];

module.exports = { projects, homepageRealisations, categories };
