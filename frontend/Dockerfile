# frontend/Dockerfile
# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8001

CMD ["npm", "run", "prod"]