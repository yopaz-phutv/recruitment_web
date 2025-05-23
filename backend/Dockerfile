# backend/Dockerfile
FROM php:8.2-fpm

# Install các extension Laravel cần
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Cài Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working dir
WORKDIR /var/www

# Copy toàn bộ source
COPY . .

# Cài Laravel dependencies
RUN composer install

# Set quyền cho Laravel
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 storage bootstrap/cache
