# Use the official Ubuntu base image
FROM ubuntu:latest

# Install system dependencies
RUN apt-get update && apt-get install -y \
    software-properties-common \
    curl \
    zip \
    unzip \
    git

# Install PHP and extensions
RUN add-apt-repository ppa:ondrej/php && apt-get update && apt-get install -y \
    php8.0 \
    php8.0-fpm \
    php8.0-mysql \
    php8.0-mbstring \
    php8.0-xml \
    php8.0-gd \
    php8.0-curl

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
