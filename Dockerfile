FROM node:16.18-alpine3.16 as builder

WORKDIR /app

COPY package.json .
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:1.22.0-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .

EXPOSE 3000

CMD ["node", "index.js"]