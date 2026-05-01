import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.client.interceptors.request.use(
      (config) => {
        // 可以在这里添加认证token
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // 处理未授权
          localStorage.removeItem('access_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // ==================== 系统接口 ====================
  async getSystemStats(): Promise<SystemStats> {
    const response = await this.client.get('/system/stats');
    return response.data;
  }

  async getSystemStatus(): Promise<SystemStatus> {
    const response = await this.client.get('/system/status');
    return response.data;
  }

  // ==================== 文档接口 ====================
  async uploadDocument(file: File, metadata?: DocumentMetadata): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const response = await this.client.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        console.log(`上传进度: ${percent}%`);
      },
    });
    return response.data;
  }

  async getDocumentList(params?: DocumentListParams): Promise<DocumentListResult> {
    const response = await this.client.get('/documents', { params });
    return response.data;
  }

  async getDocument(docId: string): Promise<Document> {
    const response = await this.client.get(`/documents/${docId}`);
    return response.data;
  }

  async deleteDocument(docId: string): Promise<void> {
    await this.client.delete(`/documents/${docId}`);
  }

  // ==================== 知识检索接口 ====================
  async searchKnowledge(params: SearchParams): Promise<SearchResult> {
    const response = await this.client.post('/knowledge/retrieve', params);
    return response.data;
  }

  async getKnowledgeNode(nodeId: string): Promise<KnowledgeNode> {
    const response = await this.client.get(`/knowledge/nodes/${nodeId}`);
    return response.data;
  }

  async getKnowledgeGraph(params: GraphParams): Promise<GraphData> {
    const response = await this.client.get('/knowledge/visualize', { params });
    return response.data;
  }

  // ==================== 关系推理接口 ====================
  async inferRelations(nodeIds: string[]): Promise<Relation[]> {
    const response = await this.client.post('/knowledge/infer', { node_ids: nodeIds });
    return response.data;
  }

  async getReasoningPath(params: ReasoningParams): Promise<ReasoningPath> {
    const response = await this.client.post('/knowledge/reason', params);
    return response.data;
  }
}

export const api = new ApiService();

// 类型定义
export interface SystemStats {
  node_count: number;
  edge_count: number;
  document_count: number;
  processing_count: number;
}

export interface SystemStatus {
  status: 'healthy' | 'degraded' | 'down';
  databases: Record<string, boolean>;
  uptime: number;
}

export interface DocumentMetadata {
  title?: string;
  author?: string;
  tags?: string[];
}

export interface UploadResult {
  document_id: string;
  status: 'processing' | 'completed' | 'failed';
  task_id: string;
}

export interface DocumentListParams {
  page?: number;
  page_size?: number;
  status?: string;
  search?: string;
}

export interface DocumentListResult {
  documents: Document[];
  total: number;
  page: number;
  page_size: number;
}

export interface Document {
  id: string;
  filename: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  node_count: number;
  size: number;
}

export interface SearchParams {
  query: string;
  mode: 'vector' | 'graph' | 'hybrid';
  top_k?: number;
  depth?: number;
  include_relations?: boolean;
}

export interface SearchResult {
  nodes: KnowledgeNode[];
  total: number;
  query_time: number;
}

export interface KnowledgeNode {
  node_id: string;
  content: string;
  node_type: string;
  confidence: number;
  source_document: string;
  relations?: Relation[];
}

export interface Relation {
  source_id: string;
  target_id: string;
  relation_type: string;
  confidence: number;
  evidence: string;
}

export interface GraphParams {
  node_id?: string;
  depth?: number;
  node_types?: string[];
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  label: string;
}

export interface ReasoningParams {
  start_node_id: string;
  end_node_id?: string;
  reasoning_type: 'shortest_path' | 'all_paths' | 'common_neighbors';
}

export interface ReasoningPath {
  paths: Path[];
  nodes: KnowledgeNode[];
}