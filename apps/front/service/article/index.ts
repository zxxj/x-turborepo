'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import {
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  GET_ARTICLE_BY_ID,
  GET_ARTICLE_LIST,
  UPDATE_ARTICLE,
} from './getQueries';
import { ArticleType } from '@/app/article/type';

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

interface CreateArticleType {
  title: string;
  description?: string;
  content: string;
}
export const createArticle = async (createArticleInput: CreateArticleType) => {
  const data = await fetchGraphQL(print(CREATE_ARTICLE), {
    createArticleInput,
  });

  return data;
};

interface UpdateArticleType {
  title: string;
  description?: string;
  content: string;
}
export const updateArticle = async (
  articleId: number,
  updateArticleInput: UpdateArticleType,
) => {
  const data = await fetchGraphQL(print(UPDATE_ARTICLE), {
    articleId,
    updateArticleInput,
  });

  return data;
};

export const deleteArticle = async (articleId: number) => {
  const res = await fetchGraphQL(print(DELETE_ARTICLE), {
    articleId,
  });

  return res;
};
