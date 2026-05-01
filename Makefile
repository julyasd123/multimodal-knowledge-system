.PHONY: help install dev-setup dev-up dev-down build test lint clean docker-build docker-up docker-down

# 帮助信息
help:
	@echo "多模态知识神经网络知识库系统 - Makefile"
	@echo ""
	@echo "可用命令:"
	@echo "  make install        - 安装依赖"
	@echo "  make dev-setup      - 开发环境设置"
	@echo "  make dev-up         - 启动开发环境"
	@echo "  make dev-down       - 停止开发环境"
	@echo "  make build          - 构建项目"
	@echo "  make test           - 运行测试"
	@echo "  make lint           - 代码检查"
	@echo "  make clean          - 清理临时文件"
	@echo "  make docker-build   - 构建Docker镜像"
	@echo "  make docker-up      - 启动Docker服务"
	@echo "  make docker-down    - 停止Docker服务"

# 安装依赖
install:
	@echo "安装后端依赖..."
	cd backend && pip install -r requirements.txt
	@echo "安装前端依赖..."
	cd frontend && npm install

# 开发环境设置
dev-setup: install
	@echo "初始化开发环境..."
	cp .env.example .env
	cp backend/.env.example backend/.env
	cp frontend/.env.example frontend/.env.local
	@echo "创建数据目录..."
	mkdir -p data logs

# 启动开发环境（仅数据库）
dev-up:
	@echo "启动开发环境..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "等待服务就绪..."
	sleep 10
	@echo "开发环境已启动!"
	@echo "后端API: http://localhost:8000"
	@echo "API文档: http://localhost:8000/docs"
	@echo "前端界面: http://localhost:3000"

# 停止开发环境
dev-down:
	@echo "停止开发环境..."
	docker-compose -f docker-compose.dev.yml down

# 构建项目
build:
	@echo "构建前端..."
	cd frontend && npm run build
	@echo "构建完成!"

# 运行测试
test:
	@echo "运行后端测试..."
	cd backend && pytest tests/ -v --cov=core
	@echo "运行前端测试..."
	cd frontend && npm test

# 代码检查
lint:
	@echo "后端代码检查..."
	cd backend && flake8 core/ api/ && black --check core/ api/
	@echo "前端代码检查..."
	cd frontend && npm run lint

# 代码格式化
format:
	@echo "格式化后端代码..."
	cd backend && black core/ api/ && isort core/ api/
	@echo "格式化前端代码..."
	cd frontend && npm run format

# 清理临时文件
clean:
	@echo "清理Python缓存..."
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	@echo "清理前端缓存..."
	cd frontend && rm -rf node_modules/.cache
	@echo "清理构建产物..."
	rm -rf backend/build backend/dist
	cd frontend && rm -rf build
	@echo "清理完成!"

# Docker构建
docker-build:
	@echo "构建后端镜像..."
	docker build -t multimodal-knowledge-backend:latest ./backend
	@echo "构建前端镜像..."
	docker build -t multimodal-knowledge-frontend:latest ./frontend

# Docker启动
docker-up:
	@echo "启动Docker服务..."
	docker-compose up -d
	@echo "等待服务就绪..."
	sleep 20
	@echo "Docker服务已启动!"
	@echo "后端API: http://localhost:8000"
	@echo "前端界面: http://localhost:3000"
	@echo "Neo4j浏览器: http://localhost:7474"
	@echo "API文档: http://localhost:8000/docs"

# Docker停止
docker-down:
	@echo "停止Docker服务..."
	docker-compose down

# Docker清理
docker-clean: docker-down
	@echo "清理Docker资源..."
	docker system prune -f
	@echo "清理完成!"

# 重启服务
restart: docker-down docker-up

# 查看日志
logs:
	docker-compose logs -f

# 查看服务状态
status:
	docker-compose ps

# 进入后端容器
backend-shell:
	docker-compose exec backend bash

# 进入前端容器
frontend-shell:
	docker-compose exec frontend sh

# 进入数据库
db-shell:
	docker-compose exec postgres psql -U knowledge_user -d knowledge_db

# 初始化数据库
db-init:
	@echo "初始化数据库..."
	python scripts/init_postgres.py
	python scripts/init_neo4j.py
	python scripts/init_milvus.py
	@echo "数据库初始化完成!"

# 生成API文档
docs:
	@echo "生成API文档..."
	cd backend && python -c "from api.main import app; import json; print(json.dumps(app.openapi(), indent=2))" > ../docs/openapi.json
	@echo "API文档已生成!"

# 部署到生产环境
deploy-prod:
	@echo "部署到生产环境..."
	git pull origin main
	docker-compose -f docker-compose.prod.yml build
	docker-compose -f docker-compose.prod.yml up -d
	@echo "部署完成!"

# 显示版本
version:
	@echo "项目版本: 1.0.0"
	@git rev-parse --short HEAD 2>/dev/null || echo "N/A"