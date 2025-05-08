FROM node:21 as build

WORKDIR /certinet-demo

COPY package*.json ./
RUN rm -rf node_modules
RUN rm -rf build
COPY . .
RUN npm install
RUN npm run build

FROM node:21 as run

WORKDIR /certinet-demo
COPY --from=build /certinet-demo/package.json ./package.json
COPY --from=build /certinet-demo/build ./build
RUN npm install --production

EXPOSE 3000

CMD ["node", "build"]