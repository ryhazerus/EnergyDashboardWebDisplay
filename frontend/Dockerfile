# frontend/Dockerfile
# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
