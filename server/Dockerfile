FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["bash", "-c", "node sql/initDb.js && npm run dev"]