/**
 * Mahdi Créations — build.js
 * Static site HTML generator
 * Run: node build.js
 */

const fs = require('fs');
const path = require('path');

const { blogArticles } = require('./src/data/blog.js');
const { projects, homepageRealisations, categories } = require('./src/data/projects.js');
const { navLinks, clientLogos, partnerLogos, testimonials, siteConfig } = require('./src/data/site.js');

const DIST = path.join(__dirname, 'dist');

// ── Ensure directories exist ──────────────────────────────
function mkdirp(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ── Copy public assets to dist/images/ ───────────────────
function copyImages() {
  const src = path.join(__dirname, 'public');
  const dest = path.join(DIST, 'images');
  mkdirp(dest);
  fs.readdirSync(src).forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
    }
  });
  // Copy favicon to dist root
  const faviconSrc = path.join(__dirname, 'app', 'favicon.ico');
  if (fs.existsSync(faviconSrc)) {
    fs.copyFileSync(faviconSrc, path.join(DIST, 'favicon.ico'));
  }
  console.log('✅ Images copied to dist/images/');
}

// ── Markdown-like parser ───────────────────────────────────
function parseContent(paragraph) {
  if (paragraph.startsWith('<<IMAGE_') && paragraph.endsWith('>>')) {
    return null; // handled separately with index
  }
  if (paragraph.startsWith('## ')) {
    return `<h2>${parseBold(paragraph.slice(3))}</h2>`;
  }
  if (paragraph.startsWith('### ')) {
    return `<h3>${parseBold(paragraph.slice(4))}</h3>`;
  }
  return `<p>${parseBold(paragraph)}</p>`;
}

function parseBold(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function renderBlogContent(content, inlineImages) {
  let imageCounter = 0;
  return content.map(para => {
    if (para.startsWith('<<IMAGE_') && para.endsWith('>>')) {
      const idx = parseInt(para.replace('<<IMAGE_', '').replace('>>', '')) - 1;
      const imgSrc = inlineImages[idx] || '';
      if (!imgSrc) return '';
      return `<img src="${imgSrc}" alt="Illustration" width="800" height="320" loading="lazy" decoding="async">`;
    }
    return parseContent(para) || '';
  }).join('\n');
}

// ── Icon SVGs (replacing lucide-react icons) ─────────────
const icons = {
  Monitor: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  Code2: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
  AppWindow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v4"/><path d="M2 8h20"/><path d="M6 4v4"/></svg>`,
  Palette: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  Search: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  TrendingUp: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  Server: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>`,
  Wrench: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  Sparkles: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  Zap: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
  Shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
  UserCheck: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
  ArrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  Star: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  Calendar: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
  Clock: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  MapPin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  Mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  Phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.59 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  MessageCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
  Check: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  ChevronDown: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-chevron"><polyline points="6 9 12 15 18 9"/></svg>`,
  Loader: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
  Send: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
  CheckCircle: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  Compass: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  Lightbulb: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  Trophy: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  User: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  CalendarIcon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
  CheckCircle2: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
};

// ── Social media SVGs ──────────────────────────────────────
const socialIcons = {
  instagram: `<svg class="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  facebook: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>`,
  linkedin: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  whatsapp: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>`,
};

// ── Shared <head> partial ─────────────────────────────────
function renderHead({ title, description, canonical, ogImage = '/images/logo.png', ogType = 'website', extraMeta = '' }) {
  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${siteConfig.baseUrl}${canonical}">
  <meta name="robots" content="index, follow">
  <link rel="icon" href="/favicon.ico">

  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${siteConfig.baseUrl}${canonical}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:image" content="${siteConfig.baseUrl}${ogImage}">
  <meta property="og:locale" content="fr_MA">
  <meta property="og:site_name" content="Mahdi Créations">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${siteConfig.baseUrl}${ogImage}">

  ${extraMeta}

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

  <!-- Tailwind CSS -->
  <link rel="stylesheet" href="/assets/css/style.css">

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${siteConfig.gaId}');
  </script>`;
}

// ── LocalBusiness JSON-LD ─────────────────────────────────
function localBusinessJsonLd() {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Mahdi Créations",
  "description": "Agence web à Marrakech spécialisée dans la création de sites web professionnels, le référencement naturel SEO et le marketing digital au Maroc.",
  "url": "${siteConfig.baseUrl}",
  "logo": "${siteConfig.baseUrl}/images/logo.png",
  "image": "${siteConfig.baseUrl}/images/logo.png",
  "telephone": "+212674747589",
  "email": "${siteConfig.email}",
  "priceRange": "MAD",
  "openingHours": "Mo-Fr 09:00-18:00",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Mohammed V, Gueliz",
    "addressLocality": "Marrakech",
    "postalCode": "40000",
    "addressCountry": "MA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.6295,
    "longitude": -7.9811
  },
  "sameAs": ["${siteConfig.instagram}", "${siteConfig.facebook}", "${siteConfig.linkedin}"]
}
</script>`;
}

// ── Header HTML ───────────────────────────────────────────
function renderHeader(currentPath = '/') {
  const navItems = navLinks.map(link => {
    const isActive = link.href === '/' ? currentPath === '/' : currentPath.startsWith(link.href);
    return `<a href="${link.href}" data-nav-link class="text-sm font-body transition-colors relative py-1 hover:text-gold ${isActive ? 'text-gold font-medium' : 'text-text-muted'}">${link.label}</a>`;
  }).join('\n          ');

  const mobileNavItems = navLinks.map(link => {
    const isActive = link.href === '/' ? currentPath === '/' : currentPath.startsWith(link.href);
    return `<a href="${link.href}" data-nav-link class="text-base font-body py-2 hover:text-gold border-b border-white/5 transition-colors ${isActive ? 'text-gold font-medium' : 'text-text-muted'}">${link.label}</a>`;
  }).join('\n          ');

  return `
<header id="site-header">
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="flex items-center">
      <img
        src="/images/logo-transparent.png"
        alt="Mahdi Créations — Agence web Marrakech"
        width="360" height="90"
        class="h-[90px] w-auto object-contain"
        loading="eager"
        fetchpriority="high"
      >
    </a>

    <!-- Desktop Nav -->
    <nav class="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Navigation principale">
      ${navItems}
    </nav>

    <!-- Desktop CTA -->
    <div class="hidden lg:block">
      <a href="/contact" class="bg-gold-gradient text-dark font-body font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-gold/20 transition-all hover:scale-[1.03] active:scale-[0.97] inline-block">
        Demander un devis
      </a>
    </div>

    <!-- Mobile Menu Button -->
    <button id="menu-btn" class="lg:hidden text-text-muted hover:text-gold p-1 transition-colors" aria-label="Ouvrir le menu de navigation" aria-expanded="false" aria-controls="mobile-nav">
      <span id="menu-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </span>
      <span id="close-icon" style="display:none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </span>
    </button>
  </div>

  <!-- Mobile Nav Drawer -->
  <div id="mobile-nav" class="lg:hidden bg-dark border-t border-gold/15" aria-hidden="true">
    <div class="px-4 py-6 flex flex-col gap-4 max-w-7xl mx-auto">
      ${mobileNavItems}
      <div class="pt-4">
        <a href="/contact" class="w-full bg-gold-gradient text-dark font-body font-semibold text-base py-3 rounded-full shadow-lg block text-center">
          Demander un devis
        </a>
      </div>
    </div>
  </div>
</header>`;
}

// ── Footer HTML ───────────────────────────────────────────
function renderFooter() {
  return `
<footer class="bg-dark text-text-white border-t border-gold/20 pt-16 pb-8">
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
    <!-- Col 1: Logo + Description + Socials -->
    <div class="flex flex-col gap-6">
      <a href="/">
        <img src="/images/logo-transparent.png" alt="Mahdi Créations — Agence web Marrakech" width="400" height="100" class="h-[100px] w-auto object-contain" loading="lazy" decoding="async">
      </a>
      <p class="text-text-muted text-sm font-body leading-relaxed">
        Mahdi Créations est une agence web et marketing digital de premier plan à Marrakech. Nous créons des expériences digitales de luxe, alliant design raffiné et performances techniques d'exception.
      </p>
      <div class="flex items-center gap-4 text-text-muted">
        <a href="${siteConfig.instagram}" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors" aria-label="Instagram">
          ${socialIcons.instagram}
        </a>
        <a href="${siteConfig.facebook}" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors" aria-label="Facebook">
          ${socialIcons.facebook}
        </a>
        <a href="${siteConfig.linkedin}" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors" aria-label="LinkedIn">
          ${socialIcons.linkedin}
        </a>
        <a href="${siteConfig.whatsapp}" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors" aria-label="WhatsApp">
          ${socialIcons.whatsapp}
        </a>
      </div>
    </div>

    <!-- Col 2: Services -->
    <div class="flex flex-col gap-6">
      <h3 class="font-display font-medium text-lg text-gold">Nos Services</h3>
      <ul class="flex flex-col gap-3 font-body text-sm text-text-muted">
        <li><a href="/creation-site-web" class="hover:text-gold transition-colors">Création de Sites Web</a></li>
        <li><a href="/services" class="hover:text-gold transition-colors">Développement Web sur Mesure</a></li>
        <li><a href="/services" class="hover:text-gold transition-colors">Applications Web & SaaS</a></li>
        <li><a href="/services" class="hover:text-gold transition-colors">Design Graphique & Logos</a></li>
        <li><a href="/referencement-seo" class="hover:text-gold transition-colors">Référencement Naturel SEO</a></li>
        <li><a href="/marketing-digital" class="hover:text-gold transition-colors">Marketing Digital & Pub</a></li>
        <li><a href="/services" class="hover:text-gold transition-colors">Hébergement Web & Domaines</a></li>
        <li><a href="/services" class="hover:text-gold transition-colors">Maintenance & Support Web</a></li>
      </ul>
    </div>

    <!-- Col 3: Site Map -->
    <div class="flex flex-col gap-6">
      <h3 class="font-display font-medium text-lg text-gold">Plan du site</h3>
      <ul class="flex flex-col gap-3 font-body text-sm text-text-muted">
        <li><a href="/" class="hover:text-gold transition-colors">Accueil</a></li>
        <li><a href="/a-propos" class="hover:text-gold transition-colors">À propos de l'agence</a></li>
        <li><a href="/realisations" class="hover:text-gold transition-colors">Parmi nos Réalisations</a></li>
        <li><a href="/faq" class="hover:text-gold transition-colors">Questions Fréquentes (FAQ)</a></li>
        <li><a href="/blog" class="hover:text-gold transition-colors">Blog & Actualités</a></li>
        <li><a href="/contact" class="hover:text-gold transition-colors">Contactez-nous</a></li>
      </ul>
    </div>

    <!-- Col 4: Contact -->
    <div class="flex flex-col gap-6 font-body text-sm">
      <h3 class="font-display font-medium text-lg text-gold">Contact</h3>
      <ul class="flex flex-col gap-4 text-text-muted">
        <li class="flex gap-3">
          <span class="text-gold shrink-0 mt-0.5">${icons.MapPin}</span>
          <span>Av. Mohammed V, Gueliz, Marrakech 40000, Maroc</span>
        </li>
        <li class="flex items-center gap-3">
          <span class="text-gold shrink-0">${icons.Mail}</span>
          <a href="mailto:${siteConfig.email}" class="hover:text-gold transition-colors">${siteConfig.email}</a>
        </li>
        <li class="flex items-center gap-3">
          <span class="text-gold shrink-0">${icons.Phone}</span>
          <a href="${siteConfig.phoneHref}" class="hover:text-gold transition-colors">${siteConfig.phone}</a>
        </li>
      </ul>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-body text-text-muted">
    <div>&copy; <span id="copyright-year"></span> Mahdi Créations. Tous droits réservés.</div>
    <div class="flex gap-4">
      <span>Agence web Marrakech</span>
      <span>|</span>
      <a href="/privacy" class="hover:text-gold transition-colors">Politique de confidentialité</a>
    </div>
  </div>
</footer>

