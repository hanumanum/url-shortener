FROM node:20

WORKDIR /app/shortener
COPY ["package*.json", "./"]
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3088
CMD ["npm", "start"]