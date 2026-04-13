# Apio systems

Site vitrine et back-office pour Apio systems.

## Stack

- **Monorepo** : pnpm workspaces + Turborepo
- **Frontend** (`apps/web`) : Next.js 15, React 19, Tailwind CSS 4, shadcn/ui
- **Backend** (`apps/api`) : Fastify 5, TypeScript strict, Prisma (MariaDB)
- **Shared** (`packages/shared`) : Schémas Zod, types inférés, constantes

## Prérequis

- Node.js >= 20
- pnpm 9
- MariaDB (ou MySQL)

## Installation

```bash
pnpm install
```

## Configuration

Créer un fichier `apps/api/.env` :

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=mysql://user:password@localhost:3306/apio
JWT_SECRET=un-secret-de-minimum-32-caracteres-ici
CORS_ORIGIN=http://localhost:3000

# Optionnel - envoi d'emails
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=

# Optionnel - revalidation on-demand du cache Next.js
REVALIDATION_URL=http://localhost:3000/api/revalidate
REVALIDATION_SECRET=un-secret-de-minimum-16-caracteres
```

Créer un fichier `apps/web/.env` :

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
API_URL=http://localhost:4000
SITE_URL=http://localhost:3000

# Même secret que côté API
REVALIDATION_SECRET=un-secret-de-minimum-16-caracteres
```

## Base de données

```bash
# Générer le client Prisma
pnpm db:generate

# Appliquer les migrations
pnpm db:migrate

# (Optionnel) Seed de données de test
pnpm --filter @apio/api db:seed
```

## Démarrage en développement

```bash
pnpm dev
```

Lance en parallèle :

- **Web** : http://localhost:3000
- **API** : http://localhost:4000

## Scripts racine (package.json)

| Commande            | Description                                     |
| ------------------- | ----------------------------------------------- |
| `pnpm dev`          | Démarre tous les workspaces en mode dev (watch) |
| `pnpm build`        | Build de production de tous les packages        |
| `pnpm lint`         | Lint de tous les workspaces                     |
| `pnpm typecheck`    | Vérification TypeScript de tous les workspaces  |
| `pnpm test`         | Lance les tests (Vitest)                        |
| `pnpm db:generate`  | Génère le client Prisma                         |
| `pnpm db:migrate`   | Applique les migrations Prisma                  |
| `pnpm clean`        | Supprime les artefacts de build                 |
| `pnpm format`       | Formate le code avec Prettier                   |
| `pnpm format:check` | Vérifie le formatage Prettier                   |
| `pnpm check`        | Format + lint + typecheck + test + build (CI)   |

## Scripts spécifiques

### API (`apps/api`)

| Commande                             | Description                       |
| ------------------------------------ | --------------------------------- |
| `pnpm --filter @apio/api dev`        | Dev avec watch + hot-reload (tsx) |
| `pnpm --filter @apio/api start`      | Démarre le build de production    |
| `pnpm --filter @apio/api test:watch` | Tests en mode watch               |
| `pnpm --filter @apio/api db:push`    | Push le schéma sans migration     |
| `pnpm --filter @apio/api db:seed`    | Seed de la base de données        |

### Web (`apps/web`)

| Commande                        | Description                  |
| ------------------------------- | ---------------------------- |
| `pnpm --filter @apio/web dev`   | Next.js dev sur le port 3000 |
| `pnpm --filter @apio/web build` | Build de production          |
| `pnpm --filter @apio/web start` | Démarre le serveur Next.js   |

## Structure du monorepo

```
├── apps/
│   ├── api/          # Backend Fastify
│   └── web/          # Frontend Next.js
├── packages/
│   ├── shared/       # Schémas Zod, types, constantes
│   ├── eslint-config/
│   └── typescript-config/
└── package.json      # Scripts Turborepo
```
