FROM node:18-alpine AS base
WORKDIR /usr/app
COPY package*.json ./
RUN npm install

FROM node:18-alpine AS build
WORKDIR /usr/app
COPY . .
COPY --from=base /usr/app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS main
WORKDIR /usr/app
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist
CMD ["npm", "run", "start"]
EXPOSE 3000