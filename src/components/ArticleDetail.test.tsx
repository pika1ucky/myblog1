import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleDetail from './ArticleDetail';

const ArticleDetailWithRouter = () => (
  <BrowserRouter>
    <ArticleDetail />
  </BrowserRouter>
);

describe('ArticleDetail Component', () => {
  beforeEach(() => {
    render(<ArticleDetailWithRouter />);
  });

  test('renders article title', () => {
    const titleElement = screen.getByText(/React 18 新特性解析/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders article category', () => {
    const categoryElement = screen.getByText('React');
    expect(categoryElement).toBeInTheDocument();
  });

  test('renders article content', () => {
    const contentElement = screen.getByText(/React 18 带来了许多激动人心的新特性/i);
    expect(contentElement).toBeInTheDocument();
  });

  test('renders code blocks', () => {
    const codeBlocks = screen.getAllByRole('code');
    expect(codeBlocks.length).toBeGreaterThan(0);
  });

  test('renders back to home button', () => {
    const backButton = screen.getByText(/返回首页/i);
    expect(backButton).toBeInTheDocument();
  });

  test('renders publish date', () => {
    const dateElement = screen.getByText(/发布于/i);
    expect(dateElement).toBeInTheDocument();
  });
}); 