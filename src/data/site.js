// Site-wide shared data
const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Création Web", href: "/creation-site-web" },
  { label: "SEO", href: "/referencement-seo" },
  { label: "Marketing", href: "/marketing-digital" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const clientLogos = [
  { src: "/images/client-azhary.png", alt: "Al Azhary de Peintre" },
  { src: "/images/client-tensift.png", alt: "Agence de Bassin Hydraulique du Tensift" },
  { src: "/images/client-gueliz.png", alt: "Conseil de Gueliz Marrakech" },
  { src: "/images/client-assmann.png", alt: "Assmann" },
  { src: "/images/client-locevent.png", alt: "Loc-Event Maroc" },
  { src: "/images/client-groupe-excel.png", alt: "Groupe Excel" },
  { src: "/images/client-sahara-star-tours.png", alt: "Sahara Star Tours" },
  { src: "/images/client-red-platinum-tour.png", alt: "Red Platinum Tour" },
  { src: "/images/client-elhajjaji-tours.png", alt: "Elhajjaji Tours" },
  { src: "/images/client-palais-chahramane.png", alt: "Palais Chahramane" },
  { src: "/images/client-offerta-in-marocco.png", alt: "Offerta in Marocco" },
  { src: "/images/client-riad-abqari-youssefi.png", alt: "Riad Abqari Youssefi" },
  { src: "/images/client-webkech.png", alt: "Webkech" },
  { src: "/images/client-sanmao-camp.png", alt: "Sanmao Desert Luxury Camp" },
  { src: "/images/client-ajoudar-tour.png", alt: "Ajoudar Morocco Tour" },
  { src: "/images/client-riad-anya.png", alt: "Riad Anya" },
  { src: "/images/client-ennakhil-spa.png", alt: "Ennakhil Spa" },
];

const partnerLogos = [
  { src: "/images/partner-img1-0.png", alt: "PrestaShop" },
  { src: "/images/partner-img1-1.png", alt: "AWS Partner Network" },
  { src: "/images/partner-img1-2.png", alt: "Google Partner" },
  { src: "/images/partner-img1-3.png", alt: "Google Cloud Partner" },
  { src: "/images/partner-img2-0.png", alt: "Meta Business Partner" },
  { src: "/images/partner-img2-1.png", alt: "Shopify Partners" },
  { src: "/images/partner-wordpress.svg", alt: "WordPress" },
  { src: "/images/partner-react.svg", alt: "React" },
  { src: "/images/partner-node.svg", alt: "Node.js" },
];

const testimonials = [
  { text: "Une agence d'un grand professionnalisme. Notre site vitrine et dynamique est magnifique et génère déjà d'excellents contacts qualifiés au Maroc et à l'international.", author: "Amina El Hariri", company: "Riad Jardin Secret", rating: 5 },
  { text: "Mahdi Créations a refait notre site e-commerce et optimisé notre SEO. Nos ventes en ligne ont augmenté de 40% en moins de trois mois.", author: "Khalid Benjelloun", company: "Morocco Craft", rating: 5 },
  { text: "L'accompagnement est tout simplement exceptionnel. Ils sont toujours disponibles, réactifs et de très bon conseil pour notre marketing digital.", author: "Sarah Dupont", company: "Luxe Living Marrakech", rating: 5 },
];

const siteConfig = {
  name: "Mahdi Créations",
  baseUrl: "https://mahdicreations.ma",
  phone: "+212 (0) 6 74 74 75 89",
  phoneHref: "tel:+212674747589",
  email: "mahdicreation.group@gmail.com",
  whatsapp: "https://wa.me/212674747589",
  address: "Av. Mohammed V, Gueliz, Marrakech 40000, Maroc",
  gaId: "G-EY4LVT535S",
  instagram: "https://instagram.com/mahdicreations",
  facebook: "https://facebook.com/mahdicreations",
  linkedin: "https://linkedin.com/company/mahdicreations",
};

module.exports = { navLinks, clientLogos, partnerLogos, testimonials, siteConfig };
