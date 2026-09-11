# Mahdi Créations — Agence Web Marrakech

Ce projet est le code source officiel du site vitrine de **Mahdi Créations**, agence web et marketing digital basée à Marrakech, Maroc.

Le site a été entièrement refactoré depuis Next.js/React vers une architecture **Static HTML5, Tailwind CSS, et Vanilla JavaScript** ultra-performante. Cette approche supprime l'overhead de React, garantit un temps de chargement instantané (idéal pour le SEO Google), et permet un hébergement très simple sur n'importe quel serveur web (Apache, Nginx, ou CDN).

## Technologies Utilisées

*   **HTML5 / Vanilla JavaScript :** Aucune librairie frontend lourde. Le code JS est réduit au strict nécessaire (`main.js`).
*   **Tailwind CSS (v3) :** Génération du design system complet via CLI avec minification.
*   **Node.js Build Script :** Un générateur statique sur mesure (`build.js`) qui compile les données JSON/JS en pages HTML statiques.
*   **PHP (Backend) :** Le formulaire de contact utilise un script léger en PHP natif (`contact.php`) via l'API SMTP de Brevo, sans dépendance Composer.

## Structure du Projet

```text
mahdicreation/
├── src/                      # Source files
│   ├── data/                 # Content data (Blog, Portfolio, Site config)
│   │   ├── blog.js
│   │   ├── projects.js
│   │   └── site.js
│   ├── input.css             # Tailwind source CSS (design tokens)
│   └── tailwind.config.js    # Tailwind configuration
├── public/                   # Static assets copied directly to dist/
│   └── images/               # Logos, photos, icons
├── dist/                     # THE PRODUCTION BUILD OUTPUT (Upload this folder)
├── build.js                  # The Node.js static site generator
└── package.json              # NPM scripts
```

## Développement & Compilation

Le projet utilise Node.js uniquement pour générer les fichiers HTML et compiler le CSS.

1. **Installation des dépendances (Tailwind CLI)**
   ```bash
   npm install
   ```

2. **Compiler le projet (HTML + CSS)**
   Ceci exécute le script `build.js` et lance Tailwind CSS pour minifier la feuille de style.
   ```bash
   npm run build
   ```

3. **Prévisualiser le site localement**
   Lance un serveur web local sur le port 4000 pour visualiser le dossier `/dist`.
   ```bash
   npm run serve
   ```

## Déploiement (Production)

Le déploiement est extrêmement simple.

1. Exécutez `npm run build` pour générer la version finale dans le dossier `/dist`.
2. Envoyez **le contenu** du dossier `/dist` sur votre serveur web (via FTP, cPanel, ou SSH) dans le répertoire `public_html` ou `www`.
3. Le fichier `.htaccess` est automatiquement généré pour gérer les URLs propres (retrait de l'extension `.html`), la redirection WWW/HTTPS, et le cache navigateur.

### Configuration du Formulaire de Contact

Le formulaire de contact fonctionne via le fichier `contact/send-mail.php`. Il utilise le serveur SMTP de Hostinger (`smtp.hostinger.com` sur le port 465 SSL).
Les identifiants SMTP peuvent être modifiés directement au début du fichier `contact/send-mail.php`.

## Édition du Contenu

*   **Pages de Base :** Les textes des pages Accueil, Services, etc. se trouvent dans les fonctions correspondantes à l'intérieur du fichier `build.js` (ex: `generateHomePage()`).
*   **Blog :** Pour ajouter un article de blog, modifiez l'array `blogArticles` dans `src/data/blog.js`.
*   **Portfolio :** Pour ajouter une réalisation, modifiez `src/data/projects.js`.
*   **Menu & Réglages Généraux :** Modifiez `src/data/site.js` pour les liens, logos partenaires, téléphone, et email.
