export interface ArticleType {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  author: string;
  comments: [];
  tags: [];
  likes: [];
  createTime: string;
  updateTime: string;
}

export interface ArticleSectionProps {
  initialArticles: ArticleType[];
  totalCount: number;
}
