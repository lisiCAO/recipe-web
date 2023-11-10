# Use the official Ubuntu base image
FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    software-properties-common \
    curl \
    zip \
    unzip \
    git

# Install PHP and extensions
RUN add-apt-repository ppa:ondrej/php && apt-get update && apt-get install -y \
    php8.2 \
    php8.2-fpm \
    php8.2-mysql \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-gd \
    php8.2-curl\
    tzdata \
    && ln -fs /usr/share/zoneinfo/America/Montreal /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata

# Get Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory for Laravel
WORKDIR /var/www/html

# Copy the Laravel application into the container
COPY ./backend .

# Install Composer dependencies
RUN composer install

# Change ownership of our applications
RUN chown -R www-data:www-data /var/www/html

# Expose port 9000
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
