FROM node:10-alpine
RUN mkdir -p /home/node/app/static_srv && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm ci
COPY --chown=node:node . .
#EXPOSE 8080
EXPOSE $PORT
CMD ["node", "index.js"]

#docker build -t git4vas/static_srv .
#docker run -it -p 8125:8080 --name the_static_srv git4vas/static_srv -e "PORT=8080"