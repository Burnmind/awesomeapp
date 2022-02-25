FROM php:8.0-apache
# Включаем RewriteEngine в апаче
RUN a2enmod rewrite

# Указываем рабочую папку
WORKDIR /var/www/html
# Копируем все файлы проекта в контейнер
COPY ./ /var/www/html
EXPOSE 80