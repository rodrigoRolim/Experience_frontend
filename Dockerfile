#FROM node:lts-alpine
#LABEL maintainer '<rodrigo at rodrigorolimveras92@gmail.com>'
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#EXPOSE 8080
# CMD [ "npm", "start" ]
# build stage
#FROM node:lts-alpine as build-stage
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build

# production stage
#FROM nginx:stable-alpine as production-stage
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

#base image
FROM node:12.2.0-alpine
# set workink directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH

ENV PATH /app/node_modules/.bin:$PATH

# install and cache app depedencies

COPY package.json /app/package.json
RUN npm install
RUN npm install @vue/cli -g

#start app
CMD ["npm", "run", "serve"]