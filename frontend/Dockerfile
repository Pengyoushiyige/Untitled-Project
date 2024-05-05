# frontend/Dockerfile
#官方Node.js 镜像
FROM node:18 AS build

# 设置工作目录
WORKDIR /app/ChatTao/Untitled-Project/frontend

# 安装项目依赖
COPY package*.json ./
RUN npm install

# 将项目代码复制到容器中
COPY . .

# 构建生产环境的前端应用
RUN npm run build

# 使用官方的 Nginx 镜像
FROM nginx:stable-alpine
COPY --from=build /app/ChatTao/Untitled-Project/frontend/dist /usr/share/nginx/html

# 暴露前端端口
EXPOSE 80
