# CI-CD-vehicle-server

CI/CD class by Ibrahima Fofana and Vivien Boucher

## Vehicle Server Typescript

### Requirements

- nodejs
- .env file with this content:

```bash
DB_HOST=ep-polished-thunder-ahku11mw-pooler.c-3.us-east-1.aws.neon.tech
DB_PORT=5432
DB_DATABASE=neondb
DB_USER=neondb_owner
DB_PASSWORD=npg_FCBrzPfHAl89
PORT=8083
```

### Install dependencies

```bash
npm ci
```

```bash
npm link
```

### Running the server

In another terminal start the server

```bash
npm start
```

## Commands

### Create a vehicle

```bash
vehicle-cli --address=localhost:8083 create-vehicle --shortcode=abcd --battery=12 --longitude=20.0 --latitude=30.0
```

### List all vehicles

```bash
vehicle-cli --address=localhost:8083 list-vehicles
```

### Delete a vehicle

```bash
vehicle-cli --address=localhost:8083 delete-vehicle --id=1
```

## Explore server

Open your browser: Open http://localhost:8083/vehicles in your browser to see the server in action.

## Mes commentaires pour les éléments que j'ajoute

### La partie Pre-commit

1. Installation

- [Husky](https://typicode.github.io/husky/get-started.html)

mais voici les modules que j'ai installé :

``
npm install -D husky lint-staged eslint prettier jtest

npm run prepare

npm install express pg commander && npm install --save-dev typescript @types/node @types/express @types/pg
``

[pour Jtest](https://www.acciyo.com/fr/comment-tester-efficacement-vos-applications-javascript-avec-jest-en-2025/)

[Le Lien pour la ci github action node](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs)
[Pour la publication](https://docs.github.com/en/actions/tutorials/publish-packages/publish-nodejs-packages)
[Pour la publication avec docker](https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images)

ajout de bin dans le package.json et on lance npm link

j'ai ajouté ça dans tsconfig.json pour éviter que typescript compile les fichiers non utiles
`"include": [
    "server/**/*",
    "db/**/*",
    "client/controller/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts"
  ]`

J’ai remplacé commonjs par ESNext dans le fichier tsconfig.json.
Cela permet d’éviter le conflit entre CommonJS et ES Modules (exports is not defined) avec Node.js et "type": "module". (mais ça ne marchait toujours pas)

Le problème venait d’un conflit de configuration : "type": "module" combiné avec module: "commonjs".
j'ai retiré "type": "module" pour tout passer en CommonJS, et désormais le projet compile et s’exécute correctement.

encore problème d'authentification pour la base de donnée

c'est avec la base de donnée neon.tech que ma connexion passe :

j'ai ajouté aussi "ts-node": "^10.9.2" quand j'avais assez de problèmes avec commonjs et type : module

j'ai ajouté la partie ssl comme neon.tech dans le fichier datase.ts: const pool = new Pool({
...cfg,
ssl: {
rejectUnauthorized: false
}
});

c'est pour éviter ce message : ❌ ÉCHEC DE CONNEXION DB
Détail: connection is insecure (try using `sslmode=require`)
Something went wrong connection is insecure (try using `sslmode=require`)

aussi comme on avait déjà mis le vehicle-cli dans le index.js même le fait qu'on a pas mis dans le package.json avec la clé bin, ça passe aussi
la commande avec :
vehicle-cli --address=localhost:8083 create-vehicle --shortcode=abce --battery=12 --longitude=20.0 --latitude=30.0
