#pull official docker image for ReactJS
FROM node:12.17.0-alpine3.11

#set working directory
WORKDIR /codesatori_frontend/webapp

#install dependancies
# COPY package*.json ./
# RUN npm install -g serve
# RUN npm install express-favicon typescript --s

#copy and run app
COPY . ./
#EXPOSE 5000
RUN npm run heroku-postbuild
CMD npm run start
