export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: 'Data Center' | 'AI' | 'Electrical Engineering' | 'Infrastructure' | 'Networking';
  author: string;
  readTime: number;
  views: number;
  publishDate: string;
  featured?: boolean;
  trending?: boolean;
}
