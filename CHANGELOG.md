# Changelog

所有重要的项目变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。
本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2026-05-01

### Added
- 初始版本发布
- 多模态文档上传支持（PDF、Word、图片、TXT）
- 基于小米MIMO的知识提取引擎
- 知识网络拓扑构建
- 7种关系类型识别（包含、从属、因果、并列、关联、先后、依赖）
- 增量入库与知识融合
- 向量检索、图谱检索、混合检索
- 交互式知识网络可视化
- RESTful API接口
- Docker一键部署支持
- 完整的CI/CD流水线

### Features
- 文档上传与解析
- 知识点自动提取
- 关系智能推理
- 知识网络可视化
- 知识检索与问答
- 系统监控面板

### Technical
- 前端：React 18 + Ant Design
- 后端：Python FastAPI
- 数据库：Neo4j + Milvus + PostgreSQL + Redis
- 消息队列：RabbitMQ + Celery
- 部署：Docker Compose

---

## 待发布版本

### Planned
- [ ] 知识问答助手
- [ ] 多语言支持
- [ ] 知识图谱自动摘要
- [ ] 批量文档处理优化
- [ ] 知识版本管理
- [ ] 权限管理增强
- [ ] 移动端适配
- [ ] API开放平台