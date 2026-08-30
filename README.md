# 📝 Appli-Note (SaaS)

Une application moderne de prise de notes avec un modèle économique SaaS, incluant une gestion d'abonnements Premium.

🌐 **Démo en ligne :** [k-note.duckdns.org](https://k-note.duckdns.org)

---

## 🛠️ Stack Technique

| Technologie | Description |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework fullstack (App Router) |
| [NextAuth.js](https://next-auth.js.org/) | Authentification (OAuth & session) |
| [Prisma](https://www.prisma.io/) + PostgreSQL | ORM & base de données |
| [Stripe](https://stripe.com/) | Abonnements & Webhooks |
| [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn/ui](https://ui.shadcn.com/) | Styling & composants UI |
| [Lucide React](https://lucide.dev/) | Icônes |

---

## ✨ Fonctionnalités

- **Authentification Sécurisée** : Connexion et inscription via NextAuth.js (OAuth).
- **Gestion des Notes** : Création, modification, suppression et épinglage de notes personnelles.
- **Pass Premium** : Système d'abonnement mensuel via Stripe (le principe est là 😉).
- **Espace Client Stripe** : Gestion de l'abonnement et des factures via le portail client Stripe.
- **Design Responsive** : Interface optimisée pour mobile, tablette et desktop.
- **Mode Sombre/Clair** : Support complet du thème système.

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/ton-username/appli-note.git
cd appli-note
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Crée un fichier `.env` à la racine et remplis les clés suivantes :

```env
# Base de données
DATABASE_URL=
DIRECT_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### 4. Initialiser la base de données

```bash
npx prisma generate
npx prisma db push
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

---

## 💳 Configuration Stripe (Local)

Pour tester les paiements en local, utilise le Stripe CLI pour rediriger les webhooks vers ton serveur local :

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```
