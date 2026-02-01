FROM node:22-alpine3.19 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm run build

FROM node:22-alpine3.19 AS runtime
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev --ignore-scripts
COPY --from=build /app/dist /app/dist

EXPOSE 8083

ENTRYPOINT ["node", "/app/dist/server/index.js"]