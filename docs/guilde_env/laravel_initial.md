请确保您的开发环境已经安装了 PHP 和 Composer。

1. **安装 Laravel**：使用 Composer 创建一个新的 Laravel 项目。打开您的命令行工具并执行以下命令：

   ```bash
   composer create-project --prefer-dist laravel/laravel your-project-name
   ```

   这里的 `your-project-name` 应该被替换成您想要的项目名称。

2. **配置环境变量**：进入项目文件夹，您会发现一个 `.env.example` 文件。复制这个文件并重命名为 `.env`。这个文件包含了环境特定的变量，如数据库连接信息。

   ```bash
   cp .env.example .env
   ```

3. **生成应用密钥**：运行以下 Artisan 命令来生成应用密钥，它将被自动添加到您的 `.env` 文件中。

   ```bash
   php artisan key:generate
   ```

4. **配置数据库**：在 `.env` 文件中，设置您的数据库连接信息。您需要提供数据库的名称、用户名和密码。

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. **运行迁移**：如果您的项目使用数据库，可以通过以下命令运行迁移，来创建数据库表。

   ```bash
   php artisan migrate
   ```

6. **启动服务器**：您可以使用 Artisan 命令启动一个本地开发服务器。

   ```bash
   php artisan serve
   ```

这些是初始化 Laravel 项目的基本步骤。在此之后，可以开始开发您的应用，添加路由、控制器、视图等。不要忘记定期查看 Laravel 的[官方文档](https://laravel.com/docs/10.x)，以获取最新信息和最佳实践。