import { fetchArticles } from '@/service/article';
import ArticleSection from './articleSection';
import CategorySection from './categorySection';
export const dynamic = 'force-dynamic';

const Article = async () => {
  const { articles, totalCount } = await fetchArticles({});

  return (
    <main className="w-full flex justify-center ">
      <div className="flex w-full max-w-full lg:max-w-2/3 mt-10 mb-24">
        <div className="flex-1 mx-10">
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