<!-- Scroll To Top -->
<button id="scroll-top" class="fixed bottom-6 right-6 z-50 bg-gold text-dark rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-gold/20 hover:bg-gold-light transition-all" aria-label="Retour en haut de page">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<script src="/assets/js/main.js"></script>`;
}

// ── Full page wrapper ────────────────────────────────────
function renderPage({ path: pagePath, title, description, canonical, ogImage, ogType, extraMeta, jsonLd = '', body }) {
  const head = renderHead({ title, description, canonical: canonical || pagePath, ogImage, ogType, extraMeta });
  const header = renderHeader(pagePath);
  const footer = renderFooter();
  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
${head}
${jsonLd}
</head>
<body class="min-h-full flex flex-col bg-dark text-text-white font-body selection:bg-gold selection:text-dark">
${header}
<main class="flex-grow">
${body}
</main>
${footer}
</body>
</html>`;
}

// ── Marquee helpers ───────────────────────────────────────
function renderMarquee(logos, speed = '25s', classes = '') {
  const items = logos.map(l => `<div class="relative h-16 flex items-center justify-center shrink-0"><img src="${l.src}" alt="${l.alt}" width="200" height="56" class="h-14 w-auto object-contain transition-all duration-300 hover:scale-105" loading="lazy" decoding="async"></div>`).join('\n');
  return `
<div class="relative w-full overflow-hidden py-4 select-none ${classes}">
  <div class="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
  <div class="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>
  <div class="animate-marquee gap-16 flex items-center" style="animation-duration:${speed}">
    ${items}
    ${items}
  </div>
</div>`;
}

function renderClientMarquee(logos) {
  const items = logos.map(l => `<div class="relative h-20 flex items-center justify-center shrink-0"><img src="${l.src}" alt="${l.alt}" width="220" height="64" class="h-16 w-auto object-contain transition-all duration-300 hover:scale-105" loading="lazy" decoding="async"></div>`).join('\n');
  return `
<div class="relative w-full overflow-hidden py-8 select-none bg-zinc-200 rounded-3xl border border-white/10 shadow-inner">
  <div class="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-zinc-200 to-transparent z-10 pointer-events-none"></div>
  <div class="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-zinc-200 to-transparent z-10 pointer-events-none"></div>
  <div class="animate-marquee gap-16 flex items-center">
    ${items}
    ${items}
  </div>
</div>`;
}

// ── Callback Form HTML ────────────────────────────────────
function renderCallbackForm(variant = 'dark') {
  const inputClass = variant === 'light' ? 'form-input-light' : 'form-input';
  const labelColor = variant === 'light' ? 'text-dark/80' : '';
  const titleColor = variant === 'light' ? 'text-dark' : 'text-text-white';
  const subtitleColor = variant === 'light' ? 'text-dark/75' : 'text-text-muted';
  const wrapperClass = variant === 'light' ? 'bg-white/20 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/30 shadow-xl' : 'bg-dark-card border border-gold/15 rounded-3xl p-6 md:p-8 shadow-xl';
  const btnClass = variant === 'light' ? 'w-full bg-dark text-white font-body font-semibold text-sm py-3 rounded-xl shadow-md hover:bg-dark/95 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2' : 'w-full bg-dark text-white font-body font-semibold text-sm py-3 rounded-xl shadow-md hover:bg-dark/95 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2';

  return `
<div class="callback-wrapper">
  <form class="callback-form ${wrapperClass} flex flex-col gap-4" novalidate>
    <div>
      <h3 class="font-display font-semibold text-2xl ${titleColor} mb-1">Laissez-nous vous contacter</h3>
      <p class="font-body text-xs ${subtitleColor}">Renseignez vos coordonnées pour être rappelé gratuitement par nos experts.</p>
    </div>
    <div class="form-error-banner hidden text-xs font-medium p-3 rounded-xl text-center" style="display:none;color:#b91c1c;background:#fef2f2;border:1px solid #fecaca;"></div>
    <div class="flex flex-col gap-1.5">
      <label class="form-label ${labelColor}">Nom complet *</label>
      <div class="relative">
        <span class="absolute left-3 top-3.5 opacity-60">${icons.User}</span>
        <input type="text" data-field="name" placeholder="Ex: Youssef El Alami" class="${inputClass}" style="${variant === 'light' ? '' : 'padding-left:2.5rem'}">
      </div>
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="form-label ${labelColor}">Numéro de téléphone *</label>
      <div class="relative">
        <span class="absolute left-3 top-3.5 opacity-60">${icons.Phone}</span>
        <input type="tel" data-field="phone" placeholder="Ex: 0612345678" class="${inputClass}" style="${variant === 'light' ? '' : 'padding-left:2.5rem'}">
      </div>
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="form-label ${labelColor}">Date & Heure souhaitées *</label>
      <div class="relative">
        <span class="absolute left-3 top-3.5 opacity-60">${icons.CalendarIcon}</span>
        <input type="datetime-local" data-field="callDate" class="${inputClass}" style="${variant === 'light' ? '' : 'padding-left:2.5rem'}">
      </div>
    </div>
    <button type="submit" class="${btnClass}">
      <span class="btn-text">Planifier mon appel</span>
      <span class="btn-spinner" style="display:none;align-items:center;gap:0.5rem">${icons.Loader} Validation...</span>
    </button>
  </form>
  <div class="callback-success" style="display:none" class="flex flex-col items-center justify-center text-center gap-4 p-8 min-h-[300px]">
    <div class="bg-gold/10 p-4 rounded-full text-gold">${icons.CheckCircle2}</div>
    <h3 class="font-display font-medium text-2xl ${titleColor}">Demande Reçue !</h3>
    <p class="font-body text-sm ${subtitleColor} max-w-xs leading-relaxed">Merci. Un conseiller de Mahdi Créations vous appellera le jour et à l'heure convenus pour votre entretien personnalisé.</p>
  </div>
</div>`;
}

// ── ConsultationGratuite Section ──────────────────────────
function renderConsultationSection() {
  const checklistItems = [
    "Audit du design, de l'ergonomie et de l'expérience utilisateur",
    "Analyse de la vitesse de chargement sur mobile et desktop",
    "Vérification des protocoles de sécurité et du SSL",
    "Diagnostic complet du référencement naturel SEO Google",
    "Recommandations concrètes et plan d'action de croissance",
  ];
  const checklist = checklistItems.map(item => `
    <div class="flex gap-3 items-center">
      <div class="bg-dark text-white rounded-full p-1 shrink-0 flex items-center justify-center">${icons.Check}</div>
      <span class="font-body text-sm font-semibold text-dark/85">${item}</span>
    </div>`).join('\n');

  return `
<section class="relative py-20 bg-gold-gradient text-dark overflow-hidden">
  <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" stroke-width="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)"/></svg>
  </div>
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="reveal flex flex-col gap-6">
        <span class="text-xs uppercase font-body font-bold tracking-[0.25em] text-dark/70">Offre Exclusive</span>
        <h2 class="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-dark leading-tight">Consultation Web Gratuite</h2>
        <p class="font-body text-base text-dark/80 leading-relaxed">Vous avez déjà un site web ? Nous l'analysons gratuitement pour vous proposer des optimisations techniques et stratégiques immédiates.</p>
        <div class="flex flex-col gap-3.5 my-2">${checklist}</div>
        <p class="text-xs font-body font-medium text-dark/65 italic">Sans engagement &middot; Réponse sous 24h &middot; 100% gratuit</p>
      </div>
      <div class="reveal">
        ${renderCallbackForm('light')}
      </div>
    </div>
  </div>
</section>`;
}

// ══════════════════════════════════════════════════════════
// PAGE GENERATORS
// ══════════════════════════════════════════════════════════

