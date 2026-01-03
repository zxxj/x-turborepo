import { fetchArticles } from '@/service/article';

const Article: React.FC = async () => {
  const articles = await fetchArticles();
  console.log(articles);

  return (
    <main className="w-full h-[calc(100%-57px)] mt-16">
      <div className="relative max-w-350 mx-10">
        {/* 占位（参与布局） */}
        <div className="w-56 shrink-0" />

        {/* 真正 fixed 的侧栏 */}
        <div className="fixed top-1/2 -translate-y-1/2 w-56 h-3/4 border border-white rounded-sm">
          1
        </div>
        {/* 右侧内容 */}
        <div className="ml-70 border border-white rounded-sm">2</div>
      </div>
    </main>
  );
};

export default Article;
