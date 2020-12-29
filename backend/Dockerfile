FROM node:14.15.3-alpine

WORKDIR /usr/src/app

RUN apk add bash

COPY package.json .
RUN npm install
RUN npm install -g nodemon

CMD ["npm", "run", "start:dev"]