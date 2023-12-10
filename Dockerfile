FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/periscopeBackend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent && npm install typescript -g && mv node_modules ../
COPY . .
EXPOSE 4111
RUN tsc
RUN chown -R node /usr/periscopeBackend
USER node
CMD ["npm", "start"]