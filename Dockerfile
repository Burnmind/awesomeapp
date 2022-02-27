FROM php:8.0-apache

RUN docker-php-ext-install mysqli
RUN docker-php-ext-install pdo_mysql

# Включаем RewriteEngine в апаче
RUN a2enmod rewrite

# Указываем рабочую папку
WORKDIR /var/www/html

EXPOSE 80