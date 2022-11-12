FROM node:16.18-alpine3.16 as builder

WORKDIR /app

COPY package.json .
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/build .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "index.js"]