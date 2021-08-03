FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

ENV SHARED_DIR=/shared

EXPOSE 8080

CMD [ "npm" , "start" ]