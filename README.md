 Appli-Note (SaaS)

  Une application moderne de prise de notes avec un modèle économique SaaS, incluant une gestion d'abonnements Premium.

   Stack Technique

   - Framework : Next.js 15 (App Router) (https://nextjs.org/)
   - Authentification : Kinde (https://kinde.com/) (ou ton provider actuel)
   - Base de données : Prisma (https://www.prisma.io/) avec PostgreSQL (via Supabase/Aiven)
   - Paiements : Stripe (https://stripe.com/) (Abonnements & Webhooks)
   - Styling : Tailwind CSS (https://tailwindcss.com/) & Shadcn/ui (https://ui.shadcn.com/)
   - Icônes : Lucide React (https://lucide.dev/)

   Fonctionnalités

   - Authentification Sécurisée : Connexion et inscription simplifiées.
   - Gestion des Notes : Création, modification et suppression de notes personnelles.
   - Pass Premium : Système d'abonnement mensuel(zero fonctionnalité debloqué mais le principe d'abonnement est là😉).
   - Espace Client Stripe : Gestion de l'abonnement et des factures via le portail client Stripe.
   - Design Responsive : Interface optimisée pour mobile, tablette et desktop.
   - Mode Sombre/Clair : Support complet du thème système.

   Installation

   1. Cloner le projet :

   1    git clone https://github.com/ton-username/appli-note.git
   2    cd appli-note

   2. Installer les dépendances :
   1    npm install

   3. Configurer les variables d'environnement :
     Crée un fichier .env à la racine et ajoute tes clés :

   1    DATABASE_URL=
   2    KINDE_CLIENT_ID=
   3    STRIPE_API_KEY=
   4    STRIPE_WEBHOOK_SECRET=
   5    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

   4. Initialiser la base de données :

   1    npx prisma generate
   2    npx prisma db push

   5. Lancer le serveur de développement :
   1    npm run dev

   Configuration Stripe (Local)

  Pour tester les paiements en local, lance le Stripe CLI pour rediriger les webhooks :

   1 stripe listen --forward-to localhost:3000/api/webhook/stripe

   Licence

  Distribué sous la licence MIT. Voir LICENSE pour plus d'informations.
