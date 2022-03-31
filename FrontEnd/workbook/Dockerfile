FROM node:16.13.1

WORKDIR /usr/src/app

RUN npm i yarn
RUN yarn add serve --dev
RUN mkdir build
COPY ./build ./build/
COPY ./package.json ./

ENTRYPOINT [ "npx","serve","-s","build"]