FROM node:12.12

RUN mkdir -p /usr/src/app/backend/
RUN mkdir -p /usr/data/db
WORKDIR /usr/src/app/backend
COPY package.json /usr/src/app/backend

RUN npm install

COPY . /usr/src/app/backend
RUN npm install bcrypt@latest -D

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start" ]
