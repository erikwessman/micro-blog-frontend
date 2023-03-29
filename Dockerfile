FROM node:18-alpine

WORKDIR /node_app
COPY ./ /node_app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]