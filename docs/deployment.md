# Déploiement - Apio systems

## Variables d'environnement

### API (`apps/api/.env`)

| Variable                 | Description                    | Exemple                                 |
| ------------------------ | ------------------------------ | --------------------------------------- |
| `NODE_ENV`               | Environnement                  | `production`                            |
| `PORT`                   | Port d'écoute                  | `4000`                                  |
| `HOST`                   | Adresse d'écoute               | `0.0.0.0`                               |
| `DATABASE_URL`           | Connexion MariaDB              | `mysql://user:pass@localhost:3306/apio` |
| `JWT_SECRET`             | Clé secrète JWT (min 32 chars) | générer avec `openssl rand -base64 48`  |
| `JWT_EXPIRES_IN`         | Durée token d'accès            | `15m`                                   |
| `JWT_REFRESH_EXPIRES_IN` | Durée refresh token            | `7d`                                    |
| `CORS_ORIGIN`            | Origine autorisée CORS         | `https://www.apio.systems`              |
| `SMTP_HOST`              | Serveur SMTP                   | `smtp.example.com`                      |
| `SMTP_PORT`              | Port SMTP                      | `587`                                   |
| `SMTP_USER`              | Utilisateur SMTP               |                                         |
| `SMTP_PASS`              | Mot de passe SMTP              |                                         |
| `SMTP_FROM`              | Adresse expéditeur             | `contact@apio.systems`                  |
| `UPLOAD_DIR`             | Dossier uploads                | `./uploads`                             |
| `REVALIDATION_URL`       | URL du endpoint Next.js de revalidation (optionnel) | `http://localhost:3000/api/revalidate` |
| `REVALIDATION_SECRET`    | Secret partagé pour la revalidation (min 16 chars, optionnel) | générer avec `openssl rand -base64 24` |

### Next.js (variables d'environnement système)

| Variable              | Type           | Description                                                                      |
| --------------------- | -------------- | -------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | **Build-time** | URL de l'API vue par le navigateur (ex: `https://www.apio.systems`)              |
| `API_URL`             | Runtime (SSR)  | URL de l'API vue par le serveur Next.js (ex: `http://localhost:4000`)            |
| `SITE_URL`            | Runtime        | URL du site (ex: `https://www.apio.systems`) - robots.txt, sitemap, metadataBase |
| `DISALLOW_ROBOTS`     | Runtime        | `true` pour bloquer l'indexation (robots.txt renvoie `Disallow: /`)              |
| `PORT`                | Runtime        | Port d'écoute Next.js (défaut: `3000`)                                           |
| `HOSTNAME`            | Runtime        | Adresse d'écoute (mettre `0.0.0.0`)                                              |
| `REVALIDATION_SECRET` | Runtime        | Secret partagé pour la revalidation on-demand (même valeur que côté API)          |

> **Attention** : `NEXT_PUBLIC_API_URL` est figé au moment du build. Si le domaine change, il faut rebuilder.

---

## Build

### Backend (API)

```bash
pnpm install --frozen-lockfile
pnpm --filter @apio/shared build
pnpm --filter @apio/api build

# Initialiser / mettre à jour le schéma de la base
cd apps/api && npx prisma db push && cd ../..
```

### Frontend (Web)

```bash
NEXT_PUBLIC_API_URL=https://www.apio.systems pnpm --filter @apio/web build

# Copier les assets statiques dans le dossier standalone
cp -r apps/web/.next/static apps/web/.next/standalone/apps/web/.next/static
cp -r apps/web/public apps/web/.next/standalone/apps/web/public
```

---

## Démarrage en production

### Backend

```bash
cd apps/api
node --env-file=.env dist/index.js
```

### Frontend

```bash
cd apps/web/.next/standalone
API_URL=http://localhost:4000 \
SITE_URL=https://www.apio.systems \
HOSTNAME=0.0.0.0 \
PORT=3000 \
DISALLOW_ROBOTS=false \
node apps/web/server.js
```

---

## Services systemd (redémarrage automatique)

### `/etc/systemd/system/apio-api.service`

```ini
[Unit]
Description=Apio API (Fastify)
After=network.target mariadb.service

[Service]
Type=simple
User=apio
WorkingDirectory=/opt/apio/apps/api
ExecStart=/usr/bin/node --env-file=/opt/apio/apps/api/.env /opt/apio/apps/api/dist/index.js
Environment=NODE_ENV=production
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

### `/etc/systemd/system/apio-web.service`

```ini
[Unit]
Description=Apio Web (Next.js)
After=network.target apio-api.service

[Service]
Type=simple
User=apio
WorkingDirectory=/opt/apio/apps/web/.next/standalone
ExecStart=/usr/bin/node /opt/apio/apps/web/.next/standalone/apps/web/server.js
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=0.0.0.0
Environment=API_URL=http://localhost:4000
Environment=SITE_URL=https://www.apio.systems
Environment=REVALIDATION_SECRET=un-secret-de-minimum-16-caracteres
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

### Activation

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now apio-api apio-web
```

### Commandes utiles

```bash
# Status
sudo systemctl status apio-api apio-web

# Logs en temps réel
sudo journalctl -u apio-api -f
sudo journalctl -u apio-web -f

# Redémarrer après un déploiement
sudo systemctl restart apio-api apio-web
```
