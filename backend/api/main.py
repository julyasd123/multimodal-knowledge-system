"""
多模态知识神经网络知识库系统
后端API主入口
"""

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
from datetime import datetime

from api import routes
from core.config import settings
from core.database import init_databases
from core.logging import setup_logging

# 配置日志
setup_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    # 启动时
    logger.info("🚀 启动多模态知识神经网络知识库系统...")
    
    # 初始化数据库
    await init_databases()
    
    logger.info("✅ 系统启动完成！")
    
    yield
    
    # 关闭时
    logger.info("👋 关闭系统...")


# 创建FastAPI应用
app = FastAPI(
    title="多模态知识神经网络知识库系统",
    description="""
    一个基于大模型的智能知识管理与推理平台。
    
    ## 功能特性
    
    - **多模态输入处理**：支持图片、PDF、Word、TXT等多种格式
    - **智能知识提取**：基于小米MIMO的语义精读
    - **知识网络构建**：自动识别7种关系类型
    - **增量学习与融合**：新增文档自动融合进已有知识网络
    - **混合检索**：向量检索、图谱检索、混合检索
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(routes.router, prefix="/api/v1")


@app.get("/", tags=["健康检查"])
async def root():
    """根路径 - 系统健康检查"""
    return JSONResponse({
        "status": "healthy",
        "message": "多模态知识神经网络知识库系统运行中",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    })


@app.get("/health", tags=["健康检查"])
async def health_check():
    """健康检查 - 获取系统状态"""
    from core.database import check_database_health
    
    db_health = await check_database_health()
    
    return JSONResponse({
        "status": "healthy" if db_health["status"] == "ok" else "degraded",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
        "databases": db_health
    })


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """HTTP异常处理"""
    logger.error(f"HTTP异常: {exc.status_code} - {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "code": exc.status_code,
            "message": exc.detail,
            "timestamp": datetime.now().isoformat()
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """通用异常处理"""
    logger.error(f"系统异常: {type(exc).__name__} - {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "code": 500,
            "message": "系统内部错误，请稍后重试",
            "timestamp": datetime.now().isoformat()
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.BACKEND_HOST,
        port=settings.BACKEND_PORT,
        reload=settings.APP_DEBUG
    )