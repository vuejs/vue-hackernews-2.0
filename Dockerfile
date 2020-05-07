FROM node:13.10.1-buster

COPY . /app/src
WORKDIR /app/src
RUN npm i && \
    npm run build 
CMD ["npm", "run", "start"]