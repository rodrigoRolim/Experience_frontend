# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VUE_APP_API_CORTEZ=http://192.168.1.68
ENV VUE_APP_API_CEDRO=http://192.168.1.68
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
# CMD ["npm", "start"]
CMD ["nginx", "-g", "daemon off;"]