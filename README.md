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
