FROM node:latest

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]


#docker run --name react<container name> -p 2000:3000 react-app<image_name>