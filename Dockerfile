#pull official docker image for ReactJS
FROM node:12.17.0-alpine3.11

#set working directory
WORKDIR /codesatori_frontend/webapp

#install dependancies
COPY package*.json ./
RUN nom install -g serve
RUN npm install express-favicon typescript --s

#copy and run app
COPY . ./
RUN npm run build
#EXPOSE 5000
CMD serve -s build -l $PORT