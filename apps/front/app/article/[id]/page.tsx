import { fetchArticleById } from '@/service/article';
import { formatDateTime } from '@/lib/formatDate';
import { Clock } from 'lucide-react';
import MyEditor from '@/components/editor';
import PublishAndUpdate from '../publishAndUpdate';
import { getToken } from '@/app/auth/auth';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const ArticlePage = async ({ params }: Props) => {
  const tokenCookie = await getToken();
  const isLogin = tokenCookie?.value ? true : false; // 未登录则不显示更新文章按钮.

  const articleId = (await params).id;
  const article = await fetchArticleById(Number(articleId));

  return (
    <>
      <div className="w-full h-full">
        <h1 className="text-center font-bold text-3xl">{article.title}</h1>
        <div className="flex justify-center items-center text-sm mt-4">
          <Clock className="w-4 h-4 mr-2" />
          {formatDateTime(article.createTime)}

          <PublishAndUpdate
            value={JSON.parse(article.content)}
            title={article.title}
            slug={article.slug}
            articleId={article.id}
            isLogin={isLogin}
          />
        </div>

        <MyEditor value={JSON.parse(article.content)} />
      </div>
    </>
  );
};

export default ArticlePage;
