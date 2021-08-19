FROM node:14

COPY ./api /usr/src/application
COPY ./.env /usr/src/application/

WORKDIR /usr/src/application
RUN npm install

EXPOSE 3000

CMD npm start
