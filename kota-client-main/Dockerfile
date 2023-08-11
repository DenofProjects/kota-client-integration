# Step 1: Build the React app
FROM node:alpine

WORKDIR /app

COPY ./package.json /app/

RUN npm install

COPY . /app

# EXPOSE 8888

CMD [ "npm", "start" ]