# 使用 node:18-alpine 作为基础镜像
FROM node:18-alpine AS base

# 安装必需的系统依赖
RUN apk add --no-cache libc6-compat

# 设置工作目录
WORKDIR /app/ChatTao/Untitled-Project/backend

# 复制 package.json 和 package-lock.json 文件
COPY package.json package-lock.json ./

# 设置 npm 镜像以加快依赖安装速度
RUN npm config set registry 'https://registry.npmmirror.com/'

# 安装项目依赖
RUN npm install

# 将项目代码复制到容器中
COPY . .

# 暴露容器的 3003 端口
EXPOSE 3003

# 设置容器启动后执行的命令
CMD ["node", "server.js"]
