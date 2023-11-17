
FROM php:8.2.11

# 设置工作目录
WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    libxpm-dev \
    software-properties-common \
    curl \
    zip \
    unzip \
    git


# 安装必要的 PHP 扩展（根据你的项目需求，你可能需要其他扩展）
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp --with-xpm
RUN docker-php-ext-install pdo pdo_mysql gd fileinfo

# 安装 Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 复制 Laravel 项目代码到容器内
COPY . .

# 配置 MySQL 连接信息
ENV DB_HOST=mysql
ENV DB_DATABASE=fsd10_tango
ENV DB_USERNAME=fsduser
ENV DB_PASSWORD=myDBpw

# 更改 Laravel 应用的文件和目录所有权
RUN chown -R www-data:www-data /var/www/html

# 运行 Laravel 应用
CMD [ "php", "artisan", "serve", "--host=0.0.0.0" ]
