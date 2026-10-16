# Mahdi Créations — Agence Web Marrakech (Astro + Tailwind CSS)

Ce projet est le code source officiel du site vitrine de **Mahdi Créations**, agence web et marketing digital basée à Marrakech, Maroc.

Le site utilise **Astro**, l'architecture moderne la plus rapide pour les sites de contenu (Zero JS par défaut), couplé à **Tailwind CSS v3** et un backend de contact en **PHP natif**.

## Technologies Utilisées

* **Astro (v7 Static) :** Architecture Islands / Static Site Generator ultra-performant. Score Google PageSpeed 100/100 garanti.
* **Tailwind CSS (v3) :** Design system complet et responsive avec polices auto-hébergées.
* **Vanilla JavaScript :** Code client minifié (`main.min.js`) pour les animations, menu mobile, accordéon FAQ et filtres.
* **PHP (Backend) :** Formulaire de contact sécurisé (`contact/send-mail.php`) utilisant le serveur SMTP Hostinger (`smtp.hostinger.com`).
* **Support Multilingue :** Français (`/`), Arabe avec RTL (`/ar/`), Anglais (`/en/`).
* **SEO Complet :** Balises OpenGraph, Twitter Cards, balises hreflang automatiques, JSON-LD Schema.org, Sitemap XML et Robots.txt.

## Structure du Projet

```text
mahdicreation/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      # Layout global (SEO, Meta, Fonts, Analytics, Hreflang)
│   ├── pages/                   # 57 routes statiques (FR, AR, EN)
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├── a-propos/
│   │   ├── services/
│   │   ├── blog/
│   │   ├── realisations/
│   │   ├── contact/
│   │   ├── ar/                  # Pages en arabe (RTL)
│   │   └── en/                  # Pages en anglais
│   └── styles/
│       └── global.css           # Tailwind + Custom Design System
├── public/                      # Fichiers statiques copiés tels quels dans dist/
│   ├── assets/                  # Images WebP, polices WOFF2, JS
│   ├── contact/send-mail.php    # Endpoint PHP SMTP Hostinger
│   ├── .htaccess                # Configuration Apache (Clean URLs, Gzip, Cache)
│   ├── sitemap.xml
│   ├── robots.txt
│   └── favicon.ico
├── dist/                        # Dossier généré pour la production (Hostinger public_html)
├── astro.config.mjs             # Configuration Astro
├── tailwind.config.js           # Configuration Tailwind
└── package.json                 # Scripts NPM
```

## Commandes de Développement

1. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   Accessible sur `http://localhost:4000/`.

2. **Compiler pour la production (Hostinger) :**
   ```bash
   npm run build
   ```
   Cette commande génère le dossier `/dist` complet et prêt à être déployé sur **Hostinger `public_html`**.

3. **Prévisualiser le build de production :**
   ```bash
   npm run preview
   ```

## Déploiement sur Hostinger

1. Exécutez `npm run build`.
2. Envoyez le contenu du dossier `/dist` dans le dossier `public_html` de votre hébergement Hostinger (via Git, FTP ou File Manager).
3. Le fichier `.htaccess` gère automatiquement la redirection HTTPS, les URLs propres (sans extension), et le cache navigateur.
