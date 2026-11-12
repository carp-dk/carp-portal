FROM oven/bun:1-alpine

RUN mkdir -p /home/bun/app/node_modules && chown -R bun:bun /home/bun/app

WORKDIR /home/bun/app

COPY package.server.json ./package.json

USER bun

RUN bun install

COPY --chown=bun:bun app.js ./
COPY --chown=bun:bun .env ./
COPY --chown=bun:bun build/ ./build/

ENV PORT=8080

EXPOSE 8080

CMD [ "bun", "app.js" ]
