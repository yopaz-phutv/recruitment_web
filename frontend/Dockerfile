# 1. Build stage
FROM node:18-alpine AS build

WORKDIR /frontend

# Copy package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build React app (tạo thư mục build)
RUN npm run build

# 2. Production stage
FROM nginx:alpine

# Copy build từ stage trước sang thư mục serve của nginx
COPY --from=build /frontend/build /usr/share/nginx/html

# Copy config nginx nếu bạn có file custom (bỏ comment nếu cần)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
# EXPOSE 80

# Chạy nginx khi container start
CMD ["nginx", "-g", "daemon off;"]
