FROM node:14.15.3-alpine

WORKDIR /usr/src/app

# RUN apk add bash

RUN npm i -g react-scripts

COPY package.json .
RUN npm install

CMD ["npm", "run", "start"]