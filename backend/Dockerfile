FROM php:8.2-fpm-alpine

# Cài extension cần thiết
RUN docker-php-ext-install pdo pdo_mysql bcmath

# Cài composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Copy source code
WORKDIR /var/www
COPY . .

# Cài dependency
RUN composer install --no-dev --optimize-autoloader && \
    # php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
