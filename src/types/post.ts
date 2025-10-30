export interface Post {
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  publishedAt: string;
  views: number;
  content?: string;  
  author?: string;   
}
