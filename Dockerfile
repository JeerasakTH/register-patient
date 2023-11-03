FROM node:21 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/app.js" ]