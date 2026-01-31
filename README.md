# ci-cd-vehicle-server

Cours de CI/CD par Ibrahima Fofana et Vivien Boucher

## Vehicle Server Typescript

### Requirements

- nodejs
- docker

### Running the server

First start a database server

```bash
docker run -d -e POSTGRES_USER=vehicle -e POSTGRES_PASSWORD=vehicle -e POSTGRES_DB=vehicle -p 5432:5432 postgis/postgis:16-3.4-alpine
```

Then, in another terminal start the server

```bash
node dist/index.js
```

### Test plan

#### Create a Vehicle

```bash
node createVehicle.js -p 8080 --id 12 --sc 'abcd' -b 16 --lng 70.060316 --lat 49.432044
```

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
