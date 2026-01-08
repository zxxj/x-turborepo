import { fetchArticleById } from '@/service/article';
import { formatDateTime } from '@/lib/formatDate';
import { Clock } from 'lucide-react';
import MyEditor from '@/components/editor';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const ArticlePage = async ({ params }: Props) => {
  const articleId = (await params).id;
  const article = await fetchArticleById(Number(articleId));

  return (
    <>
      <div className="w-full h-full">
        <h1 className="text-center font-bold text-3xl">{article.title}</h1>
        <div className="flex justify-center items-center text-sm mt-4">
          <Clock className="w-4 h-4 mr-2" />
          {formatDateTime(article.createTime)}
        </div>

        <MyEditor value={JSON.parse(article.content)} />
      </div>
    </>
  );
};

export default ArticlePage;
