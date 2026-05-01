# 前端Dockerfile
FROM node:18-alpine as build

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY frontend/package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY frontend/ ./

# 构建应用
ENV REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
RUN npm run build

# 生产镜像
FROM nginx:alpine

# 复制构建产物
COPY --from=build /app/build /usr/share/nginx/html

# 复制Nginx配置
COPY deploy/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 3000

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]