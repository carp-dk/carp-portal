FROM node:19.7-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.server.json ./package.json

USER node

RUN npm install

COPY --chown=node:node app.js ./
COPY --chown=node:node .env ./
COPY --chown=node:node build/ ./build/

ENV PORT=8080

EXPOSE 8080

CMD [ "node", "app.js" ]
