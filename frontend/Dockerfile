FROM nginx:1.17
COPY build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

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