// ── HOME ─────────────────────────────────────────────────
function generateHomePage() {
  const servicesData = [
    { icon: 'Monitor', title: 'Création de Sites Web', description: 'Conception de sites vitrines et dynamiques, professionnels et e-commerce modernes, rapides et optimisés pour le référencement SEO.', href: '/creation-site-web' },
    { icon: 'Code2', title: 'Développement Web Sur Mesure', description: 'Solutions web personnalisées, fonctionnalités avancées et intégrations d\'API adaptées précisément à votre activité.', href: '/services' },
    { icon: 'AppWindow', title: 'Applications Web & SaaS', description: 'Développement d\'applications web hautement performantes pour automatiser et digitaliser vos services d\'entreprise.', href: '/services' },
    { icon: 'Palette', title: 'Design Graphique & Infographie', description: 'Création d\'identité visuelle de luxe, logos, bannières, supports marketing et visuels de communication professionnels.', href: '/services' },
    { icon: 'Search', title: 'Référencement Naturel SEO', description: 'Amélioration de votre positionnement sur Google grâce à un référencement technique, sémantique et netlinking.', href: '/referencement-seo' },
    { icon: 'TrendingUp', title: 'Marketing Digital', description: 'Stratégie digitale d\'acquisition, campagnes publicitaires ciblées (Google Ads, Meta Ads) et animation des réseaux sociaux.', href: '/marketing-digital' },
    { icon: 'Server', title: 'Hébergement Web & Domaines', description: 'Hébergement web sécurisé haute performance au Maroc sur serveurs SSD NVMe, certificats SSL gratuits et gestion de vos noms de domaine .ma ou .com.', href: '/services' },
    { icon: 'Wrench', title: 'Maintenance & Support Web', description: 'Maintenance technique, mises à jour de sécurité régulières, sauvegardes automatiques et correction de bugs rapide pour vos sites web à Marrakech et au Maroc.', href: '/services' },
  ];

  const featuresData = [
    { icon: 'Sparkles', title: 'Design Premium', desc: 'Des sites modernes, élégants et haut de gamme, conçus sur mesure pour refléter l\'excellence de votre marque.' },
    { icon: 'Zap', title: 'Performance & Rapidité', desc: 'Des architectures légères et optimisées pour garantir des temps de chargement ultra-rapides et une expérience utilisateur parfaite.' },
    { icon: 'Shield', title: 'Référencement SEO intégré', desc: 'Une optimisation technique rigoureuse dès la conception pour assurer votre visibilité sur Google et attirer des clients.' },
    { icon: 'UserCheck', title: 'Accompagnement personnalisé', desc: 'Un suivi humain, réactif et professionnel à chaque étape de votre projet, et un support continu après la mise en ligne.' },
  ];

  const latestArticles = blogArticles.slice(0, 4);

  const serviceCards = servicesData.map(s => `
<a href="${s.href}" class="reveal bg-dark-card border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:border-gold/25 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group">
  <div class="bg-gold/10 text-gold rounded-xl p-3 w-12 h-12 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
    ${icons[s.icon]}
  </div>
  <div>
    <h3 class="font-display font-medium text-xl text-text-white mb-2 group-hover:text-gold transition-colors">${s.title}</h3>
    <p class="font-body text-sm leading-relaxed text-text-muted">${s.description}</p>
  </div>
  <div class="mt-auto pt-4 border-t border-white/5 flex items-center gap-1 text-xs font-semibold text-gold group-hover:text-gold-light transition-colors">
    En savoir plus <span class="transform group-hover:translate-x-1 transition-transform">${icons.ArrowRight}</span>
  </div>
</a>`).join('\n');

  const featureCards = featuresData.map(f => `
<div class="reveal bg-dark-card border border-white/5 rounded-2xl p-8 flex gap-6 hover:border-gold/25 transition-all duration-300">
  <div class="bg-gold/10 text-gold rounded-xl p-3 shrink-0 h-12 w-12 flex items-center justify-center">
    ${icons[f.icon]}
  </div>
  <div>
    <h3 class="font-display font-medium text-xl text-text-white mb-2">${f.title}</h3>
    <p class="font-body text-sm leading-relaxed text-text-muted">${f.desc}</p>
  </div>
</div>`).join('\n');

  const portfolioCards = homepageRealisations.map(item => `
<div class="reveal bg-dark-card border border-white/5 rounded-3xl overflow-hidden group hover:border-gold/30 transition-all duration-300 flex flex-col h-full">
  <div class="h-48 md:h-56 relative overflow-hidden bg-dark">
    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" loading="lazy" decoding="async" width="600" height="224">
    <div class="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent opacity-85"></div>
    <div class="absolute bottom-4 left-6 right-6">
      <span class="font-display font-medium text-base text-gold-light drop-shadow-md">${item.title}</span>
    </div>
  </div>
  <div class="p-6 flex flex-col gap-3 flex-grow">
    <span class="text-xs font-semibold text-gold uppercase tracking-wider">${item.category}</span>
    <h3 class="font-display font-medium text-xl text-text-white group-hover:text-gold transition-colors">${item.title}</h3>
    <p class="font-body text-xs text-text-muted leading-relaxed">${item.desc}</p>
  </div>
</div>`).join('\n');

  const testimonialCards = testimonials.map(t => `
<div class="reveal bg-dark-card border border-white/5 rounded-2xl p-8 flex flex-col gap-6">
  <div class="flex gap-1 text-gold">${icons.Star.repeat(t.rating)}</div>
  <p class="font-body text-sm italic leading-relaxed text-text-muted flex-grow">&ldquo;${t.text}&rdquo;</p>
  <div class="border-t border-white/5 pt-4">
    <h4 class="font-display font-medium text-base text-text-white">${t.author}</h4>
    <p class="font-body text-xs text-gold mt-0.5">${t.company}</p>
  </div>
</div>`).join('\n');

  const blogCards = latestArticles.map(article => `
<a href="/blog/${article.slug}" class="reveal bg-dark-card border border-white/5 rounded-3xl overflow-hidden group hover:border-gold/30 transition-all duration-300 flex flex-col h-full shadow-lg min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-start">
  <div class="h-44 sm:h-48 relative overflow-hidden bg-dark">
    <img src="${article.heroImage}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" loading="lazy" decoding="async" width="400" height="192">
    <div class="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent opacity-85"></div>
    <div class="absolute top-4 left-6">
      <span class="bg-gold/90 text-dark text-[9px] font-body font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">${article.category}</span>
    </div>
  </div>
  <div class="p-5 flex flex-col gap-3 flex-grow justify-between">
    <div>
      <div class="flex items-center gap-3 text-[10px] text-text-muted font-body mb-2">
        <span class="flex items-center gap-1">${icons.Calendar} ${article.date}</span>
        <span class="flex items-center gap-1">${icons.Clock} ${article.readTime}</span>
      </div>
      <h3 class="font-display font-medium text-base text-text-white group-hover:text-gold transition-colors duration-300 leading-snug line-clamp-2">${article.title}</h3>
      <p class="font-body text-[11px] text-text-muted leading-relaxed mt-2 line-clamp-3">${article.excerpt}</p>
    </div>
    <div class="border-t border-white/5 pt-3 mt-4">
      <span class="font-body text-[11px] font-semibold text-gold group-hover:text-gold-light flex items-center gap-1">
        Lire l'article ${icons.ArrowRight}
      </span>
    </div>
  </div>
</a>`).join('\n');

  const seoCards = [
    { step: '01', title: 'Audit SEO', desc: 'Analyse complète de la structure technique de votre site, de son contenu et de vos concurrents.' },
    { step: '02', title: 'Stratégie', desc: 'Recherche poussée de mots-clés à fort potentiel de conversion pour votre secteur d\'activité.' },
    { step: '03', title: 'Optimisation', desc: 'Optimisation de votre code, de vos textes (on-page) et acquisition de backlinks (off-page).' },
    { step: '04', title: 'Résultats', desc: 'Suivi rigoureux de vos positions sur Google et envoi de rapports de performance mensuels.' },
  ].map(p => `
<div class="reveal bg-dark-card border border-white/5 rounded-2xl p-6 relative hover:border-gold/20 transition-all duration-300">
  <div class="font-display text-4xl font-bold text-gold/20 mb-4">${p.step}</div>
  <h3 class="font-display font-medium text-lg text-text-white mb-2">${p.title}</h3>
  <p class="font-body text-xs text-text-muted leading-relaxed">${p.desc}</p>
</div>`).join('\n');

  const webTypeCards = [
    { title: 'Site Vitrine & Dynamique', desc: 'Valorisez vos services et votre savoir-faire avec un design premium, adapté aux mobiles et optimisé pour le référencement local.' },
    { title: 'Site E-commerce', desc: 'Développez votre commerce en ligne avec une plateforme sécurisée, optimisée pour le taux de conversion et compatible avec le paiement CMI.' },
    { title: 'Application Web', desc: 'Digitalisez vos processus métiers grâce à des outils et des architectures web avancées développées sur mesure.' },
  ].map(c => `
<div class="reveal bg-white rounded-2xl p-8 border border-dark/5 shadow-md flex flex-col justify-between">
  <div>
    <h3 class="font-display font-medium text-2xl text-dark mb-4">${c.title}</h3>
    <p class="font-body text-sm text-dark/70 leading-relaxed mb-6">${c.desc}</p>
  </div>
  <a href="/creation-site-web" class="font-body text-xs font-semibold text-gold-deep flex items-center gap-1 group mt-auto hover:text-gold transition-colors">
    Découvrir <span class="transform group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
  </a>
</div>`).join('\n');

  const jsonLd = localBusinessJsonLd() + `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mahdi Créations",
  "url": "${siteConfig.baseUrl}",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "${siteConfig.baseUrl}/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>`;

  const body = `
<!-- HERO -->
<section class="relative min-h-screen flex items-center justify-center noise-overlay py-20">
  <div class="absolute inset-0 z-0 overflow-hidden">
    <div class="hero-slide" style="background-image:url('/images/hero-bg-1.png')"></div>
    <div class="hero-slide" style="background-image:url('/images/hero-bg-2.png')"></div>
    <div class="hero-slide" style="background-image:url('/images/hero-bg-3.png')"></div>
    <div class="absolute inset-0 bg-dark/75 mix-blend-multiply"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40"></div>
    <div class="absolute inset-0" style="background:radial-gradient(circle at center,rgba(201,150,12,0.06) 0%,transparent 70%)"></div>
  </div>
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center z-10 relative">
    <div class="flex flex-col gap-6 max-w-4xl mx-auto">
      <span class="text-xs font-semibold tracking-[0.35em] text-gold uppercase">Agence Web & Digitale &middot; Marrakech, Maroc</span>
      <h1 class="font-display font-semibold text-5xl sm:text-6xl md:text-8xl leading-tight text-white">
        Créations Web <br>
        <span class="text-gold-gradient">d'Exception</span>
      </h1>
      <p class="font-body text-base sm:text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
        Création de sites web &middot; Référencement SEO &middot; Marketing Digital
      </p>
      <p class="font-body text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed opacity-95">
        Mahdi Créations est votre agence web à Marrakech spécialisée dans la création de sites web professionnels, le référencement naturel sur Google et le marketing digital au Maroc.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
        <a href="/contact" class="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg shadow-gold/15 hover:scale-[1.03] active:scale-[0.97] transition-transform inline-block">
          Demander un devis
        </a>
        <a href="/contact" class="border border-gold text-gold font-body font-semibold text-base px-8 py-3.5 rounded-full hover:bg-gold/5 transition-all inline-block">
          Consultation gratuite
        </a>
      </div>
      <div class="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-6 md:gap-12 text-xs sm:text-sm font-body text-text-muted">
        <span>200+ Sites & Applications créés</span>
        <span class="text-gold/30">|</span>
        <span>100% Clients satisfaits</span>
        <span class="text-gold/30">|</span>
        <span>15 ans d'expérience</span>
      </div>
    </div>
  </div>
</section>

<!-- PARTNERS MARQUEE -->
<section class="py-12 bg-dark border-b border-white/5 overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center mb-6">
    <span class="text-[10px] uppercase font-body font-bold tracking-[0.3em] text-text-muted/70">Nos Partenaires & Technologies</span>
  </div>
  ${renderMarquee(partnerLogos)}
</section>

<!-- VALUE PROPOSITION -->
<section class="py-16 bg-dark relative overflow-hidden">
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none" style="background:radial-gradient(ellipse at top,rgba(201,150,12,0.08) 0%,transparent 60%)"></div>
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
    <div class="reveal bg-dark-card border border-gold/20 rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl shadow-gold/5 relative overflow-hidden group flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      <div class="absolute inset-0 bg-gradient-to-r from-gold/[0.03] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      <div class="relative z-10 flex-shrink-0 lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gold/10 text-gold rounded-full p-2.5" style="box-shadow:0 0 20px rgba(201,150,12,0.2)">${icons.Sparkles}</div>
          <span class="text-[10px] uppercase font-body font-bold tracking-[0.2em] text-gold-light">Notre Vision</span>
        </div>
        <h2 class="font-display font-semibold text-3xl md:text-4xl text-white leading-tight">
          Avoir un site web <br class="hidden lg:block">
          <span class="text-gold-gradient">ne suffit plus.</span>
        </h2>
      </div>
      <div class="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent"></div>
      <div class="block lg:hidden h-px w-full max-w-xs bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      <div class="relative z-10 lg:w-3/5 flex flex-col gap-4 text-center lg:text-left">
        <p class="font-body text-base md:text-lg text-text-muted leading-relaxed">
          Nous concevons pour vous une plateforme performante, <strong class="text-text-white font-medium">100% responsive</strong> (adaptée à tous les écrans) et <strong class="text-text-white font-medium">ultra-optimisée pour le SEO</strong>.
        </p>
        <p class="font-body text-base md:text-lg text-gold-light leading-relaxed font-medium">
          Notre véritable objectif ? Vous rendre visible sur Google, offrir une expérience fluide à vos visiteurs, et les <span class="text-white">transformer en clients</span>.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="py-24 bg-dark-section border-t border-b border-white/5">
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="reveal text-center mb-16 flex flex-col gap-3 max-w-3xl mx-auto">
      <span class="text-xs uppercase font-body font-semibold tracking-wider text-gold">Nos Services</span>
      <h2 class="font-display font-medium text-3xl md:text-5xl text-white">Des solutions digitales complètes</h2>
      <p class="font-body text-base text-text-muted mt-2">De la création de votre site web à son référencement sur Google, nous vous accompagnons à chaque étape de votre présence digitale.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${serviceCards}
    </div>
  </div>
</section>

<!-- CONSULTATION GRATUITE -->
${renderConsultationSection()}

<!-- WHY CHOOSE US -->
<section class="py-24 bg-dark">
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="reveal text-center mb-16 flex flex-col gap-3">
      <h2 class="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">Pourquoi choisir Mahdi Créations ?</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      ${featureCards}
    </div>
    <div class="mt-20 pt-16 border-t border-white/5">
      <div class="text-center mb-8">
        <span class="text-[11px] uppercase font-body font-bold tracking-[0.3em] text-text-muted/70">Ils nous font confiance</span>
      </div>
      ${renderClientMarquee(clientLogos)}
    </div>
  </div>
</section>

<!-- WEB CREATION SECTION -->
<section class="py-24 bg-cream text-dark">
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
      <div class="reveal lg:col-span-7 flex flex-col gap-4">
        <span class="text-xs uppercase font-body font-bold tracking-wider text-gold-deep">Leader du Digital</span>
        <h2 class="font-display font-semibold text-3xl md:text-5xl text-dark leading-tight">Création de site web au Maroc & à Marrakech</h2>
      </div>
      <div class="reveal lg:col-span-5 text-sm md:text-base text-dark/80 font-body leading-relaxed">
        En tant qu'<strong>agence web Marrakech</strong> de référence, nous mettons notre expertise au service de la <strong>création de site web Maroc</strong>. Que vous ayez besoin d'un <strong>site vitrine et dynamique Maroc</strong> pour votre image de marque ou d'un <strong>site e-commerce Maroc</strong> performant, nous concevons des plateformes optimales pour vous assurer une présence digitale percutante.
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      ${webTypeCards}
    </div>
    <div class="text-center pt-4">
      <a href="/contact" class="bg-dark text-white font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-transform inline-block">
        Demander un devis gratuit
      </a>
    </div>
  </div>
</section>

<!-- SEO SECTION -->
<section class="py-24 bg-dark-section border-t border-b border-white/5">
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
      <div class="reveal lg:col-span-6 flex flex-col gap-4">
        <span class="text-xs uppercase font-body font-semibold tracking-wider text-gold">Visibilité Maximale</span>
        <h2 class="font-display font-medium text-3xl md:text-5xl text-white">Référencement Naturel & SEO au Maroc</h2>
      </div>
      <div class="reveal lg:col-span-6 text-sm md:text-base text-text-muted font-body leading-relaxed">
        Le <strong class="text-text-white">SEO référencement</strong> est le levier le plus puissant pour pérenniser votre activité. Nos experts mettent en place des stratégies de <strong class="text-text-white">référencement Google Maroc</strong> et de <strong class="text-text-white">référencement naturel Marrakech</strong> ciblées pour propulser vos pages en tête des résultats de recherche.
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      ${seoCards}
    </div>
  </div>
</section>

<!-- PORTFOLIO PREVIEW -->
<section class="py-24 bg-dark">
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
      <div class="reveal flex flex-col gap-3">
        <span class="text-xs uppercase font-body font-semibold tracking-wider text-gold">Notre Portfolio</span>
        <h2 class="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">Parmi nos Réalisations</h2>
      </div>
      <div class="reveal">
        <a href="/realisations" class="font-body text-sm font-semibold text-gold hover:text-gold-light flex items-center gap-1 group transition-colors">
          Voir toutes nos réalisations ${icons.ArrowRight}
        </a>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${portfolioCards}
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="py-24 bg-dark-section border-t border-b border-white/5">
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="reveal text-center mb-16 flex flex-col gap-3 max-w-3xl mx-auto">
      <span class="text-xs uppercase font-body font-semibold tracking-wider text-gold">Témoignages</span>
      <h2 class="font-display font-medium text-3xl md:text-5xl text-white">Ce que disent nos clients</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${testimonialCards}
    </div>
  </div>
</section>

<!-- BLOG PREVIEW -->
<section class="py-24 bg-dark relative overflow-hidden">
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none" style="background:radial-gradient(ellipse at top,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
    <div class="reveal text-center mb-16 flex flex-col gap-3 max-w-3xl mx-auto">
      <span class="text-xs uppercase font-body font-semibold tracking-wider text-gold">Notre Blog</span>
      <h2 class="font-display font-medium text-3xl md:text-5xl text-white">Dernières actualités & conseils</h2>
      <p class="font-body text-base text-text-muted mt-2">Découvrez nos derniers articles pour tout savoir sur la création de sites web, le référencement SEO et le marketing digital au Maroc.</p>
    </div>
    <div class="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar lg:grid lg:grid-cols-4 lg:overflow-x-visible lg:pb-0">
      ${blogCards}
    </div>
    <div class="reveal text-center mt-12">
      <a href="/blog" class="border border-gold text-gold font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gold/5 transition-all inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97]">
        Voir tous les articles ${icons.ArrowRight}
      </a>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="relative py-28 bg-dark noise-overlay overflow-hidden">
  <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.08) 0%,transparent 60%)"></div>
  <div class="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10">
    <div class="reveal flex flex-col gap-6 items-center">
      <h2 class="font-display font-semibold text-4xl md:text-6xl text-gold-gradient">Prêt à lancer votre projet web ?</h2>
      <p class="font-body text-base md:text-lg text-text-muted max-w-2xl leading-relaxed">Parlons de votre projet et donnons vie à vos ambitions digitales. Notre équipe est à votre entière écoute pour concevoir des solutions sur mesure qui feront décoller votre activité.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
        <a href="/contact" class="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg shadow-gold/10 hover:scale-[1.03] active:scale-[0.97] transition-transform inline-block">
          Demander un devis
        </a>
        <a href="/contact" class="border border-gold text-gold font-body font-semibold text-base px-8 py-3.5 rounded-full hover:bg-gold/5 transition-all inline-block">
          Consultation gratuite
        </a>
      </div>
    </div>
  </div>
</section>`;

  return renderPage({
    path: '/',
    title: 'Mahdi Créations – Agence Création Site Web & Référencement Google au Maroc',
    description: 'Mahdi Créations, agence web à Marrakech spécialisée dans la création de sites web professionnels, le référencement naturel SEO et le marketing digital au Maroc.',
    canonical: '/',
    jsonLd,
    body,
  });
}

