FROM nginx:1.17
COPY config.js /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
COPY build/ /usr/share/nginx/html


#FROM node:12.12
#
#RUN mkdir /app
#WORKDIR /app
#
#COPY package.json .
#RUN npm install
#
#COPY . .
#
#CMD ["npm", "start"]
