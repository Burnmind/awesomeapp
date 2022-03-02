FROM php:8.0-apache

RUN apt-get update && \
        apt-get install -y libpq-dev && \
        docker-php-ext-install pdo pdo_pgsql pgsql

# Включаем RewriteEngine в апаче
RUN a2enmod rewrite

# Указываем рабочую папку
WORKDIR /var/www/html

EXPOSE 80