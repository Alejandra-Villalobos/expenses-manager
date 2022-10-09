## REPO
# docker tag expenses-front:0.1.0-nginx-alpine alejandravillalobos/expenses-front:0.1.0-nginx-alpine
# docker push alejandravillalobos/expenses-front:0.1.0-nginx-alpine

# docker tag expenses-front:0.1.3-nginx-alpine-gcp alejandravillalobos/expenses-front:0.1.3-nginx-alpine-gcp
# docker push alejandravillalobos/expenses-front:0.1.3-nginx-alpine-gcp

## Build
# docker build --build-arg REACT_APP_BACKEND_BASE_URL=http://34.170.32.133:8500 -t expenses-front:0.1.3-nginx-alpine-gcp .

## RUN
# docker run -p 3000:80 -d expenses-front:0.1.1-nginx-alpine

FROM node:18.9.0 as compilacion

COPY . /opt/app

WORKDIR /opt/app

ARG REACT_APP_BACKEND_BASE_URL=http://localhost:8500

RUN npm install

RUN npm run build

FROM nginx:1.22.0-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compilacion /opt/app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]