// ── BLOG INDEX ────────────────────────────────────────────
function generateBlogIndex() {
  const cards = blogArticles.map((article, idx) => `
<div class="reveal bg-dark-card border border-white/5 rounded-3xl overflow-hidden group hover:border-gold/30 transition-all duration-300 flex flex-col h-full shadow-lg">
  <a href="/blog/${article.slug}" class="block">
    <div class="h-48 sm:h-56 relative overflow-hidden bg-dark">
      <img src="${article.heroImage}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" loading="${idx < 3 ? 'eager' : 'lazy'}" decoding="async" width="600" height="224">
      <div class="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent opacity-85"></div>
      <div class="absolute top-4 left-6">
        <span class="bg-gold/90 text-dark text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full">${article.category}</span>
      </div>
    </div>
  </a>
  <div class="p-6 flex flex-col gap-3 flex-grow justify-between">
    <div>
      <div class="flex items-center gap-4 text-[11px] text-text-muted font-body mb-3">
        <span class="flex items-center gap-1">${icons.Calendar} ${article.date}</span>
        <span class="flex items-center gap-1">${icons.Clock} ${article.readTime} de lecture</span>
      </div>
      <h2 class="font-display font-medium text-lg text-text-white group-hover:text-gold transition-colors duration-300 leading-snug">${article.title}</h2>
      <p class="font-body text-xs text-text-muted leading-relaxed mt-2">${article.excerpt}</p>
    </div>
    <div class="border-t border-white/5 pt-4 mt-4">
      <a href="/blog/${article.slug}" class="font-body text-xs font-semibold text-gold group-hover:text-gold-light flex items-center gap-1 group-hover:underline">
        Lire l'article ${icons.ArrowRight}
      </a>
    </div>
  </div>
</div>`).join('\n');

  const body = `
<div class="bg-dark text-text-white">
  <section class="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
      <div class="reveal flex flex-col gap-4">
        <span class="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">Actualités & Conseils</span>
        <h1 class="font-display font-semibold text-5xl md:text-7xl text-white">Notre <span class="text-gold-gradient">Blog</span></h1>
        <p class="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">Guides, conseils et actualités sur la création web, le référencement SEO, le marketing digital et le branding au Maroc.</p>
      </div>
    </div>
  </section>
  <section class="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${cards}</div>
  </section>
</div>`;

  return renderPage({
    path: '/blog',
    title: 'Blog – Création Web, SEO & Marketing Digital au Maroc | Mahdi Créations',
    description: 'Guides, conseils et actualités sur la création de sites web, le référencement SEO et le marketing digital au Maroc par Mahdi Créations, agence web Marrakech.',
    canonical: '/blog',
    jsonLd: localBusinessJsonLd(),
    body,
  });
}

// ── BLOG ARTICLE ──────────────────────────────────────────
function generateBlogArticle(article) {
  const relatedArticles = article.relatedSlugs
    .map(slug => blogArticles.find(a => a.slug === slug))
    .filter(Boolean);

  const relatedCards = relatedArticles.map(rel => `
<a href="/blog/${rel.slug}" class="reveal flex gap-4 bg-dark-card border border-white/5 rounded-2xl p-4 hover:border-gold/20 transition-all duration-300 group">
  <img src="${rel.heroImage}" alt="${rel.title}" width="80" height="60" class="w-20 h-16 object-cover rounded-xl shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" decoding="async">
  <div>
    <span class="text-[9px] font-bold uppercase tracking-wider text-gold font-body">${rel.category}</span>
    <h4 class="font-display font-medium text-sm text-text-white group-hover:text-gold transition-colors leading-snug mt-1">${rel.title}</h4>
  </div>
</a>`).join('\n');

  const articleJsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${article.metaTitle}",
  "description": "${article.metaDescription}",
  "image": "${siteConfig.baseUrl}${article.heroImage}",
  "url": "${siteConfig.baseUrl}/blog/${article.slug}",
  "datePublished": "${article.date}",
  "author": { "@type": "Organization", "name": "Mahdi Créations" },
  "publisher": { "@type": "Organization", "name": "Mahdi Créations", "logo": { "@type": "ImageObject", "url": "${siteConfig.baseUrl}/images/logo.png" } },
  "keywords": "${article.keyword}"
}
</script>`;

  const breadcrumbJsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "${siteConfig.baseUrl}" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "${siteConfig.baseUrl}/blog" },
    { "@type": "ListItem", "position": 3, "name": "${article.title}", "item": "${siteConfig.baseUrl}/blog/${article.slug}" }
  ]
}
</script>`;

  const body = `
<div class="bg-dark text-text-white">
  <!-- Hero -->
  <section class="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
    <img src="${article.heroImage}" alt="${article.title}" class="absolute inset-0 w-full h-full object-cover opacity-40" loading="eager" fetchpriority="high" width="1200" height="600">
    <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
    <div class="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 pb-12 relative z-10 w-full">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-3 flex-wrap">
          <span class="bg-gold/90 text-dark text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full">${article.category}</span>
          <span class="text-text-muted text-xs font-body flex items-center gap-1">${icons.Calendar} ${article.date}</span>
          <span class="text-text-muted text-xs font-body flex items-center gap-1">${icons.Clock} ${article.readTime} de lecture</span>
        </div>
        <h1 class="font-display font-semibold text-3xl md:text-5xl text-white leading-tight">${article.title}</h1>
        <p class="font-body text-sm text-text-muted">${article.excerpt}</p>
      </div>
    </div>
  </section>

  <!-- Breadcrumb -->
  <nav class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 text-xs font-body text-text-muted" aria-label="Fil d'Ariane">
    <ol class="flex items-center gap-2 flex-wrap">
      <li><a href="/" class="hover:text-gold transition-colors">Accueil</a></li>
      <li class="text-gold/30">/</li>
      <li><a href="/blog" class="hover:text-gold transition-colors">Blog</a></li>
      <li class="text-gold/30">/</li>
      <li class="text-text-muted truncate max-w-[200px]">${article.title}</li>
    </ol>
  </nav>

  <!-- Content Grid -->
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
    <!-- Article Body -->
    <article class="lg:col-span-8 blog-content">
      ${renderBlogContent(article.content, article.inlineImages)}
      <div class="mt-12 pt-8 border-t border-white/5">
        <a href="/contact" class="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform">
          Discutons de votre projet
        </a>
      </div>
    </article>

    <!-- Sidebar -->
    <aside class="lg:col-span-4">
      <div class="sticky top-28 flex flex-col gap-8">
        <!-- CTA Card -->
        <div class="bg-dark-card border border-gold/20 rounded-3xl p-6 flex flex-col gap-4">
          <h3 class="font-display font-medium text-xl text-white">Besoin d'un devis ?</h3>
          <p class="font-body text-xs text-text-muted leading-relaxed">Contactez notre équipe pour obtenir une proposition personnalisée adaptée à votre projet.</p>
          <a href="/contact" class="bg-gold-gradient text-dark font-body font-semibold text-sm py-3 rounded-full text-center block hover:scale-[1.02] transition-transform">
            Demander un devis gratuit
          </a>
          <a href="${siteConfig.whatsapp}" target="_blank" rel="noopener noreferrer" class="border border-gold text-gold font-body font-semibold text-sm py-3 rounded-full text-center block hover:bg-gold/5 transition-colors">
            WhatsApp
          </a>
        </div>

        ${relatedCards.length > 0 ? `
        <!-- Related Articles -->
        <div class="flex flex-col gap-4">
          <h3 class="font-display font-medium text-lg text-white">Articles connexes</h3>
          ${relatedCards}
        </div>` : ''}
      </div>
    </aside>
  </div>
</div>`;

  return renderPage({
    path: `/blog/${article.slug}`,
    title: article.metaTitle,
    description: article.metaDescription,
    canonical: `/blog/${article.slug}`,
    ogImage: article.heroImage,
    ogType: 'article',
    jsonLd: articleJsonLd + breadcrumbJsonLd,
    body,
  });
}

