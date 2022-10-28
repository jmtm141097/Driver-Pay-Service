FROM node:16.17.0

WORKDIR /usr/src/back-driver-pay-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", 'start']