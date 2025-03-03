import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// 创建一个包装器组件来提供路由上下文
const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

describe('App Component', () => {
  beforeEach(() => {
    render(<AppWithRouter />);
  });

  test('renders blog title', () => {
    const titleElement = screen.getByText(/我的技术博客/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders blog description', () => {
    const descriptionElement = screen.getByText(/分享 Web 开发的最新技术和最佳实践/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders search bar', () => {
    const searchInput = screen.getByPlaceholderText(/搜索文章标题或内容/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders category filter', () => {
    const allCategoryButton = screen.getByText('全部');
    expect(allCategoryButton).toBeInTheDocument();
  });

  test('renders article cards', () => {
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  test('search functionality works', () => {
    const searchInput = screen.getByPlaceholderText(/搜索文章标题或内容/i);
    fireEvent.change(searchInput, { target: { value: 'React' } });
    
    // 等待搜索结果
    const reactArticle = screen.getByText(/React 18 新特性解析/i);
    expect(reactArticle).toBeInTheDocument();
  });

  test('category filter works', () => {
    const reactCategory = screen.getByText('React');
    fireEvent.click(reactCategory);
    
    // 检查是否只显示React类别的文章
    const reactArticle = screen.getByText(/React 18 新特性解析/i);
    expect(reactArticle).toBeInTheDocument();
    
    // 其他类别的文章应该不可见
    const typescriptArticle = screen.queryByText(/TypeScript 最佳实践指南/i);
    expect(typescriptArticle).not.toBeInTheDocument();
  });
});
