FROM node:16.18-alpine3.16 as builder

WORKDIR /app

COPY package.json .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM alpine:3.16

WORKDIR /app

RUN apk add --update nodejs

COPY --from=builder /app/package.json .
COPY --from=builder /app/build .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "index.js"]