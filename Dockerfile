FROM node:lts-alpine

COPY . /app

WORKDIR /app

RUN yarn

EXPOSE 8080

CMD yarn start
