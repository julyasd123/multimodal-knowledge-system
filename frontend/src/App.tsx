import React, { useState, useEffect } from 'react';
import { Layout, Menu, Upload, Button, Table, Tag, Space, message, Progress, Card, Row, Col, Typography } from 'antd';
import { UploadOutlined, DatabaseOutlined, SearchOutlined, FileTextOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { DocumentUpload } from './components/DocumentUpload';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { KnowledgeSearch } from './components/KnowledgeSearch';
import { DocumentList } from './components/DocumentList';
import { SystemStats } from './components/SystemStats';
import { api } from './services/api';
import './App.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // 加载初始数据
    loadSystemStats();
  }, []);

  const loadSystemStats = async () => {
    try {
      const stats = await api.getSystemStats();
      // 更新全局状态
    } catch (error) {
      console.error('加载系统状态失败:', error);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'upload':
        return <DocumentUpload />;
      case 'graph':
        return <KnowledgeGraph />;
      case 'search':
        return <KnowledgeSearch />;
      case 'docs':
        return <DocumentList />;
      default:
        return (
          <div>
            <Title level={2}>欢迎使用多模态知识神经网络知识库系统</Title>
            <SystemStats />
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              <Col span={12}>
                <Card title="快速开始" bordered={false}>
                  <Space direction="vertical">
                    <Button type="primary" icon={<UploadOutlined />} onClick={() => setCurrentView('upload')}>
                      上传文档
                    </Button>
                    <Button icon={<SearchOutlined />} onClick={() => setCurrentView('search')}>
                      搜索知识
                    </Button>
                    <Button icon={<DatabaseOutlined />} onClick={() => setCurrentView('graph')}>
                      查看知识网络
                    </Button>
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="最近活动" bordered={false}>
                  <p>暂无最近活动</p>
                </Card>
              </Col>
            </Row>
          </div>
        );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        theme="dark"
      >
        <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)', borderRadius: 6 }} />
        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={['dashboard']}
          onClick={({ key }) => setCurrentView(key)}
          items={[
            { key: 'dashboard', icon: <UserOutlined />, label: '仪表盘' },
            { key: 'upload', icon: <UploadOutlined />, label: '文档上传' },
            { key: 'graph', icon: <DatabaseOutlined />, label: '知识网络' },
            { key: 'search', icon: <SearchOutlined />, label: '知识检索' },
            { key: 'docs', icon: <FileTextOutlined />, label: '文档管理' },
            { key: 'settings', icon: <SettingOutlined />, label: '系统设置' },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>多模态知识神经网络知识库系统</Title>
        </Header>
        <Content style={{ margin: '16px 16px', padding: 24, background: '#fff', minHeight: 360 }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;