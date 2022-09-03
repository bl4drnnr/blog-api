FROM node:18.3.0 as development

WORKDIR /usr/src/app

RUN npm i -g nest

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

