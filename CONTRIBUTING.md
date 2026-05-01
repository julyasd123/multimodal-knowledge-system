# 贡献指南

感谢你对多模态知识神经网络知识库系统的关注！我们欢迎任何形式的贡献。

## 🤝 如何贡献

### 报告Bug

如果你发现了Bug，请：

1. 检查 [Issues](https://github.com/yourusername/multimodal-knowledge-system/issues) 确保没有重复
2. 创建新的Issue，使用 "Bug Report" 模板
3. 提供详细的描述，包括：
   - 复现步骤
   - 预期行为
   - 实际行为
   - 截图（如果适用）
   - 环境信息（OS、Python版本、Node版本等）

### 提出新功能

如果你有新功能的想法，请：

1. 检查 [Issues](https://github.com/yourusername/multimodal-knowledge-system/issues) 确保没有重复
2. 创建新的Issue，使用 "Feature Request" 模板
3. 详细描述功能需求和使用场景

### 提交代码

#### 1. Fork仓库

点击 GitHub 页面右上角的 "Fork" 按钮，将仓库Fork到你的账户。

#### 2. 克隆仓库

```bash
git clone https://github.com/yourusername/multimodal-knowledge-system.git
cd multimodal-knowledge-system
```

#### 3. 创建分支

```bash
# 功能分支
git checkout -b feature/your-feature-name

# Bug修复分支
git checkout -b fix/your-bug-fix

# 文档分支
git checkout -b docs/your-documentation-update
```

#### 4. 进行更改

- 编写代码
- 添加测试
- 更新文档

#### 5. 代码规范

**Python代码规范：**
- 遵循 [PEP 8](https://pep8.org/) 规范
- 使用 [Black](https://black.readthedocs.io/) 格式化代码
- 使用 [flake8](https://flake8.pycqa.org/) 检查代码质量
- 添加类型注解
- 编写文档字符串

**JavaScript/TypeScript代码规范：**
- 遵循 [ESLint](https://eslint.org/) 配置
- 使用 [Prettier](https://prettier.io/) 格式化代码
- 使用 [TypeScript](https://www.typescriptlang.org/)（推荐）

#### 6. 测试

```bash
# 后端测试
cd backend
pytest tests/ -v --cov=core

# 前端测试
cd frontend
npm test

# 集成测试
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

#### 7. 提交更改

```bash
# 添加更改
git add .

# 提交更改（遵循Conventional Commits规范）
git commit -m "feat: add some feature"
```

**提交信息规范：**

- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具链相关

#### 8. 推送到Fork

```bash
git push origin your-branch-name
```

#### 9. 创建Pull Request

1. 访问你的Fork页面
2. 点击 "New Pull Request" 按钮
3. 填写PR描述模板
4. 等待代码审核

---

## 📝 代码审查标准

### 代码质量

- ✅ 代码清晰易懂
- ✅ 遵循项目代码规范
- ✅ 无明显性能问题
- ✅ 通过了所有测试

### 文档

- ✅ 添加了必要的注释
- ✅ 更新了相关文档
- ✅ API变更更新了API文档

### 测试

- ✅ 添加了测试用例
- ✅ 所有测试通过
- ✅ 测试覆盖率没有下降

---

## 🏗️ 开发环境搭建

### 后端开发环境

```bash
# 1. 进入后端目录
cd backend

# 2. 创建虚拟环境
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. 安装依赖
pip install -r requirements-dev.txt

# 4. 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 5. 启动数据库
docker-compose -f docker-compose.dev.yml up -d

# 6. 运行开发服务器
uvicorn api.main:app --reload

# 7. 运行测试
pytest tests/ -v --watch
```

### 前端开发环境

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

# 5. 运行测试
npm test -- --watch
```

---

## 📦 项目结构

```
multimodal-knowledge-system/
├── backend/                 # 后端服务
│   ├── api/                # API接口
│   ├── core/               # 核心处理逻辑
│   │   ├── parser/         # 文档解析器
│   │   ├── extractor/      # 知识提取器
│   │   ├── inference/      # 关系推理
│   │   ├── fusion/         # 知识融合
│   │   └── retriever/      # 知识检索
│   ├── models/             # 数据模型
│   ├── storage/            # 数据存储
│   ├── tests/              # 测试代码
│   └── requirements.txt    # Python依赖
├── frontend/               # 前端界面
│   ├── src/
│   │   ├── components/     # React组件
│   │   ├── pages/          # 页面
│   │   ├── services/       # API服务
│   │   └── utils/          # 工具函数
│   └── package.json        # Node依赖
├── docs/                   # 文档
├── deploy/                 # 部署配置
├── tests/                  # 集成测试
└── README.md              # 项目说明
```

---

## 🧪 测试指南

### 单元测试

```bash
# 运行所有单元测试
pytest tests/unit/ -v

# 运行特定模块的测试
pytest tests/unit/test_parser.py -v

# 生成覆盖率报告
pytest tests/ --cov=core --cov-report=html
```

### 集成测试

```bash
# 启动测试环境
docker-compose -f docker-compose.test.yml up -d

# 运行集成测试
pytest tests/integration/ -v

# 停止测试环境
docker-compose -f docker-compose.test.yml down
```

### 端到端测试

```bash
# 安装Cypress
npm install -g cypress

# 运行端到端测试
cypress run

# 打开Cypress测试界面
cypress open
```

---

## 📖 文档编写

### API文档

API文档使用 [OpenAPI (Swagger)](https://swagger.io/) 规范，由FastAPI自动生成。

访问 `http://localhost:8000/docs` 查看和测试API。

### 代码文档

- 使用 [Google风格](https://google.github.io/styleguide/pyguide.html#38-comments-and-docstrings) 的文档字符串
- 为所有公共函数、类和模块编写文档字符串
- 使用 [MkDocs](https://www.mkdocs.org/) 生成文档网站

### 用户文档

用户文档位于 `docs/` 目录，使用 [Markdown](https://www.markdownguide.org/) 格式。

---

## 🚀 发布流程

### 版本号规范

项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **主版本号**：不兼容的API修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

### 发布步骤

1. 更新版本号
   ```bash
   # backend/version.py
   __version__ = "1.0.0"
   
   # frontend/package.json
   "version": "1.0.0"
   ```

2. 更新CHANGELOG.md

3. 创建发布分支
   ```bash
   git checkout -b release/v1.0.0
   ```

4. 提交更改
   ```bash
   git commit -m "chore: release v1.0.0"
   ```

5. 创建标签
   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0"
   ```

6. 推送到远程
   ```bash
   git push origin release/v1.0.0 --tags
   ```

7. 创建GitHub Release
   - 访问 [Releases](https://github.com/yourusername/multimodal-knowledge-system/releases)
   - 点击 "Create new release"
   - 选择标签 `v1.0.0`
   - 填写发布说明
   - 点击 "Publish release"

---

## 💬 社区

### 讨论区

- [GitHub Discussions](https://github.com/yourusername/multimodal-knowledge-system/discussions)
- [Discord服务器](https://discord.gg/yourdiscord) (如有)

### 行为准则

请阅读并遵守我们的 [行为准则](CODE_OF_CONDUCT.md)。

---

## ❓ 问题？

如果你有任何问题，请：

- 查看 [文档](docs/)
- 搜索 [Issues](https://github.com/yourusername/multimodal-knowledge-system/issues)
- 在 [Discussions](https://github.com/yourusername/multimodal-knowledge-system/discussions) 提问
- 联系维护者：maintainer@example.com

---

## 🙏 致谢

感谢所有贡献者！

<a href="https://github.com/yourusername/multimodal-knowledge-system/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yourusername/multimodal-knowledge-system" />
</a>

---

再次感谢你的贡献！🎉