// ── REALISATIONS ─────────────────────────────────────────
function generateRealisationsPage() {
  const filterBtns = categories.map(cat => `
<button data-filter="${cat}" class="px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all cursor-pointer ${cat === 'Tous' ? 'bg-gold-gradient text-dark shadow-md' : 'border border-white/10 text-text-muted hover:border-gold/30 hover:text-gold'}">
  ${cat}
</button>`).join('\n');

  const projectCards = projects.map(p => `
<div data-category="${p.category}" class="reveal project-card bg-dark-card border border-white/5 rounded-3xl overflow-hidden group hover:border-gold/30 transition-all duration-300 flex flex-col h-full shadow-lg">
  <div class="h-48 sm:h-56 relative overflow-hidden bg-dark">
    <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" loading="lazy" decoding="async" width="600" height="224">
    <div class="absolute inset-0 bg-gradient-to-t from-dark/95 via-transparent to-transparent opacity-85"></div>
    <div class="absolute bottom-4 left-6 right-6">
      <span class="font-display font-medium text-base text-gold-light drop-shadow-md">${p.title}</span>
    </div>
  </div>
  <div class="p-6 flex flex-col gap-3 flex-grow justify-between">
    <div>
      <span class="text-xs font-semibold text-gold uppercase tracking-wider block mb-1">${p.category}</span>
      <h3 class="font-display font-medium text-xl text-text-white group-hover:text-gold transition-colors duration-300">${p.title}</h3>
      <p class="font-body text-xs text-text-muted leading-relaxed mt-2">${p.desc}</p>
    </div>
    <div class="border-t border-white/5 pt-4 mt-4">
      <a href="/contact" class="font-body text-xs font-semibold text-gold group-hover:text-gold-light flex items-center gap-1 group-hover:underline">
        Étudier un projet similaire ${icons.ArrowRight}
      </a>
    </div>
  </div>
</div>`).join('\n');

  const body = `
<div class="bg-dark text-text-white">
  <section class="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
      <div class="reveal flex flex-col gap-4">
        <span class="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">Notre Portfolio</span>
        <h1 class="font-display font-semibold text-5xl md:text-7xl text-white">Parmi nos <span class="text-gold-gradient">réalisations</span></h1>
        <p class="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">Découvrez nos récents projets web et design. Des solutions raffinées conçues avec précision pour nos clients au Maroc et ailleurs.</p>
      </div>
    </div>
  </section>
  <section class="py-12 border-b border-white/5 bg-dark">
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-wrap justify-center gap-4">
      ${filterBtns}
    </div>
  </section>
  <section class="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${projectCards}
    </div>
  </section>
</div>`;

  return renderPage({
    path: '/realisations',
    title: 'Nos Réalisations – Portfolio Agence Web Marrakech | Mahdi Créations',
    description: 'Découvrez nos 18+ réalisations web : sites vitrines, e-commerce, applications web et identités visuelles pour nos clients au Maroc et à Marrakech.',
    canonical: '/realisations',
    jsonLd: localBusinessJsonLd(),
    body,
  });
}

// ── CONTACT ───────────────────────────────────────────────
function generateContactPage() {
  const contactDetails = [
    { icon: 'MapPin', title: 'Notre Bureau', value: 'Av. Mohammed V, Gueliz, Marrakech 40000, Maroc', href: null },
    { icon: 'Mail', title: 'Adresse Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: 'Phone', title: 'Téléphone direct', value: siteConfig.phone, href: siteConfig.phoneHref },
  ];

  const detailCards = contactDetails.map((item, idx) => `
<div class="reveal bg-dark-card border border-white/5 rounded-2xl p-6 flex gap-4 hover:border-gold/15 transition-all duration-300">
  <div class="text-gold shrink-0 mt-0.5">${icons[item.icon]}</div>
  <div>
    <h4 class="font-body font-bold text-xs uppercase tracking-wider text-text-muted mb-1">${item.title}</h4>
    ${item.href
      ? `<a href="${item.href}" class="text-text-white hover:text-gold transition-colors font-medium font-body text-sm">${item.value}</a>`
      : `<span class="text-text-white font-medium font-body text-sm">${item.value}</span>`}
  </div>
</div>`).join('\n');

  const body = `
<div class="bg-dark text-text-white">
  <section class="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
      <div class="reveal flex flex-col gap-4">
        <span class="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">Contact</span>
        <h1 class="font-display font-semibold text-5xl md:text-7xl text-white">Contactez <span class="text-gold-gradient">Mahdi Créations</span></h1>
        <p class="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">Un projet web ? Une question ou besoin d'un devis gratuit ? Remplissez notre formulaire ou contactez-nous directement via WhatsApp.</p>
      </div>
    </div>
  </section>

  <section class="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      <!-- Left: Contact Form -->
      <div class="lg:col-span-7 flex flex-col gap-6">
        <div class="reveal">
          <h2 class="font-display font-medium text-2xl md:text-3xl text-text-white mb-2">Envoyez-nous un message</h2>
          <p class="font-body text-sm text-text-muted mb-6 leading-relaxed">Remplissez les champs ci-dessous et décrivez-nous vos objectifs. Notre équipe étudiera vos besoins et vous répondra sous 24h.</p>
        </div>
        <div class="reveal">
          <div id="contact-form-wrapper">
            <form id="contact-form" class="bg-dark-card border border-gold/15 rounded-3xl p-8 flex flex-col gap-6 shadow-xl relative" novalidate>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                  <label for="contact-name" class="form-label">Nom complet *</label>
                  <input id="contact-name" type="text" placeholder="Ex: Youssef El Alami" class="form-input">
                </div>
                <div class="flex flex-col gap-2">
                  <label for="contact-email" class="form-label">Adresse email *</label>
                  <input id="contact-email" type="email" placeholder="Ex: youssef@gmail.com" class="form-input">
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                  <label for="contact-phone" class="form-label">Téléphone / WhatsApp *</label>
                  <input id="contact-phone" type="tel" placeholder="Ex: +212 6 12 34 56 78" class="form-input">
                </div>
                <div class="flex flex-col gap-2">
                  <label for="contact-service" class="form-label">Service Souhaité *</label>
                  <select id="contact-service" class="form-input appearance-none">
                    <option value="" disabled selected class="text-white/40">Choisir un service...</option>
                    <option value="site-vitrine">Création de Site Vitrine et Dynamique</option>
                    <option value="site-ecommerce">Création de Site E-commerce</option>
                    <option value="app-sur-mesure">Développement Web Sur Mesure</option>
                    <option value="seo">Référencement Naturel SEO</option>
                    <option value="marketing-digital">Stratégie Marketing Digital</option>
                    <option value="design-graphique">Design Graphique & Identité</option>
                    <option value="autre">Autre Projet</option>
                  </select>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <label for="contact-message" class="form-label">Parlez-nous de votre projet *</label>
                <textarea id="contact-message" rows="5" placeholder="Décrivez brièvement vos besoins, vos objectifs et vos délais..." class="form-input"></textarea>
              </div>
              <div id="contact-error" class="hidden text-sm p-3 text-center rounded-xl" style="display:none;color:#f87171;background:rgba(127,29,29,0.2);border:1px solid rgba(239,68,68,0.3)"></div>
              <button type="submit" class="w-full bg-gold-gradient text-dark font-body font-semibold text-base py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2 hover:shadow-gold/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                <span id="contact-btn-text" class="flex items-center gap-2">${icons.Send} Envoyer ma demande</span>
                <span id="contact-btn-spinner" style="display:none;align-items:center;gap:0.5rem">${icons.Loader} Envoi en cours...</span>
              </button>
            </form>
          </div>
          <div id="contact-success" class="bg-dark-card border border-gold/30 rounded-3xl p-8 text-center flex-col items-center justify-center gap-4 shadow-xl" style="display:none">
            <div class="bg-gold/10 p-4 rounded-full text-gold mx-auto w-fit">${icons.CheckCircle2}</div>
            <h3 class="font-display font-medium text-2xl text-text-white">Message Envoyé !</h3>
            <p class="font-body text-sm text-text-muted max-w-sm leading-relaxed mx-auto">Merci pour votre message. Un conseiller de Mahdi Créations vous recontactera sous 24 heures pour étudier votre projet.</p>
            <button onclick="document.getElementById('contact-success').style.display='none';document.getElementById('contact-form-wrapper').style.display='block'" class="mt-4 border border-gold text-gold hover:bg-gold hover:text-dark px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer">
              Envoyer un autre message
            </button>
          </div>
        </div>
      </div>

      <!-- Right: Contact Details -->
      <div class="lg:col-span-5 flex flex-col gap-8">
        <div class="reveal">
          <h2 class="font-display font-medium text-2xl md:text-3xl text-text-white mb-2">Nos Coordonnées</h2>
          <p class="font-body text-sm text-text-muted leading-relaxed">Vous préférez discuter directement ? Retrouvez nos canaux de communication ou demandez votre consultation web gratuite.</p>
        </div>
        <div class="flex flex-col gap-6 font-body text-sm">
          ${detailCards}
        </div>
        <div class="reveal">
          ${renderCallbackForm('dark')}
        </div>
        <div class="reveal bg-dark-card border border-gold/15 rounded-3xl p-8 flex flex-col gap-6 items-center text-center">
          <h3 class="font-display font-medium text-xl text-text-white">Besoin d'une réponse rapide ?</h3>
          <p class="font-body text-xs text-text-muted leading-relaxed">Discutez en direct avec l'un de nos chefs de projet sur WhatsApp pour obtenir des réponses instantanées ou réserver votre consultation.</p>
          <a href="${siteConfig.whatsapp}" target="_blank" rel="noopener noreferrer" class="w-full bg-gold-gradient text-dark font-body font-semibold text-sm py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2 hover:shadow-gold/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
            ${icons.MessageCircle} Nous contacter via WhatsApp
          </a>
          <span class="text-[10px] text-text-muted uppercase tracking-widest font-body font-semibold">Ou demandez votre consultation gratuite directement</span>
        </div>
      </div>
    </div>
  </section>
</div>`;

  return renderPage({
    path: '/contact',
    title: 'Contact – Mahdi Créations | Agence Web Marrakech',
    description: 'Contactez Mahdi Créations pour lancer votre projet web. Demandez un devis gratuit ou réservez votre consultation web gratuite. Agence web à Marrakech, Maroc.',
    canonical: '/contact',
    jsonLd: localBusinessJsonLd(),
    body,
  });
}

// ── A PROPOS ─────────────────────────────────────────────
function generateAProposPage() {
  const valuesData = [
    { icon: 'Sparkles', title: "L'Excellence du Design", desc: "Nous pensons que l'esthétique est un pilier de la confiance. Chaque pixel est méticuleusement pensé pour créer une expérience utilisateur mémorable et haut de gamme." },
    { icon: 'Trophy', title: "La Rigueur Technique", desc: "Un beau site doit être performant. Nous utilisons des technologies de pointe pour garantir vitesse, sécurité et évolutivité." },
    { icon: 'Lightbulb', title: "La Culture du Résultat", desc: "Nous ne créons pas seulement des sites web, nous construisons des outils d'acquisition de clients. Notre objectif principal est le retour sur investissement de nos partenaires." },
    { icon: 'Compass', title: "La Proximité Humaine", desc: "Basés à Marrakech, nous cultivons un accompagnement transparent, réactif et à l'écoute de nos clients pour construire des collaborations de confiance à long terme." },
  ];

  const valueCards = valuesData.map(v => `
<div class="reveal bg-dark-card border border-white/5 rounded-2xl p-8 flex gap-6 hover:border-gold/20 transition-all duration-300">
  <div class="bg-gold/10 text-gold rounded-xl p-3 shrink-0 h-12 w-12 flex items-center justify-center">${icons[v.icon]}</div>
  <div>
    <h3 class="font-display font-medium text-xl text-text-white mb-2">${v.title}</h3>
    <p class="font-body text-sm leading-relaxed text-text-muted">${v.desc}</p>
  </div>
</div>`).join('\n');

  const body = `
<div class="bg-dark text-text-white">
  <section class="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
      <div class="reveal flex flex-col gap-4">
        <span class="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">Notre Essence</span>
        <h1 class="font-display font-semibold text-5xl md:text-7xl text-white">Qui est <span class="text-gold-gradient">Mahdi Créations</span> ?</h1>
        <p class="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">Une agence web d'exception à Marrakech, mêlant sensibilité artistique et haute rigueur technologique pour façonner l'identité des marques d'aujourd'hui.</p>
      </div>
    </div>
  </section>

  <section class="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="reveal lg:col-span-7 flex flex-col gap-6">
        <span class="text-xs uppercase font-body font-semibold tracking-wider text-gold">Notre Histoire</span>
        <h2 class="font-display font-medium text-3xl md:text-5xl text-white leading-tight">Créer des ponts entre art et technologie</h2>
        <p class="font-body text-sm md:text-base text-text-muted leading-relaxed">Fondée à Marrakech par passion pour le design raffiné et le code propre, Mahdi Créations est née avec une ambition claire : offrir aux entreprises marocaines et internationales des solutions digitales qui rivalisent avec les plus hauts standards mondiaux.</p>
        <p class="font-body text-sm md:text-base text-text-muted leading-relaxed">Inspirés par la richesse culturelle, la lumière, et l'élégance de Marrakech, nous concevons des identités visuelles et des architectures web sur mesure. De la conception initiale au référencement SEO sur Google, chaque étape est guidée par le sens du détail, le goût de la symétrie, et le sens des affaires.</p>
      </div>
      <div class="reveal lg:col-span-5 bg-dark-card border border-gold/15 rounded-3xl p-8 h-[440px] flex flex-col justify-between items-center relative overflow-hidden group hover:border-gold/30 transition-all duration-300">
        <div class="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl"></div>
        <span class="font-display text-xs font-semibold text-gold uppercase tracking-widest self-start">L'Esprit Marrakech</span>
        <div class="flex-grow flex items-center justify-center py-4 w-full">
          <img src="/images/logo-transparent.png" alt="Mahdi Créations" width="1200" height="300" class="h-[300px] w-auto object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" style="filter:drop-shadow(0 0 40px rgba(201,150,12,0.25))">
        </div>
        <div class="border-t border-white/5 pt-4 text-xs font-body text-gold flex justify-between w-full">
          <span>Agence Digitale &middot; Marrakech</span>
          <span>Maroc</span>
        </div>
      </div>
    </div>
  </section>

  <section class="py-24 bg-dark-section border-t border-b border-white/5">
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
      <div class="reveal text-center mb-16 flex flex-col gap-3 max-w-xl mx-auto">
        <span class="text-xs uppercase font-body font-semibold tracking-wider text-gold">Nos Valeurs</span>
        <h2 class="font-display font-medium text-3xl md:text-5xl text-white">Ce qui nous guide au quotidien</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${valueCards}
      </div>
    </div>
  </section>

  <section class="py-24 text-center max-w-5xl mx-auto px-4 md:px-8">
    <div class="reveal flex flex-col gap-6 items-center">
      <h2 class="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">Collaborons ensemble</h2>
      <p class="font-body text-base text-text-muted max-w-xl leading-relaxed">Nous sommes impatients de découvrir vos idées et de vous proposer l'architecture digitale parfaite pour les concrétiser.</p>
      <div class="pt-4">
        <a href="/contact" class="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-transform inline-block">
          Discuter de votre projet
        </a>
      </div>
    </div>
  </section>
</div>`;

  return renderPage({
    path: '/a-propos',
    title: 'À propos – Mahdi Créations | Agence Web Marrakech',
    description: 'Découvrez Mahdi Créations, agence web et marketing digital à Marrakech. Notre histoire, nos valeurs et notre vision pour créer des expériences digitales d\'exception au Maroc.',
    canonical: '/a-propos',
    jsonLd: localBusinessJsonLd(),
    body,
  });
}

// ── FAQ ───────────────────────────────────────────────────
function generateFaqPage() {
  const faqs = [
    { q: "Quels sont les tarifs pratiqués par Mahdi Créations ?", a: "Chaque projet est unique et fait l'objet d'une tarification sur mesure adaptée à vos objectifs et besoins techniques. Après étude de votre cahier des charges ou lors de notre consultation gratuite, nous vous fournissons une proposition commerciale claire et détaillée." },
    { q: "Quels sont vos délais moyens de livraison ?", a: "Un projet de site vitrine et dynamique prend généralement de 2 à 3 semaines de conception après la signature du contrat et la réception de vos éléments graphiques/textuels. Un site e-commerce prend 4 à 6 semaines, et une application web complexe peut exiger de 8 à 12 semaines de développement." },
    { q: "Proposez-vous vos services en dehors de Marrakech ?", a: "Absolument. Bien que notre agence web soit basée à Marrakech, nous travaillons avec des clients situés dans tout le Maroc (Casablanca, Rabat, Tanger, Agadir, Fès) ainsi qu'à l'international (France, Belgique, Suisse, Espagne). Les réunions se font en visioconférence et par téléphone de manière fluide et transparente." },
    { q: "En quoi consiste la consultation web gratuite ?", a: "C'est un audit complet offert sans engagement de votre part. Si vous possédez déjà un site internet, nous analysons ses performances, son score SEO sur Google, sa réactivité mobile et sa sécurité. Nous vous fournissons ensuite un compte-rendu avec un plan d'action concret pour l'améliorer." },
    { q: "Fournissez-vous la maintenance technique après la livraison ?", a: "Oui, nous proposons des contrats de maintenance annuels pour assurer la pérennité de votre outil digital. Cela comprend les sauvegardes hebdomadaires de votre base de données, l'application des correctifs de sécurité, la mise à jour des extensions et du serveur, ainsi qu'un crédit d'heures pour de petites modifications." },
    { q: "Quels secteurs d'activité accompagnez-vous ?", a: "Nous collaborons avec une clientèle variée. Nous avons développé une expertise solide dans l'accompagnement des établissements touristiques (hôtels, riads de luxe à Marrakech, maisons d'hôtes), les agences immobilières, les cabinets professionnels (avocats, cliniques), les artisans d'art locaux et les boutiques e-commerce de mode et cosmétiques." },
    { q: "Comment mon site sera-t-il optimisé pour le référencement naturel Google ?", a: "Dès la phase de développement, nous mettons en œuvre les meilleures pratiques du SEO : code sémantique optimisé, balisage HTML propre (Title, Hn, alt), images compressées, configuration du protocole HTTPS, et inscription sur la Google Search Console. Nous proposons également des forfaits SEO mensuels avancés pour cibler des mots-clés concurrentiels." },
  ];

  const faqItems = faqs.map((faq, idx) => `
<div class="faq-item border-b border-white/5 last:border-0">
  <button class="faq-trigger w-full flex items-center justify-between py-6 text-left gap-4 group" aria-expanded="false">
    <h3 class="font-display font-medium text-lg text-text-white group-hover:text-gold transition-colors">${faq.q}</h3>
    ${icons.ChevronDown}
  </button>
  <div class="faq-answer">
    <div class="pb-6">
      <p class="font-body text-sm text-text-muted leading-relaxed">${faq.a}</p>
    </div>
  </div>
</div>`).join('\n');

  const faqJsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${faqs.map(f => `{ "@type": "Question", "name": "${f.q}", "acceptedAnswer": { "@type": "Answer", "text": "${f.a.replace(/"/g, '\\"')}" } }`).join(',\n    ')}
  ]
}
</script>`;

  const body = `
