FROM node


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000


CMD ["npm", "start"]


//docker-compose build
docker-compose up
docker-compose up -d
docker ps
