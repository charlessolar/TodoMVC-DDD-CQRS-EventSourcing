FROM mhart/alpine-node as build

RUN apk add --update --no-cache git
RUN npm i -g yarn webpack-cli webpack cross-env

WORKDIR /src

COPY src/Web/package.json .
COPY src/Web/yarn.lock .

RUN yarn

COPY .git
COPY src/Web .
WORKDIR /src

ARG API_SERVER
ENV API_SERVER=${API_SERVER}

RUN yarn build

FROM nginx:stable as runtime

COPY src/Web/nginx-site.conf /etc/nginx/conf.d/default.conf
RUN mkdir /app
WORKDIR /app
COPY --from=build /src/dist .
