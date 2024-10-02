FROM node:18-alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN echo 'Starting the installation of the dependencies'
RUN npm install --quiet

CMD ["npm", "test"]