<div class="bg-dark text-text-white">
  <section class="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
      <div class="reveal flex flex-col gap-4">
        <span class="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">FAQ</span>
        <h1 class="font-display font-semibold text-5xl md:text-7xl text-white">Questions <span class="text-gold-gradient">Fréquentes</span></h1>
        <p class="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">Retrouvez toutes les réponses à vos interrogations concernant la création de sites internet, le référencement Google, nos tarifs et nos méthodes de travail.</p>
      </div>
    </div>
  </section>
  <section class="py-24 max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="reveal bg-dark-card border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5 px-8">
      ${faqItems}
    </div>
  </section>
  <section class="py-24 text-center max-w-5xl mx-auto px-4 md:px-8">
    <div class="reveal flex flex-col gap-6 items-center">
      <h2 class="font-display font-semibold text-3xl md:text-5xl text-gold-gradient">D'autres questions en suspens ?</h2>
      <p class="font-body text-base text-text-muted max-w-xl leading-relaxed">Notre équipe est disponible pour répondre à vos demandes spécifiques et concevoir la meilleure stratégie digitale pour votre structure.</p>
      <div class="pt-4">
        <a href="/contact" class="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-transform inline-block">
          Nous poser une question
        </a>
      </div>
    </div>
  </section>
</div>`;

  return renderPage({
    path: '/faq',
    title: 'FAQ – Questions Fréquentes | Mahdi Créations Agence Web Marrakech',
    description: 'Retrouvez toutes les réponses à vos questions sur la création de sites web, le référencement SEO, nos tarifs et nos délais. Agence web Mahdi Créations, Marrakech.',
    canonical: '/faq',
    jsonLd: localBusinessJsonLd() + faqJsonLd,
    body,
  });
}

// ── 404 PAGE ─────────────────────────────────────────────
function generate404Page() {
  const body = `
<div class="bg-dark text-text-white min-h-screen flex items-center justify-center relative overflow-hidden noise-overlay py-24">
  <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.06) 0%,transparent 60%)"></div>
  <div class="max-w-2xl mx-auto px-4 md:px-8 text-center relative z-10 flex flex-col gap-8 items-center">
    <span class="font-display font-bold text-[140px] md:text-[200px] leading-none text-gold-gradient opacity-20 select-none">404</span>
    <div class="flex flex-col gap-4 -mt-16">
      <span class="text-xs uppercase font-body font-bold tracking-[0.3em] text-gold">Page Introuvable</span>
      <h1 class="font-display font-semibold text-4xl md:text-6xl text-white">Oups ! Cette page n'existe pas</h1>
      <p class="font-body text-base text-text-muted max-w-lg leading-relaxed mx-auto">La page que vous recherchez a été déplacée, supprimée ou n'a jamais existé. Retournez à l'accueil pour continuer votre navigation.</p>
    </div>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
      <a href="/" class="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-transform inline-block">
        Retour à l'accueil
      </a>
      <a href="/contact" class="border border-gold text-gold font-body font-semibold text-base px-8 py-3.5 rounded-full hover:bg-gold/5 transition-all inline-block">
        Nous contacter
      </a>
    </div>
  </div>
</div>`;

  return renderPage({
    path: '/404',
    title: '404 – Page Introuvable | Mahdi Créations',
    description: 'La page que vous recherchez est introuvable. Retournez à l\'accueil de Mahdi Créations, agence web à Marrakech.',
    canonical: '/404',
    extraMeta: '<meta name="robots" content="noindex, follow">',
    body,
  });
}

// ── PRIVACY ───────────────────────────────────────────────
function generatePrivacyPage() {
  const body = `
<div class="bg-dark text-text-white">
  <section class="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
      <div class="reveal flex flex-col gap-4">
        <span class="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">Légal</span>
        <h1 class="font-display font-semibold text-4xl md:text-6xl text-white">Politique de <span class="text-gold-gradient">confidentialité</span></h1>
      </div>
    </div>
  </section>
  <section class="py-24 max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="reveal blog-content">
      <h2>1. Collecte des données</h2>
      <p>Mahdi Créations collecte uniquement les données personnelles que vous nous fournissez volontairement via nos formulaires de contact (nom, email, téléphone, message). Ces données sont utilisées exclusivement pour répondre à vos demandes et améliorer nos services.</p>
      <h2>2. Utilisation des données</h2>
      <p>Vos données sont utilisées pour : traiter et répondre à vos demandes de contact ou de devis, envoyer des informations relatives à vos projets web, améliorer nos services et notre site web. Nous ne vendons, ne louons et ne partageons jamais vos données personnelles avec des tiers sans votre consentement explicite.</p>
      <h2>3. Cookies et analytics</h2>
      <p>Notre site utilise Google Analytics pour analyser le trafic web de manière anonyme. Ces données nous aident à améliorer l'expérience utilisateur. Vous pouvez désactiver le suivi analytics via les paramètres de votre navigateur.</p>
      <h2>4. Sécurité des données</h2>
      <p>Nous prenons la sécurité de vos données au sérieux et utilisons des protocoles HTTPS et des serveurs sécurisés pour protéger vos informations personnelles contre tout accès non autorisé.</p>
      <h2>5. Vos droits</h2>
      <p>Conformément à la loi marocaine 09-08 sur la protection des données personnelles, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : <strong>${siteConfig.email}</strong></p>
      <h2>6. Contact</h2>
      <p>Pour toute question relative à notre politique de confidentialité, contactez Mahdi Créations à l'adresse : Av. Mohammed V, Gueliz, Marrakech 40000, Maroc — Email : ${siteConfig.email}</p>
    </div>
  </section>
