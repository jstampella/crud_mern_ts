FROM node:16.14-alpine

RUN mkdir -p /home/node/app/node_modules
RUN yarn global add rimraf
RUN yarn global add typescript

WORKDIR /home/node/app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build


WORKDIR /home/node/app/client

RUN yarn install

RUN yarn run build

WORKDIR /home/node/app

RUN mkdir -p ./build/public

RUN cp -r /home/node/app/client/dist/* ./build/public

EXPOSE 7000

CMD [ "node","./build/index.js" ]
