FROM node:14 as node

WORKDIR /usr/src/app

COPY /ui/package*.json ./
RUN npm install
RUN npm install -g @angular/cli

COPY /ui .

RUN npm run build

FROM nginx:alpine
COPY --from=node /usr/src/app/dist/globaldots-code-challenge-ui /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