</div>`;

  return renderPage({
    path: '/privacy',
    title: 'Politique de confidentialité | Mahdi Créations',
    description: 'Politique de confidentialité de Mahdi Créations, agence web à Marrakech. Informations sur la collecte, l\'utilisation et la protection de vos données personnelles.',
    canonical: '/privacy',
    body,
  });
}

// ── SERVICES ─────────────────────────────────────────────
function generateServicesPage() {
  const serviceDetails = [
    { icon: 'Monitor', title: 'Création de Sites Web', desc: 'Nous concevons des sites vitrines et e-commerce d\'exception, alliant élégance visuelle et performances techniques de pointe.', benefits: ['Design luxueux sur mesure', 'Optimisé à 100% pour mobiles & tablettes', 'Vitesse de chargement ultra-rapide', 'Intégration du paiement sécurisé marocain (CMI)'], process: ['Cadrage & CDC', 'Maquettes UX/UI', 'Développement', 'Tests & Lancement'], href: '/creation-site-web' },
    { icon: 'Code2', title: 'Développement Web Sur Mesure', desc: 'Nous créons des fonctionnalités avancées et des plateformes dynamiques codées selon vos besoins spécifiques.', benefits: ['Architecture logicielle évolutive', 'Intégration d\'API et de services externes', 'Panneau d\'administration personnalisé', 'Sécurité renforcée des données'], process: ['Analyse fonctionnelle', 'Architecture BDD', 'Codage', 'Sécurisation'], href: '/contact' },
    { icon: 'AppWindow', title: 'Applications Web & SaaS', desc: 'Développez des solutions logicielles cloud-native à destination de vos clients ou pour vos processus internes.', benefits: ['Interface utilisateur intuitive', 'Automatisation des processus métiers', 'Gestion d\'utilisateurs et rôles', 'Hébergement cloud sécurisé'], process: ['Spécifications', 'Prototypage', 'Développement Agile', 'Hébergement & Maintenance'], href: '/contact' },
    { icon: 'Palette', title: 'Design Graphique & Infographie', desc: 'Notre équipe de créatifs crée des chartes visuelles de luxe qui captent l\'essence et les valeurs de votre marque.', benefits: ['Création de logos originaux vectoriels', 'Charte graphique complète', 'Supports de communication print & digital', 'Bannières publicitaires haut de gamme'], process: ['Moodboard créatif', 'Propositions de logos', 'Finalisation', 'Kit de marque complet'], href: '/contact' },
    { icon: 'Search', title: 'Référencement Naturel SEO', desc: 'Positionnez votre entreprise en tête des résultats de recherche Google au Maroc et ciblez vos clients idéaux.', benefits: ['Audit technique SEO complet', 'Recherche de mots-clés stratégiques', 'Rédaction de contenus optimisés', 'Rapports de performance mensuels'], process: ['Audit SEO', 'Stratégie de mots-clés', 'Optimisation On-page', 'Netlinking & Suivi'], href: '/referencement-seo' },
    { icon: 'TrendingUp', title: 'Marketing Digital', desc: 'Propulsez votre croissance grâce à des campagnes publicitaires ciblées et une gestion professionnelle de vos réseaux sociaux.', benefits: ['Campagnes Google Ads & Meta Ads', 'Gestion des réseaux sociaux', 'Email marketing automatisé', 'Reporting analytique détaillé'], process: ['Audit digital', 'Stratégie de contenu', 'Lancement de campagnes', 'Optimisation & ROI'], href: '/marketing-digital' },
    { icon: 'Server', title: 'Hébergement Web & Domaines', desc: 'Hébergement web sécurisé haute performance au Maroc sur serveurs SSD NVMe, certificats SSL gratuits et gestion de vos noms de domaine.', benefits: ['Serveurs SSD NVMe ultra-rapides', 'Certificat SSL gratuit inclus', 'Sauvegardes quotidiennes automatiques', 'Uptime garanti 99.9%'], process: ['Choix de formule', 'Configuration serveur', 'Migration de données', 'Monitoring continu'], href: '/contact' },
    { icon: 'Wrench', title: 'Maintenance & Support Web', desc: 'Maintenance technique, mises à jour de sécurité régulières, sauvegardes automatiques et correction de bugs rapide.', benefits: ['Mises à jour de sécurité régulières', 'Sauvegardes automatiques hebdomadaires', 'Support réactif sous 24h', 'Rapport mensuel de performance'], process: ['Audit technique', 'Mise en place du monitoring', 'Maintenance préventive', 'Support & évolutions'], href: '/contact' },
  ];

  const cards = serviceDetails.map(s => `
<div class="reveal bg-dark-card border border-white/5 rounded-3xl p-8 flex flex-col gap-6 hover:border-gold/20 transition-all duration-300 group">
  <div class="flex items-center gap-4">
    <div class="bg-gold/10 text-gold rounded-xl p-3 w-12 h-12 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">${icons[s.icon]}</div>
    <h3 class="font-display font-medium text-xl text-text-white group-hover:text-gold transition-colors">${s.title}</h3>
  </div>
  <p class="font-body text-sm text-text-muted leading-relaxed">${s.desc}</p>
  <ul class="flex flex-col gap-2">
    ${s.benefits.map(b => `<li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold shrink-0">${icons.Check}</span>${b}</li>`).join('\n    ')}
  </ul>
  <div class="border-t border-white/5 pt-4">
    <span class="text-[10px] font-body font-bold uppercase tracking-wider text-text-muted mb-2 block">Processus :</span>
    <div class="flex flex-wrap gap-2">
      ${s.process.map((p, i) => `<span class="flex items-center gap-1 text-[11px] font-body text-text-muted"><span class="text-gold font-semibold">${String(i+1).padStart(2,'0')}.</span>${p}</span>`).join(' <span class="text-gold/20">›</span> ')}
    </div>
  </div>
  <a href="${s.href}" class="mt-auto bg-dark border border-gold/20 text-gold font-body font-semibold text-sm py-2.5 rounded-full text-center hover:bg-gold hover:text-dark transition-all duration-300">
    En savoir plus
  </a>
</div>`).join('\n');

  const body = `
<div class="bg-dark text-text-white">
  <section class="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center relative z-10">
      <div class="reveal flex flex-col gap-4">
        <span class="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">Nos Expertises</span>
        <h1 class="font-display font-semibold text-5xl md:text-7xl text-white">Nos <span class="text-gold-gradient">Services</span></h1>
        <p class="font-body text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed mt-2">Des solutions digitales complètes pour accompagner votre entreprise à chaque étape de sa croissance en ligne au Maroc et à l'international.</p>
      </div>
    </div>
  </section>
  <section class="py-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${cards}</div>
  </section>
  ${renderConsultationSection()}
</div>`;

  return renderPage({
    path: '/services',
    title: 'Services – Création Web, SEO & Marketing Digital au Maroc | Mahdi Créations',
    description: 'Découvrez tous les services de Mahdi Créations : création de sites web, développement sur mesure, SEO, marketing digital, design graphique et hébergement web au Maroc.',
    canonical: '/services',
    jsonLd: localBusinessJsonLd(),
    body,
  });
}

// ── CREATION SITE WEB ─────────────────────────────────────
function generateCreationWebPage() {
  const body = `
