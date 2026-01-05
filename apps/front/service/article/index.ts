'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { getArticles } from './getQueries';

export const fetchArticles = async ({
  pageNumber = 1,
  pageSize = 10,
}: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  const data = await fetchGraphQL(print(getArticles), { pageNumber, pageSize });

  return { articles: data.articles, totalCount: data.totalCount };
};
