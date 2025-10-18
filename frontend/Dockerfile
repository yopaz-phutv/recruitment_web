# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files và cài đặt dependencies (cache tối ưu)
COPY package*.json ./
RUN npm ci

# Copy source và build app
COPY . .
RUN npm run build

# 3) Serve bằng nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8003
CMD ["nginx", "-g", "daemon off;"]