<div class="bg-dark text-text-white">
  <section class="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
      <div class="reveal flex flex-col gap-4 max-w-3xl">
        <span class="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">Spécialité #1</span>
        <h1 class="font-display font-semibold text-5xl md:text-7xl text-white">Création de <span class="text-gold-gradient">Sites Web</span> au Maroc</h1>
        <p class="font-body text-base md:text-lg text-text-muted leading-relaxed mt-2">Nous créons des sites web professionnels, rapides et optimisés pour Google à Marrakech et dans tout le Maroc. Vitrines, e-commerce ou applications sur mesure.</p>
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <a href="/contact" class="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-transform inline-block text-center">
            Demander un devis gratuit
          </a>
          <a href="/realisations" class="border border-gold text-gold font-body font-semibold text-base px-8 py-3.5 rounded-full hover:bg-gold/5 transition-all inline-block text-center">
            Voir nos réalisations
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="py-24 bg-dark">
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
      <div class="reveal text-center mb-16 flex flex-col gap-3 max-w-3xl mx-auto">
        <span class="text-xs uppercase font-body font-semibold tracking-wider text-gold">Nos Spécialités Web</span>
        <h2 class="font-display font-medium text-3xl md:text-5xl text-white">Quel type de site web pour vous ?</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${[
          { title: 'Site Vitrine & Dynamique', emoji: '🏢', desc: 'Présence professionnelle en ligne pour votre entreprise. Design premium, responsive, optimisé SEO. Idéal pour PME, artisans, professions libérales, hôtels et riads.', features: ['Design sur mesure', 'Adapté mobile & tablette', 'SEO de base intégré', 'Formulaire de contact', 'Google Maps intégré', 'Mise en ligne rapide 2-3 semaines'] },
          { title: 'Site E-commerce', emoji: '🛒', desc: 'Boutique en ligne complète avec gestion des produits, paiement sécurisé CMI, et expérience d\'achat optimisée. Parfait pour vendre vos produits au Maroc et à l\'international.', features: ['Catalogue produits illimité', 'Paiement CMI intégré', 'Gestion des stocks', 'Tableau de bord admin', 'Suivi des commandes', 'Optimisation taux de conversion'] },
          { title: 'Application Web', emoji: '⚙️', desc: 'Plateforme digitale complexe développée sur mesure : SaaS, CRM, système de réservation, portail client. Architectures modernes et évolutives pour les entreprises ambitieuses.', features: ['Architecture évolutive', 'Intégrations API', 'Authentification sécurisée', 'Dashboard analytique', 'Multi-utilisateurs & rôles', 'Support & maintenance'] },
        ].map(c => `
<div class="reveal bg-dark-card border border-white/5 rounded-3xl p-8 hover:border-gold/20 transition-all duration-300 flex flex-col gap-6">
  <div class="text-4xl">${c.emoji}</div>
  <h3 class="font-display font-medium text-2xl text-text-white">${c.title}</h3>
  <p class="font-body text-sm text-text-muted leading-relaxed">${c.desc}</p>
  <ul class="flex flex-col gap-2 mt-auto">
    ${c.features.map(f => `<li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold">${icons.Check}</span>${f}</li>`).join('\n    ')}
  </ul>
  <a href="/contact" class="mt-4 bg-dark border border-gold/20 text-gold font-body font-semibold text-sm py-2.5 rounded-full text-center hover:bg-gold hover:text-dark transition-all duration-300">
    Demander un devis
  </a>
</div>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="py-24 bg-cream text-dark">
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
      <div class="reveal text-center mb-16 flex flex-col gap-3 max-w-3xl mx-auto">
        <h2 class="font-display font-semibold text-3xl md:text-5xl text-dark">Notre processus de création</h2>
        <p class="font-body text-base text-dark/70">Un accompagnement structuré de la réflexion à la mise en ligne.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        ${[
          { step: '01', title: 'Découverte & Cadrage', desc: 'Réunion initiale pour comprendre vos objectifs, votre marché cible et vos besoins fonctionnels précis.' },
          { step: '02', title: 'Design & Maquettes', desc: 'Création de maquettes UX/UI sur mesure pour validation avant tout développement. Votre retour guide chaque pixel.' },
          { step: '03', title: 'Développement', desc: 'Développement propre, performant et sécurisé selon les standards actuels du web (accessibilité, SEO technique).' },
          { step: '04', title: 'Tests & Lancement', desc: 'Tests multi-appareils rigoureux, optimisation des performances, formation à l\'outil et mise en ligne accompagnée.' },
        ].map(p => `
<div class="reveal bg-white rounded-2xl p-8 border border-dark/5 shadow-md">
  <div class="font-display text-4xl font-bold text-gold-deep/20 mb-4">${p.step}</div>
  <h3 class="font-display font-medium text-xl text-dark mb-3">${p.title}</h3>
  <p class="font-body text-sm text-dark/70 leading-relaxed">${p.desc}</p>
</div>`).join('\n')}
      </div>
    </div>
  </section>

  ${renderConsultationSection()}
</div>`;

  return renderPage({
    path: '/creation-site-web',
    title: 'Création Site Web au Maroc & Marrakech | Mahdi Créations',
    description: 'Création de sites web professionnels au Maroc : vitrines, e-commerce, applications sur mesure. Design premium, optimisé SEO et livré en 2-3 semaines. Devis gratuit.',
    canonical: '/creation-site-web',
    jsonLd: localBusinessJsonLd(),
    body,
  });
}

// ── REFERENCEMENT SEO ─────────────────────────────────────
function generateSeoPage() {
  const body = `
<div class="bg-dark text-text-white">
  <section class="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
      <div class="reveal flex flex-col gap-4 max-w-3xl">
        <span class="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">Référencement Google</span>
        <h1 class="font-display font-semibold text-5xl md:text-7xl text-white">Référencement Naturel <span class="text-gold-gradient">SEO</span> au Maroc</h1>
        <p class="font-body text-base md:text-lg text-text-muted leading-relaxed mt-2">Propulsez votre site web en première page de Google au Maroc. Nos experts SEO mettent en œuvre des stratégies éprouvées pour générer un trafic organique durable et rentable.</p>
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <a href="/contact" class="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-transform inline-block text-center">
            Audit SEO gratuit
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="py-24 bg-dark">
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
      <div class="reveal text-center mb-16 flex flex-col gap-3 max-w-3xl mx-auto">
        <span class="text-xs uppercase font-body font-semibold tracking-wider text-gold">Notre Méthode</span>
        <h2 class="font-display font-medium text-3xl md:text-5xl text-white">Les 4 piliers de notre stratégie SEO</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        ${[
          { step: '01', title: 'Audit Technique', desc: 'Analyse complète de votre site : vitesse, structure, indexation, erreurs et opportunités d\'optimisation.' },
          { step: '02', title: 'Mots-clés Stratégiques', desc: 'Recherche poussée des termes de recherche à fort potentiel utilisés par vos clients marocains.' },
          { step: '03', title: 'Optimisation On-Page', desc: 'Rédaction de contenus optimisés, balisage sémantique parfait et amélioration de l\'expérience utilisateur.' },
          { step: '04', title: 'Netlinking & Suivi', desc: 'Acquisition de liens de qualité et suivi mensuel des positions Google avec rapports détaillés.' },
        ].map(p => `
<div class="reveal bg-dark-card border border-white/5 rounded-2xl p-6 relative hover:border-gold/20 transition-all duration-300">
  <div class="font-display text-4xl font-bold text-gold/20 mb-4">${p.step}</div>
  <h3 class="font-display font-medium text-lg text-text-white mb-2">${p.title}</h3>
  <p class="font-body text-xs text-text-muted leading-relaxed">${p.desc}</p>
</div>`).join('\n')}
      </div>
    </div>
  </section>

  ${renderConsultationSection()}
</div>`;

  return renderPage({
    path: '/referencement-seo',
    title: 'Référencement Naturel SEO au Maroc & Marrakech | Mahdi Créations',
    description: 'Expert référencement SEO au Maroc. Audit, stratégie de mots-clés, optimisation technique et netlinking pour apparaître en 1ère page Google. Devis gratuit.',
    canonical: '/referencement-seo',
    jsonLd: localBusinessJsonLd(),
    body,
  });
}

// ── MARKETING DIGITAL ─────────────────────────────────────
function generateMarketingPage() {
  const body = `
<div class="bg-dark text-text-white">
  <section class="relative py-24 bg-dark-section border-b border-white/5 noise-overlay">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at center,rgba(201,150,12,0.05) 0%,transparent 60%)"></div>
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
      <div class="reveal flex flex-col gap-4 max-w-3xl">
        <span class="text-xs uppercase font-body font-semibold tracking-[0.2em] text-gold">Acquisition & Croissance</span>
        <h1 class="font-display font-semibold text-5xl md:text-7xl text-white">Marketing <span class="text-gold-gradient">Digital</span> au Maroc</h1>
        <p class="font-body text-base md:text-lg text-text-muted leading-relaxed mt-2">Campagnes publicitaires Google Ads & Meta Ads, gestion des réseaux sociaux et stratégie digitale complète pour développer votre activité au Maroc et à l'international.</p>
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <a href="/contact" class="bg-gold-gradient text-dark font-body font-semibold text-base px-8 py-3.5 rounded-full shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-transform inline-block text-center">
            Stratégie gratuite
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="py-24 bg-dark">
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
      <div class="reveal text-center mb-16 flex flex-col gap-3 max-w-3xl mx-auto">
        <span class="text-xs uppercase font-body font-semibold tracking-wider text-gold">Nos Leviers</span>
        <h2 class="font-display font-medium text-3xl md:text-5xl text-white">Des canaux d'acquisition performants</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${[
          { icon: 'Search', title: 'Google Ads', desc: 'Campagnes Search et Display ciblées pour capter les clients qui recherchent activement vos produits et services sur Google au Maroc.', features: ['Ciblage géographique précis', 'Optimisation du CPC', 'Landing pages optimisées', 'Reporting transparent'] },
          { icon: 'TrendingUp', title: 'Meta Ads (Facebook & Instagram)', desc: 'Publicités sociales hautement ciblées par âge, localisation et centres d\'intérêt pour développer votre notoriété et générer des leads qualifiés.', features: ['Audiences personnalisées', 'Retargeting intelligent', 'Création de visuels publicitaires', 'A/B testing avancé'] },
          { icon: 'UserCheck', title: 'Gestion Réseaux Sociaux', desc: 'Community management professionnel pour développer votre présence sur Instagram, Facebook, TikTok et LinkedIn au Maroc avec un contenu de qualité.', features: ['Calendrier éditorial mensuel', 'Création de contenu visuel', 'Modération des commentaires', 'Rapports de performance'] },
          { icon: 'Mail', title: 'Email Marketing', desc: 'Campagnes d\'email marketing automatisées pour fidéliser vos clients existants, réactiver les prospects et générer des ventes récurrentes.', features: ['Segmentation de base de données', 'Sequences automatisées', 'Design emailings premium', 'Optimisation taux d\'ouverture'] },
        ].map(s => `
<div class="reveal bg-dark-card border border-white/5 rounded-2xl p-8 flex gap-6 hover:border-gold/20 transition-all duration-300">
  <div class="bg-gold/10 text-gold rounded-xl p-3 shrink-0 h-12 w-12 flex items-center justify-center">${icons[s.icon]}</div>
  <div class="flex flex-col gap-3">
    <h3 class="font-display font-medium text-xl text-text-white">${s.title}</h3>
    <p class="font-body text-sm text-text-muted leading-relaxed">${s.desc}</p>
    <ul class="flex flex-col gap-1.5">
      ${s.features.map(f => `<li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold">${icons.Check}</span>${f}</li>`).join('\n      ')}
    </ul>
  </div>
</div>`).join('\n')}
      </div>
    </div>
  </section>

  ${renderConsultationSection()}
</div>`;

  return renderPage({
    path: '/marketing-digital',
    title: 'Marketing Digital au Maroc – Google Ads, Meta Ads & Réseaux Sociaux | Mahdi Créations',
    description: 'Agence marketing digital au Maroc. Campagnes Google Ads, Facebook Ads, gestion réseaux sociaux et email marketing pour développer votre activité. Devis gratuit.',
    canonical: '/marketing-digital',
    jsonLd: localBusinessJsonLd(),
    body,
  });
}

// ══════════════════════════════════════════════════════════
// GENERATE SITEMAP
// ══════════════════════════════════════════════════════════
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const staticRoutes = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/a-propos', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.8', changefreq: 'weekly' },
    { url: '/creation-site-web', priority: '0.8', changefreq: 'weekly' },
    { url: '/referencement-seo', priority: '0.8', changefreq: 'weekly' },
    { url: '/marketing-digital', priority: '0.8', changefreq: 'weekly' },
    { url: '/realisations', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/faq', priority: '0.6', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  ];

  const blogRoutes = blogArticles.map(a => ({ url: `/blog/${a.slug}`, priority: '0.7', changefreq: 'monthly' }));
  const allRoutes = [...staticRoutes, ...blogRoutes];

  const urls = allRoutes.map(r => `  <url>
    <loc>${siteConfig.baseUrl}${r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// ══════════════════════════════════════════════════════════
// MAIN BUILD RUNNER
// ══════════════════════════════════════════════════════════
function writePage(filePath, content) {
  const dir = path.dirname(filePath);
  mkdirp(dir);
  fs.writeFileSync(filePath, content, 'utf8');
}

function build() {
  console.log('🏗️  Mahdi Créations — Static Site Builder');
  console.log('==========================================');

  // Copy images
  copyImages();

  // Home
  writePage(path.join(DIST, 'index.html'), generateHomePage());
  console.log('✅ index.html');

  // Services pages
  writePage(path.join(DIST, 'services', 'index.html'), generateServicesPage());
  console.log('✅ services/index.html');

  writePage(path.join(DIST, 'creation-site-web', 'index.html'), generateCreationWebPage());
  console.log('✅ creation-site-web/index.html');

  writePage(path.join(DIST, 'referencement-seo', 'index.html'), generateSeoPage());
  console.log('✅ referencement-seo/index.html');

  writePage(path.join(DIST, 'marketing-digital', 'index.html'), generateMarketingPage());
  console.log('✅ marketing-digital/index.html');

  // Portfolio
  writePage(path.join(DIST, 'realisations', 'index.html'), generateRealisationsPage());
  console.log('✅ realisations/index.html');

  // Blog
  writePage(path.join(DIST, 'blog', 'index.html'), generateBlogIndex());
  console.log('✅ blog/index.html');

  blogArticles.forEach(article => {
    writePage(path.join(DIST, 'blog', article.slug, 'index.html'), generateBlogArticle(article));
    console.log(`✅ blog/${article.slug}/index.html`);
  });

  // Info pages
  writePage(path.join(DIST, 'a-propos', 'index.html'), generateAProposPage());
  console.log('✅ a-propos/index.html');

  writePage(path.join(DIST, 'faq', 'index.html'), generateFaqPage());
  console.log('✅ faq/index.html');

  writePage(path.join(DIST, 'contact', 'index.html'), generateContactPage());
  console.log('✅ contact/index.html');

  writePage(path.join(DIST, 'privacy', 'index.html'), generatePrivacyPage());
  console.log('✅ privacy/index.html');

  // 404
  writePage(path.join(DIST, '404.html'), generate404Page());
  console.log('✅ 404.html');

  // Sitemap
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), generateSitemap(), 'utf8');
  console.log('✅ sitemap.xml');

  // robots.txt
  const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteConfig.baseUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST, 'robots.txt'), robots, 'utf8');
  console.log('✅ robots.txt');

  // .htaccess
  const htaccess = `# Mahdi Créations — Apache Configuration
# Clean URLs + Gzip + Browser Caching

Options -Indexes
ServerSignature Off

# ── Clean URLs (no .html extension) ──
RewriteEngine On
RewriteBase /

# Redirect www to non-www
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^ https://%1%{REQUEST_URI} [R=301,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# Remove trailing slash (except root)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)/$ /$1 [R=301,L]

# Serve index.html for clean URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !\.
RewriteRule ^(.*)$ /$1/index.html [L]

# ── Custom Error Pages ──
ErrorDocument 404 /404.html

# ── Gzip Compression ──
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# ── Browser Caching ──
<IfModule mod_expires.c>
  ExpiresActive On
  # HTML - no cache (always fresh)
  ExpiresByType text/html "access plus 0 seconds"
  # CSS & JS - 1 year
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  # Images - 6 months
  ExpiresByType image/jpeg "access plus 6 months"
  ExpiresByType image/png "access plus 6 months"
  ExpiresByType image/webp "access plus 6 months"
  ExpiresByType image/svg+xml "access plus 6 months"
  ExpiresByType image/gif "access plus 6 months"
  ExpiresByType image/x-icon "access plus 1 year"
  # Fonts - 1 year
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# ── Cache-Control Headers ──
<IfModule mod_headers.c>
  <FilesMatch "\.(html)$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
  <FilesMatch "\.(css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\.(jpg|jpeg|png|gif|webp|svg|ico)$">
    Header set Cache-Control "public, max-age=15552000"
  </FilesMatch>
  # Security headers
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# ── PHP API CORS ──
<FilesMatch "\.php$">
  Header set Access-Control-Allow-Origin "https://mahdicreations.ma"
</FilesMatch>
`;
  fs.writeFileSync(path.join(DIST, '.htaccess'), htaccess, 'utf8');
  console.log('✅ .htaccess');

  console.log('==========================================');
  console.log('🎉 Build complete! Static site at ./dist/');
}

build();
