export type Category = '后端开发' | 'React' | 'TypeScript' | '工程化' | 'CSS';

export interface Article {
  id: string | number;
  title: string;
  summary: string;
  publishDate: string;
  category: Category;
  slug: string;
  content: string;
  tags?: string[];
} 