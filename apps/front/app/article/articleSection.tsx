'use client';

import { useState } from 'react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { ArticleSectionProps } from './index';
import { fetchArticles } from '@/service/article';
import { ShinyButton } from '@/components/ui/shiny-button';
import { toast } from 'sonner';

const ArticleSection = ({
  initialArticles,
  totalCount,
}: ArticleSectionProps) => {
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

    console.log(articleList);
  };

  const handleClick = (id: number): void => {
    console.log(id);
  };
  return (
    <>
      <h1 className="font-bold text-[#f3bf74] mb-9">ARTICLES AND DIARY</h1>
      {articleList.map((item) => (
        <div className="group w-full mb-14" key={item.id}>
          <h2
            className="text-2xl font-bold border-b-2 hover:border-white inline-block border-transparent cursor-pointer"
            onClick={() => handleClick(item.id)}
          >
            {item.title}
          </h2>

          <p className="mr-0 lg:mr-40 my-4">{item.slug}</p>
          <InteractiveHoverButton onClick={() => handleClick(item.id)}>
            read more
          </InteractiveHoverButton>
        </div>
      ))}

      <div className="w-full flex justify-center">
        <ShinyButton onClick={loadMore}>load more.</ShinyButton>
      </div>
    </>
  );
};

export default ArticleSection;
