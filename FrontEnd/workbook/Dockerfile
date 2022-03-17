FROM node:16.13.1

WORKDIR /usr/src/app

COPY . ./

RUN npm i yarn
RUN yarn

CMD [ "yarn","start"]

EXPOSE 3000