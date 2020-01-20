FROM ubuntu as build

RUN apt-get install nodejs git npm
RUN npm i -g yarn webpack-cli webpack cross-env

WORKDIR /src

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn

COPY . .
WORKDIR /src

ARG API_SERVER
ENV API_SERVER=${API_SERVER}

RUN yarn build

FROM nginx:stable as runtime

COPY nginx-site.conf /etc/nginx/conf.d/default.conf
RUN mkdir /app
WORKDIR /app
COPY --from=build /src/dist .
