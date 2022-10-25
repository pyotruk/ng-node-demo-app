FROM node:14 as node

COPY ./ui /usr/src/application

WORKDIR /usr/src/application

RUN npm install -g @angular/cli
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node /usr/src/application/dist/ng-node-demo-app-ui /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
