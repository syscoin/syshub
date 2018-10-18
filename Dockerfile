FROM node:8.12-alpine
LABEL maintainer="cortesa@gmail.com" version="1.0.0"

# Install app dependencies
COPY package*.json ./
RUN npm install