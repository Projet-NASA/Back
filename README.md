# Projet NASA Backend

Ce projet backend a été développé avec Node.js, Express, MongoDB, et Prisma. Il sert de backend pour le projet NASA, fournissant une API pour interagir avec la base de données MongoDB.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :

- Node.js (version recommandée 14.x ou supérieure)
- bun
- MongoDB (si vous souhaitez exécuter une instance locale)

## Installation

Pour configurer le projet sur votre machine locale, suivez ces étapes :

1. Clonez le dépôt sur votre machine locale :

   ```
   git clone <URL_DU_DEPOT>
   cd mon-back-end
   ```

2. Installez les dépendances du projet :

   ```
   bun install

   ```

3. Configurez les variables d'environnement :

   Copiez le fichier `.env.example` en un nouveau fichier nommé `.env` et remplacez les valeurs par défaut par vos configurations spécifiques :

   ```
   cp .env.example .env
   ```

   Assurez-vous de définir correctement `MONGODB_URI` avec votre chaîne de connexion MongoDB.

4. Générez le client Prisma (si votre projet utilise Prisma) :

   ```
   npx prisma generate
   ```

## Démarrage du serveur

Pour démarrer le serveur en mode développement, exécutez :

    bun start

Le serveur devrait démarrer et écouter sur le port spécifié dans votre fichier `.env` (par défaut : 3003). Vous pouvez accéder à l'API via `http://localhost:3003/`.

## Structure du projet

- `src/` : Contient les fichiers source du projet.
  - `index.ts` : Le point d'entrée de l'application.
  - `server.ts` : Configuration du serveur et connexion à MongoDB.
- `prisma/` : Contient le schéma Prisma et les migrations (si Prisma est utilisé).
- `.env` : Fichier de configuration pour les variables d'environnement.
- `package.json` : Fichier de configuration du projet et des dépendances.

## API Endpoints

Listez ici les différents endpoints de votre API et décrivez brièvement leur fonction.

Exemple :

- `GET /` : Renvoie un message de bienvenue.
- `POST /data` : Ajoute de nouvelles données à la base.

## Contribution

Si vous souhaitez contribuer à ce projet, veuillez suivre les directives de contribution. Assurez-vous de suivre les bonnes pratiques de codage et de soumettre des Pull Requests pour toute nouvelle fonctionnalité ou correction de bug.

## Licence

[MIT](LICENSE)

lkWs9OWwQxfZ9QPJ


