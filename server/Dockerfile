FROM node:16.13 AS Production

ENV NODE_ENV=production

WORKDIR /usr/reparify/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["sh", "-c", "yarn run serve"]