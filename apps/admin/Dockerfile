FROM node:18 as build
LABEL maintainer "Rome Jiang <romejiang@gmail.com>"
WORKDIR /build

RUN npm install --global "pnpm"
COPY . .

ENV DEFINE_DOCKER_URL=http://localhost:3000
RUN pnpm install
RUN pnpm build


FROM nginx:alpine as nginx
COPY --from=build /build/dist /usr/share/nginx/html
COPY --from=build /build/docker/default.conf /etc/nginx/conf.d/default.conf