FROM node:14 AS Production

ENV NODE_ENV=production

WORKDIR /usr/reparify/client

COPY package.json .
COPY yarn.lock .

RUN yarn install --production=false

COPY . .

RUN yarn run build

CMD ["sh", "-c", "yarn run start:prod"]