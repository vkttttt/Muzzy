FROM node:13-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm install pm2 -g
ENV NODE_ENV=dev
CMD [ "pm2-runtime", "start" , "/app/bin/www"]
