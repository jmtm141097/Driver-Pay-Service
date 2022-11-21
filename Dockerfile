FROM node:16.17.0

WORKDIR /usr/src/back-driver-pay-service

COPY package*.json ./

ENV PORT=3001

ENV DATABASE_URL='mongodb://mongo-driver-pay:27017/testwompi'

ENV KEY_PRV='prv_test_GSkBR6MRIQUXCoLrtdo9x3niziIbbC8T'

ENV KEY_PUB='pub_test_WYECnUDCZACGzGijzjtP42j3SIx8BR80'

RUN npm install

COPY . .

EXPOSE 3001