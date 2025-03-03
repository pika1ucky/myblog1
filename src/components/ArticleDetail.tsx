import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, useNavigate } from 'react-router-dom';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/cjs/styles/prism';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import { Article } from '../types/article';
import { Components } from 'react-markdown';

// 注册需要的语言
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);

const ArticleDetail: React.FC = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  // 模拟文章数据
  const article: Article = {
    id: 1,
    title: "React 18 新特性解析",
    summary: "React 18 带来了许多激动人心的新特性...",
    publishDate: "2024-03-01",
    category: "React",
    slug: "react-18-features",
    content: `
# React 18 新特性解析

React 18 带来了许多激动人心的新特性，让我们一起来探索吧！

## 1. 自动批处理

在 React 18 中，所有的状态更新都将自动批处理，这意味着多个状态更新将被合并为一次重渲染。

\`\`\`javascript
function handleClick() {
  setCount(c => c + 1); // 不会触发重渲染
  setFlag(f => !f);     // 不会触发重渲染
  // React 只会在这里进行一次重渲染
}
\`\`\`

## 2. Suspense 服务端渲染

React 18 改进了 Suspense 的实现，现在可以在服务端使用 Suspense 进行增量渲染。

\`\`\`jsx
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
\`\`\`

## 3. 并发特性

新的 \`useTransition\` 钩子允许我们将状态更新标记为非紧急：

\`\`\`jsx
function App() {
  const [isPending, startTransition] = useTransition();
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }
  
  return (
    <button onClick={handleClick}>
      {isPending ? "加载中..." : "点击更新"}
    </button>
  );
}
\`\`\`
    `
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">文章不存在</div>
      </div>
    );
  }

  const components: Components = {
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <div className="rounded-md overflow-hidden my-4">
          <SyntaxHighlighter
            style={prismStyles.tomorrow as any}
            language={match[1]}
            customStyle={{ margin: 0, borderRadius: '0.375rem' }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className}>{children}</code>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-blue-500 hover:text-blue-600"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
            <p className="text-gray-600 mb-8">
              发布于 {new Date(article.publishDate).toLocaleDateString('zh-CN')}
            </p>
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown components={components}>
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail; 