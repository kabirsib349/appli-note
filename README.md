# Appli-Note (SaaS)

Une application moderne de prise de notes avec un modèle économique SaaS, incluant une gestion d'abonnements Premium.

**Démo en ligne :** [k-note.duckdns.org](https://k-note.duckdns.org)

---

## Stack Technique

| Technologie | Description |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework fullstack (App Router) |
| [NextAuth.js](https://next-auth.js.org/) | Authentification (OAuth & session) |
| [Prisma](https://www.prisma.io/) + PostgreSQL | ORM & base de données |
| [Stripe](https://stripe.com/) | Abonnements & Webhooks |
| [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn/ui](https://ui.shadcn.com/) | Styling & composants UI |
| [Lucide React](https://lucide.dev/) | Icones |
| [Ollama](https://ollama.com/) + qwen2.5:0.5b | IA locale pour assistance a la redaction |

---

## Fonctionnalites

- **Authentification Securisee** : Connexion et inscription via NextAuth.js (OAuth).
- **Gestion des Notes** : Creation, modification, suppression et epinglage de notes personnelles.
- **Assistance IA** : Correction orthographique, restructuration Markdown et amelioration de style via un modele LLM auto-heberge (Ollama).
- **Pass Premium** : Systeme d'abonnement mensuel via Stripe.
- **Espace Client Stripe** : Gestion de l'abonnement et des factures via le portail client Stripe.
- **Design Responsive** : Interface optimisee pour mobile, tablette et desktop.
- **Mode Sombre/Clair** : Support complet du theme systeme.

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/ton-username/appli-note.git
cd appli-note
```

### 2. Installer les dependances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Cree un fichier `.env` a la racine et remplis les cles suivantes :

```env
# Base de donnees
DATABASE_URL=
DIRECT_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Ollama (optionnel — valeurs par defaut deja dans le code)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b
```

### 4. Initialiser la base de donnees

```bash
npx prisma generate
npx prisma db push
```

### 5. Lancer le serveur de developpement

```bash
npm run dev
```

---

## Configuration Stripe (Local)

Pour tester les paiements en local, utilise le Stripe CLI pour rediriger les webhooks vers ton serveur local :

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

---

## Configuration Ollama (IA locale)

L'application utilise un modele LLM auto-heberge via Ollama pour les fonctionnalites d'assistance a la redaction. Aucune cle API externe n'est requise.

### Installation sur le serveur

```bash
# Installer Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Telecharger le modele (environ 270 MB)
ollama pull qwen2.5:0.5b

# Activer le demarrage automatique
sudo systemctl enable ollama
sudo systemctl start ollama
```

### Fonctionnalites IA disponibles

- **Corriger** : corrige les fautes d'orthographe et de grammaire (gratuit)
- **Restructurer** : organise le contenu en Markdown (gratuit)
- **Ameliorer le style** : ameliore le vocabulaire et la fluidite (gratuit)
