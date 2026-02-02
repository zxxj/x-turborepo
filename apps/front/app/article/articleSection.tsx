'use client';

import { useState } from 'react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { ArticleSectionProps } from './type';
import { fetchArticles } from '@/service/article';
import { ShinyButton } from '@/components/ui/shiny-button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ArticleSection = ({
  initialArticles,
  totalCount,
}: ArticleSectionProps) => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(2);
  const [articleList, setArticleList] = useState(initialArticles);

  const loadMore = async () => {
    if (articleList.length >= totalCount) {
      toast.warning('没有更多了.', { position: 'top-center' });
      return;
    } else {
      setPageNumber(() => pageNumber + 1);

      const { articles } = await fetchArticles({
        pageNumber,
        pageSize: 10,
      });

      setArticleList((prev) => [...prev, ...articles]);
    }
  };

  const handleClick = (id: number): void => {
    router.push(`/article/${id}`);
  };
  return (
    <>
      <h1 className="font-bold text-[#f3bf74] mb-9">ARTICLES AND DIARY</h1>
      {articleList.map((item) => (
        <div className="group w-full mb-14" key={item.id}>
          <h2
            className="text-xl font-bold border-b-2 dark:hover:border-white hover:border-black inline-block border-transparent cursor-pointer"
            onClick={() => handleClick(item.id)}
          >
            {item.title}
          </h2>

          <p className="mr-0 lg:mr-40 my-4 text-[#8b919e] text-sm line-clamp-2 md:line-clamp-3">
            {item.description}
          </p>
          <InteractiveHoverButton onClick={() => handleClick(item.id)}>
            read more
          </InteractiveHoverButton>
        </div>
      ))}

      <div className="lg:w-full flex justify-center">
        <ShinyButton onClick={loadMore}>load more.</ShinyButton>
      </div>
    </>
  );
};

export default ArticleSection;
