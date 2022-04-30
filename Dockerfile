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
#docker run -it -e "PORT=8080" --env-file=.env -p 8125:8080 --name static_server git4vas/static_srv