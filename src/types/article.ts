export type Category = '前端开发' | '后端开发' | 'React' | 'TypeScript' | '工程化' | '最佳实践';

export interface Article {
  id: number;
  title: string;
  summary: string;
  publishDate: string;
  slug: string;
  content: string;
  category: Category;
} 