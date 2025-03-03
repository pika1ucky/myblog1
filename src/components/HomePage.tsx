import React, { useState, useMemo } from 'react';
import ArticleCard from './ArticleCard';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import { Article, Category } from '../types/article';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 模拟文章数据
  const articles = useMemo(() => [
    {
      id: '1',
      title: '使用 React 和 TypeScript 构建现代 Web 应用',
      summary: '探索如何使用 React 和 TypeScript 构建可扩展的 Web 应用程序，包括最佳实践和常见陷阱。',
      publishDate: '2024-02-15',
      category: 'React',
      slug: 'react-typescript-guide',
      content: '# 使用 React 和 TypeScript 构建现代 Web 应用\n\n这里是完整的文章内容...',
      tags: ['React', 'TypeScript', 'Web Development']
    },
    {
      id: '2',
      title: 'Tailwind CSS 实战指南',
      summary: '学习如何使用 Tailwind CSS 快速构建美观的用户界面，以及如何优化和自定义样式。',
      publishDate: '2024-02-14',
      category: 'CSS',
      slug: 'tailwind-css-guide',
      content: '# Tailwind CSS 实战指南\n\n这里是完整的文章内容...',
      tags: ['CSS', 'Tailwind', 'Design']
    },
    {
      id: '3',
      title: "TypeScript 最佳实践指南",
      summary: "TypeScript 作为 JavaScript 的超集，为开发者提供了强大的类型系统和开发工具支持。本文将分享在实际项目中的 TypeScript 最佳实践和常见陷阱。",
      publishDate: "2024-02-25",
      category: "TypeScript",
      slug: "typescript-best-practices",
      content: "# TypeScript 最佳实践指南\n\n这里是完整的文章内容...",
      tags: ['TypeScript', 'JavaScript', 'Best Practices']
    },
    {
      id: '4',
      title: "Node.js 性能优化实践",
      summary: "在构建大规模 Node.js 应用时，性能优化是一个重要话题。本文将介绍一些实用的性能优化技巧和最佳实践。",
      publishDate: "2024-02-20",
      category: "后端开发",
      slug: "nodejs-performance",
      content: "# Node.js 性能优化实践\n\n这里是完整的文章内容...",
      tags: ['Node.js', 'Performance', 'Backend']
    },
    {
      id: '5',
      title: "前端工程化实践",
      summary: "现代前端开发中，工程化已经成为不可或缺的一部分。本文将探讨如何搭建一个完善的前端工程化体系。",
      publishDate: "2024-02-15",
      category: "工程化",
      slug: "frontend-engineering",
      content: "# 前端工程化实践\n\n这里是完整的文章内容...",
      tags: ['Engineering', 'Frontend', 'Best Practices']
    }
  ], []); // 空依赖数组，因为这是静态数据

  // 获取所有唯一的分类
  const categories = useMemo(() => {
    const allCategories = articles.map(article => article.category);
    return Array.from(new Set(allCategories));
  }, [articles]);

  // 根据搜索关键词和分类筛选文章
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      const matchesSearch = !searchKeyword || (
        article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (article.content?.toLowerCase() || '').includes(searchKeyword.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchKeyword]);

  // 处理搜索结果统计
  const searchResultStats = useMemo(() => {
    if (!searchKeyword) return null;
    return {
      total: filteredArticles.length,
      category: selectedCategory || '全部分类'
    };
  }, [filteredArticles.length, searchKeyword, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">我的技术博客</h1>
          <p className="text-xl text-gray-600">分享 Web 开发的最新技术和最佳实践</p>
        </header>

        <SearchBar onSearch={setSearchKeyword} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {searchResultStats && (
          <div className="mb-6 text-gray-600">
            在{searchResultStats.category}中找到 {searchResultStats.total} 篇相关文章
          </div>
        )}
        
        {filteredArticles.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            {searchKeyword ? '没有找到相关文章' : '该分类下暂无文章'}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 