FROM node:18.19.0-alpine
LABEL maintainer "Rome Jiang <romejiang@gmail.com>"
WORKDIR /app

RUN npm install --global "pnpm"

COPY . .
RUN pnpm install

ENV PLATFORM=PROD
EXPOSE 3000
CMD node /app/app.js
