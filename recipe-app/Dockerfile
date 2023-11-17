# 使用官方 Node.js 镜像作为基础镜像
FROM node:20.9.0

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制整个前端项目到容器内
COPY . .

# 暴露端口（如果需要）
EXPOSE 3000

# 运行前端应用
CMD [ "npm", "start" ]
