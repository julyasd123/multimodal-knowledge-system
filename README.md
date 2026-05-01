# 多模态知识神经网络知识库系统

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/python-3.9+-blue.svg" alt="Python">
  <img src="https://img.shields.io/badge/node-18+-green.svg" alt="Node">
</p>

<p align="center">
  一个基于大模型的智能知识管理与推理平台，自动处理多模态文档，构建动态演化的知识网络
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> •
  <a href="#系统架构">系统架构</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#安装部署">安装部署</a> •
  <a href="#使用指南">使用指南</a> •
  <a href="#API文档">API文档</a> •
  <a href="#贡献指南">贡献指南</a> •
  <a href="#许可证">许可证</a>
</p>

---

## 📊 项目数据

- **GitHub Stars**: [![Stars](https://img.shields.io/github/stars/yourusername/multimodal-knowledge-system?style=social)](https://github.com/yourusername/multimodal-knowledge-system)
- **GitHub Forks**: [![Forks](https://img.shields.io/github/forks/yourusername/multimodal-knowledge-system?style=social)](https://github.com/yourusername/multimodal-knowledge-system)
- **Issues**: [![Issues](https://img.shields.io/github/issues/yourusername/multimodal-knowledge-system)](https://github.com/yourusername/multimodal-knowledge-system/issues)
- **Pull Requests**: [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/multimodal-knowledge-system/pulls)

---

## 🎯 功能特性

### 核心能力

- **📄 多模态输入处理**
  - 支持图片(JPG/PNG)、PDF、Word、TXT、长文本等多种格式
  - 高精度OCR识别（PaddleOCR）
  - 智能文档结构解析

- **🧠 智能知识提取**
  - 基于小米MIMO的语义精读
  - 原子化知识点拆解
  - 自动去重降噪
  - 标准化知识单元输出

- **🔗 知识网络构建**
  - 自动识别7种关系类型（包含、从属、因果、并列、关联、先后、依赖）
  - 动态知识网络拓扑生成
  - 双向关联链路建立

- **🔄 增量学习与融合**
  - 新增文档自动融合进已有知识网络
  - 智能节点匹配与合并
  - 网络结构动态补全

- **🔍 混合检索**
  - 向量检索（语义相似度）
  - 图谱检索（关联查询）
  - 混合检索（最佳效果）

- **📊 知识可视化**
  - 交互式知识网络图谱
  - 节点详情查看
  - 关系链路追踪

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                      用户界面层                              │
│  (Web前端 / REST API / 可视化控制台)                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      应用服务层                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  文档管理 │  │ 知识检索 │  │ 网络可视化│  │ 推理引擎 │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      核心处理层                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  多模态输入处理  │  │   知识提取引擎   │                │
│  └──────────────────┘  └──────────────────┘                │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  关系推理引擎    │  │  知识融合引擎    │                │
│  └──────────────────┘  └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      模型服务层                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  MIMO    │  │  OCR     │  │  嵌入模型 │  │  推理模型│ │
│  │  大模型  │  │  引擎    │  │  (Embed) │  │  (LLM)  │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      数据存储层                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ 图数据库 │  │ 向量数据库│  │ 文档存储 │  │ 关系数据库│ │
│  │ (Neo4j)  │  │(Milvus)  │  │ (MinIO)  │  │(PostgreSQL)│ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 技术栈

| 组件 | 技术 | 版本要求 |
|------|------|---------|
| **前端** | React 18 + Ant Design + Cytoscape.js | Node 18+ |
| **后端** | Python 3.9+ + FastAPI | Python 3.9+ |
| **大模型** | 小米MIMO | API访问权限 |
| **OCR** | PaddleOCR | 2.7+ |
| **图数据库** | Neo4j | 5.0+ |
| **向量数据库** | Milvus | 2.3+ |
| **关系数据库** | PostgreSQL | 14+ |
| **缓存** | Redis | 7.0+ |
| **消息队列** | RabbitMQ | 3.11+ |

---

## 🚀 快速开始

### 方式一：Docker一键部署（推荐）

```bash
# 1. 克隆仓库
git clone https://github.com/yourusername/multimodal-knowledge-system.git
cd multimodal-knowledge-system

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入必要的配置（如MIMO API密钥）

# 3. 启动服务
docker-compose up -d

# 4. 访问系统
# 前端: http://localhost:3000
# 后端API: http://localhost:8000
# API文档: http://localhost:8000/docs
```

### 方式二：本地开发环境

#### 后端部署

```bash
# 1. 进入后端目录
cd backend

# 2. 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. 安装依赖
pip install -r requirements.txt

# 4. 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 5. 启动数据库
docker-compose -f docker-compose.dev.yml up -d neo4j milvus postgres redis

# 6. 运行后端服务
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```

#### 前端部署

```bash
# 1. 进入前端目录
cd frontend

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 文件

# 4. 启动开发服务器
npm run dev

# 5. 访问前端界面
# http://localhost:3000
```

---

## 📦 安装部署

### 系统要求

- **操作系统**: Linux / macOS / Windows (WSL2)
- **CPU**: 4核及以上（推荐8核）
- **内存**: 16GB及以上（推荐32GB）
- **硬盘**: 100GB及以上可用空间
- **网络**: 需要访问小米MIMO API

### 依赖安装

#### Ubuntu/Debian

```bash
# 安装系统依赖
sudo apt-get update
sudo apt-get install -y \
    python3.9 \
    python3-pip \
    nodejs \
    npm \
    docker.io \
    docker-compose \
    postgresql \
    redis-server

# 安装Python依赖
pip3 install -r requirements.txt

# 安装Node.js依赖
cd frontend && npm install
```

#### macOS

```bash
# 使用Homebrew安装依赖
brew install python@3.9 node docker docker-compose postgresql redis

# 安装Python依赖
pip3 install -r requirements.txt

# 安装Node.js依赖
cd frontend && npm install
```

#### Windows

```powershell
# 使用Chocolatey安装依赖
choco install python nodejs docker-desktop postgresql redis

# 安装Python依赖
pip install -r requirements.txt

# 安装Node.js依赖
cd frontend && npm install
```

### 数据库初始化

```bash
# 1. 启动数据库
docker-compose up -d neo4j milvus postgres redis

# 2. 等待数据库就绪（约30秒）

# 3. 初始化图数据库
python scripts/init_neo4j.py

# 4. 初始化向量数据库
python scripts/init_milvus.py

# 5. 初始化关系数据库
python scripts/init_postgres.py
```

---

## 📖 使用指南

### 1. 文档上传

#### 通过Web界面上传

1. 访问 `http://localhost:3000`
2. 点击 "文档上传" 菜单
3. 拖拽文件到上传区域，或点击选择文件
4. 支持批量上传
5. 等待系统处理完成

#### 通过API上传

```bash
curl -X POST "http://localhost:8000/api/v1/documents/upload" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/your/document.pdf" \
  -F "metadata={\"title\": \"文档标题\", \"author\": \"作者\"}"
```

### 2. 知识检索

#### 向量检索

```python
import requests

response = requests.post(
    "http://localhost:8000/api/v1/knowledge/retrieve",
    json={
        "query": "机器学习的主要算法",
        "mode": "vector",
        "top_k": 10
    }
)

print(response.json())
```

#### 图谱检索

```python
response = requests.post(
    "http://localhost:8000/api/v1/knowledge/retrieve",
    json={
        "query": "深度学习",
        "mode": "graph",
        "depth": 2
    }
)

print(response.json())
```

#### 混合检索

```python
response = requests.post(
    "http://localhost:8000/api/v1/knowledge/retrieve",
    json={
        "query": "神经网络的应用场景",
        "mode": "hybrid",
        "top_k": 10,
        "include_relations": True
    }
)

print(response.json())
```

### 3. 知识网络可视化

#### 获取可视化数据

```python
response = requests.get(
    "http://localhost:8000/api/v1/knowledge/visualize",
    params={
        "node_id": "KN_a1b2c3d4",
        "depth": 2,
        "format": "cytoscape"
    }
)

print(response.json())
```

#### 在前端展示

```javascript
import Cytoscape from 'cytoscape';

// 获取可视化数据
const response = await fetch('/api/v1/knowledge/visualize?node_id=KN_a1b2c3d4&depth=2');
const data = await response.json();

// 渲染知识网络
const cy = Cytoscape({
  container: document.getElementById('knowledge-graph'),
  elements: data.data,
  style: [/* 样式定义 */],
  layout: { name: 'cose' }
});
```

### 4. 知识推理

```python
response = requests.post(
    "http://localhost:8000/api/v1/knowledge/reason",
    json={
        "start_node_id": "KN_a1b2c3d4",
        "end_node_id": "KN_e5f6g7h8",
        "reasoning_type": "shortest_path"
    }
)

print(response.json())
```

---

## 📚 API文档

### 基础信息

- **基础URL**: `http://localhost:8000/api/v1`
- **认证方式**: Bearer Token (可选)
- **响应格式**: JSON

### 接口列表

#### 文档管理

| 接口 | 方法 | 描述 |
|------|------|------|
| `/documents/upload` | POST | 上传文档 |
| `/documents/{doc_id}` | GET | 获取文档详情 |
| `/documents` | GET | 获取文档列表 |
| `/documents/{doc_id}` | DELETE | 删除文档 |

#### 知识管理

| 接口 | 方法 | 描述 |
|------|------|------|
| `/knowledge/nodes` | GET | 获取知识节点列表 |
| `/knowledge/nodes/{node_id}` | GET | 获取知识节点详情 |
| `/knowledge/retrieve` | POST | 检索知识 |
| `/knowledge/visualize` | GET | 获取可视化数据 |

#### 系统管理

| 接口 | 方法 | 描述 |
|------|------|------|
| `/system/status` | GET | 获取系统状态 |
| `/system/config` | GET | 获取系统配置 |
| `/system/metrics` | GET | 获取系统指标 |

### 详细API文档

访问 `http://localhost:8000/docs` 查看完整的Swagger API文档。

---

## 🧪 测试

### 运行单元测试

```bash
# 后端测试
cd backend
pytest tests/ -v

# 前端测试
cd frontend
npm test
```

### 运行集成测试

```bash
# 启动测试环境
docker-compose -f docker-compose.test.yml up -d

# 运行集成测试
pytest tests/integration/ -v

# 停止测试环境
docker-compose -f docker-compose.test.yml down
```

### 测试覆盖率

```bash
# 生成覆盖率报告
pytest tests/ --cov=core --cov-report=html

# 查看报告
open htmlcov/index.html
```

---

## 📊 性能基准

### 处理能力

| 指标 | 数值 | 说明 |
|------|------|------|
| **文档解析速度** | 10页/秒 | PDF文档 |
| **知识提取速度** | 100个知识点/分钟 | 基于MIMO |
| **关系推理速度** | 1000对/分钟 | 批量处理 |
| **检索响应时间** | <100ms | 向量检索 |
| **图谱查询时间** | <500ms | 3跳查询 |

### 系统容量

| 指标 | 数值 | 说明 |
|------|------|------|
| **最大知识节点数** | 100万+ | Neo4j社区版限制 |
| **最大关系数** | 1000万+ | 取决于硬件 |
| **向量检索维度** | 768维 | 默认配置 |
| **并发用户数** | 100+ | 取决于服务器配置 |

---

## 🤝 贡献指南

我们欢迎任何形式的贡献，包括但不限于：

- 🐛 提交Bug报告
- 💡 提出新功能建议
- 📖 改进文档
- 💻 提交代码修复
- ✅ 编写测试用例

### 贡献流程

1. **Fork仓库**
   ```bash
   # 1. 在GitHub上Fork本仓库
   # 2. 克隆你的Fork
   git clone https://github.com/yourusername/multimodal-knowledge-system.git
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add some feature"
   ```

4. **推送到Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **创建Pull Request**
   - 访问你的Fork页面
   - 点击 "New Pull Request"
   - 填写PR描述
   - 等待审核

### 代码规范

- **Python**: 遵循 PEP 8 规范
- **JavaScript**: 遵循 ESLint 配置
- **提交信息**: 遵循 [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📝 文档

- [架构设计文档](docs/architecture.md)
- [API接口文档](docs/api.md)
- [部署指南](docs/deployment.md)
- [开发者指南](docs/developer-guide.md)
- [FAQ](docs/faq.md)

---

## 🔒 安全

如果你发现安全漏洞，请通过以下方式联系我们：

- **邮箱**: security@example.com
- **GPG密钥**: [下载](https://example.com/security.gpg)

请在公开场合讨论安全问题。

---

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- [小米MIMO](https://www.xiaomi.com/) - 提供大模型能力
- [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) - 提供OCR能力
- [Neo4j](https://neo4j.com/) - 图数据库
- [Milvus](https://milvus.io/) - 向量数据库
- [FastAPI](https://fastapi.tiangolo.com/) - Web框架
- [React](https://react.dev/) - 前端框架

---

## 📧 联系方式

- **项目主页**: [https://github.com/yourusername/multimodal-knowledge-system](https://github.com/julyasd123/multimodal-knowledge-system)
- **问题反馈**: [https://github.com/yourusername/multimodal-knowledge-system/issues](https://github.com/julyasd123/multimodal-knowledge-system/issues)
- **讨论区**: [https://github.com/yourusername/multimodal-knowledge-system/discussions](https://github.com/julyasd123/multimodal-knowledge-system/discussions)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=julyasd123/multimodal-knowledge-system&type=Date)](https://star-history.com/#julyasd123/multimodal-knowledge-system&Date)

---

<p align="center">
  ⭐ 如果这个项目对你有帮助，请给它一个Star！ ⭐
</p>

<p align="center">
  Made with ❤️ by Multimodal Knowledge Team
</p>
