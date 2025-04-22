
FROM node:16.13.1

EXPOSE 3000


WORKDIR /usr/src/app

COPY ./build ./build/
COPY ./package.json ./

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]