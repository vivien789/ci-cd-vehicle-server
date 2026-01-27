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
``

[pour Jtest](https://www.acciyo.com/fr/comment-tester-efficacement-vos-applications-javascript-avec-jest-en-2025/)

[Le Lien pour la ci github action node](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs)
[Pour la publication](https://docs.github.com/en/actions/tutorials/publish-packages/publish-nodejs-packages)
[Pour la publication avec docker](https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images)
