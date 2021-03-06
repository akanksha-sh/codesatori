#pull official docker image for ReactJS
FROM node:12.17.0-alpine3.11 as BUILD

ENV REACT_APP_CODESATORI_PROD=true

#set working directory
WORKDIR /codesatori_frontend/webapp

#install dependancies
# COPY package*.json ./
# RUN npm install -g serve
# RUN npm install express-favicon typescript --s

#copy and run app
COPY . ./
#EXPOSE 5000
RUN npm run env
RUN npm run heroku-postbuild
FROM BUILD as RUN
ENV REACT_APP_CODESATORI_PROD=true
CMD npm run start
