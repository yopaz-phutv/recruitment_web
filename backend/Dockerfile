FROM php:8.2-fpm-alpine AS backend-base

# Cài các gói hệ thống và extension PHP cần thiết
RUN apk add --no-cache postgresql-dev git bash && \
    docker-php-ext-install pdo pdo_mysql pdo_pgsql bcmath

# Composer để cài dependencies
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy file composer và các helper cần cho composer scripts
COPY composer.json composer.lock ./
COPY app/Helpers ./app/Helpers
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts

# Copy toàn bộ mã nguồn (đã lọc qua .dockerignore)
COPY . .

# Làm mới cache package để loại bỏ provider dev còn sót lại
RUN php artisan package:discover --ansi

# Chuẩn bị symbolic link storage và phân quyền cần thiết
RUN (php artisan storage:link || true) && \
    chown -R www-data:www-data storage bootstrap/cache

FROM backend-base AS backend-app
EXPOSE 9000
CMD ["php-fpm"]

FROM nginx:alpine AS backend-web
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=backend-base /var/www /var/www
EXPOSE 80

FROM backend-base AS backend-render
RUN apk add --no-cache nginx supervisor gettext && \
    mkdir -p /run/nginx
COPY nginx/render.conf.template /etc/nginx/templates/default.conf.tpl
COPY deploy/supervisord.conf /etc/supervisord.conf
COPY deploy/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8080
CMD ["/entrypoint.sh"]
