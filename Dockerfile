FROM node:10-alpine
RUN mkdir -p /home/node/app/static_srv && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm ci
COPY --chown=node:node . .
#EXPOSE 8080
EXPOSE $PORT
CMD ["npm", "start"]

#docker build -t git4vas/static_srv .
#docker run -ite "PORT=8080" -p 8125:8080 -v ./public:/public --name static_srv git4vas/static_srv