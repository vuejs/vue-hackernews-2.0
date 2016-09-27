FROM node:latest
RUN mkdir /code
ADD package.json /code/package.json
WORKDIR /code
RUN npm install
