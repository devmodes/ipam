FROM node:23-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3002

RUN npx prisma generate

CMD [ "npm", "run", "migrate:dev" ]
