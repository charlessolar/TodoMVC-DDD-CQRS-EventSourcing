FROM nginx:stable

MAINTAINER charlessolar@gmail.com

WORKDIR /var/www/frontend

RUN apt-get update && apt-get install -y apt-transport-https curl software-properties-common gnupg
#RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
#RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
#RUN apt-get update && apt-get install -y yarn

RUN DEBIAN_FRONTEND=noninteractive \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -qq -y nodejs yarn

# Install node_modules with yarn
ADD src/Web/package.json src/Web/yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p /var/www/frontend && cd /var/www/frontend && ln -s /tmp/node_modules

# copy app
COPY src/Web ./

# build app
RUN yarn start webpack.build.prod

# point nginx to dist folder
RUN rm -rf /usr/share/nginx/html && ln -s /var/www/frontend/dist /usr/share/nginx/html

EXPOSE 80
