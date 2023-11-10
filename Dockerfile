FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install && npm install typescript -g

COPY . .

RUN tsc

CMD [ "node", "./dist/app.js" ] 