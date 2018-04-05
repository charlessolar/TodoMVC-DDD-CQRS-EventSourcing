FROM alpine as build

MAINTAINER charlessolar@gmail.com

RUN apk add --update --no-cache nodejs git
RUN npm i -g yarn nps

WORKDIR /src

COPY src/Web/package.json .
COPY src/Web/yarn.lock .

RUN yarn

COPY . .
WORKDIR /src/src/Web
RUN yarn start webpack.build.prod

FROM nginx:stable as runtime
WORKDIR /usr/share/nginx/html
COPY --from=build /src/src/Web/dist .
