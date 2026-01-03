'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { getArticles } from './getQueries';

export const fetchArticles = async () => {
  const data = await fetchGraphQL(print(getArticles));
  console.log(data);

  return data.articles;
};
