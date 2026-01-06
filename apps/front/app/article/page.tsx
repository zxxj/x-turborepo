import { fetchArticles } from '@/service/article';
import ArticleSection from './articleSection';
import CategorySection from './categorySection';
export const dynamic = 'force-dynamic';

const Article = async () => {
  const { articles, totalCount } = await fetchArticles({});

  return (
    <main className="w-full flex justify-center ">
      <div className="flex w-full ">
        <div className="flex-1 px-5">
          <ArticleSection initialArticles={articles} totalCount={totalCount} />
        </div>

        <div className="w-64 mt-20 hidden lg:block fixed right-40">
          <CategorySection />
        </div>
      </div>
    </main>
  );
};

export default Article;
