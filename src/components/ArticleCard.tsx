import React from 'react';
import { Article } from '../types/article';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            {article.category}
          </span>
          <span className="text-gray-500 text-sm">
            {new Date(article.publishDate).toLocaleDateString('zh-CN')}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer"
            onClick={() => navigate(`/article/${article.slug}`)}>
          {article.title}
        </h2>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {article.summary}
        </p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          onClick={() => navigate(`/article/${article.slug}`)}
        >
          阅读更多
        </button>
      </div>
    </div>
  );
};

export default ArticleCard; 