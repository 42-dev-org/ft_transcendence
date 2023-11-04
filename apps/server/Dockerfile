FROM node

WORKDIR /app

COPY ./package.json /app

RUN npm i

RUN npm i -g @nestjs/cli

RUN npm i -g pm2

COPY . /app

# RUN npx prisma migrate dev

CMD [ "bash", "-c", "npx prisma migrate dev --name init && pm2 start --attach npm --name api -- run start:dev" ]  #   pm2 start /app/dist/main.js --name api --attach