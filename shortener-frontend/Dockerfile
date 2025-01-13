FROM node:20

WORKDIR /app/shortener
COPY ["package*.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]