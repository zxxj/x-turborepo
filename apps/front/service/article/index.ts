'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { GET_ARTICLE_BY_ID, GET_ARTICLE_LIST } from './getQueries';
import { ArticleType } from '@/app/article';

export const fetchArticles = async ({
  pageNumber = 1,
  pageSize = 10,
}: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  const data = await fetchGraphQL(print(GET_ARTICLE_LIST), {
    pageNumber,
    pageSize,
  });

  return { articles: data.articles, totalCount: data.totalCount };
};

export const fetchArticleById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_ARTICLE_BY_ID), { id });

  return data.getArticleById as ArticleType;
};
