FROM alpine as builder

RUN apk add --update nodejs npm

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

FROM alpine

RUN apk add --update nodejs

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/build .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "index.js"]