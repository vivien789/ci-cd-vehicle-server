# CI/CD Vehicle Server

Projet de CI/CD par Ibrahima Fofana et Vivien Boucher

## Description

Ce projet est un serveur de gestion de véhicules développé en TypeScript avec Express.js. Il permet de créer, lister et supprimer des véhicules via une API REST et une interface CLI. La partie client (CLI) est développée en JavaScript avec npm pour la gestion des dépendances et Commander.js pour l'interface en ligne de commande.

## Organisation du projet

Le projet est organisé de la manière suivante pour faciliter le travail collaboratif :

- `server/` : Contient tous les fichiers relatifs au serveur (API, routes, logique métier)
- `db/` : Contient les fichiers liés à la base de données
- `client/` : Contient les fichiers clients, notamment l'interface CLI dans le dossier `cli/`

Cette organisation permet de savoir rapidement où effectuer les modifications et de séparer clairement les responsabilités.

## Base de données

### Problèmes rencontrés et solution

Lors du développement, nous avons rencontré des problèmes de connexion à la base de données PostgreSQL fonctionnant sous Docker. Malgré le fait que la base de données était fonctionnelle (nous pouvions y accéder via `docker exec`), nous avions des erreurs d'authentification dans notre code.

Pour ne pas perdre de temps sur ces problèmes de configuration Docker et pouvoir avancer sur le projet, nous avons remplacé la base de données locale par une base de données gérée par **Neon.tech**. La connexion a immédiatement fonctionné avec cette solution.

### Configuration de la base de données Neon.tech

Pour que vous puissiez utiliser notre base de données Neon.tech, nous avons volontairement laissé le fichier `.env` dans l'historique du dépôt. Vous avez donc deux options :

1. **Utiliser notre base de données** : Les informations de connexion sont déjà présentes dans le fichier `.env`
2. **Créer votre propre base de données** : Créez un compte sur [Neon.tech](https://neon.tech), créez une base de données PostgreSQL, et ajoutez les informations de connexion dans le fichier `.env`

## Installation et démarrage

### Prérequis

- Node.js
- npm

### Installation des dépendances

```bash
npm install
```

### Démarrage du serveur

Contrairement à la version initiale qui utilisait Docker, il n'est plus nécessaire de lancer `npm run start-db` puisque nous utilisons Neon.tech.

Pour lancer le serveur :

```bash
npm start
```

Cette commande va :

1. Compiler le code TypeScript (`npm run build`)
2. Lancer le serveur compilé (`node dist/server/index.js`)

Le serveur sera accessible sur `localhost:8083` par défaut.

## Utilisation de l'interface CLI

Une fois le serveur lancé, ouvrez un autre terminal pour utiliser les commandes CLI.

### Important : Installation de la CLI

Si vous rencontrez des erreurs indiquant que `vehicle-cli` n'existe pas, n'oubliez pas de lancer :

```bash
npm link
```

### Commandes disponibles

L'adresse par défaut est `localhost:8083`. Vous pouvez la spécifier avec l'option `--address` si nécessaire.

#### Créer un véhicule

```bash
vehicle-cli --address=localhost:8083 create-vehicle --shortcode=abcd --battery=12 --longitude=20.0 --latitude=30.0
```

Exemple de réponse :

```text
Created vehicule `abcd`, with ID `34`
```

#### Gestion des erreurs

Le système valide les entrées et retourne des messages d'erreur clairs :

```bash
vehicle-cli --address=localhost:8083 create-vehicle --shortcode=abcdef --battery=12 --longitude=20.0 --latitude=30.0
```

Résultat :

```text
Could not create the vehicle
- Shortcode must be only 4 charactes long
```

#### Lister les véhicules

```bash
vehicle-cli --address=localhost:8083 list-vehicles
```

#### Supprimer un véhicule

```bash
vehicle-cli --address=localhost:8083 delete-vehicle --id=valeurID
```

## Scripts disponibles

- `npm start` : Compile et lance le serveur
- `npm run build` : Compile le code TypeScript
- `npm run lint` : Vérifie le code avec ESLint
- `npm run lint:fix` : Corrige automatiquement les problèmes de linting
- `npm run format` : Formate le code avec Prettier
- `npm test` : Lance les tests
- `npm run prepare` : Configure Husky pour les git hooks

## Développement

Ce projet utilise :

- TypeScript pour le typage statique
- ESLint et Prettier pour la qualité du code
- Husky pour les git hooks automatiques
- Jest pour les tests
- Express.js pour le serveur web
- Commander.js pour l'interface CLI
- Worflow github Action
