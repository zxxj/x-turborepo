import gql from 'graphql-tag';

export const GET_ARTICLE_LIST = gql`
  query ($pageNumber: Float, $pageSize: Float) {
    articles(pageNumber: $pageNumber, pageSize: $pageSize) {
      id
      slug
      title
      content
      thumbnail
      published
      createTime
      updateTime
    }

    totalCount
  }
`;

export const GET_ARTICLE_BY_ID = gql`
  query ($id: Int!) {
    getArticleById(id: $id) {
      id
      title
      slug
      content
      thumbnail
      published
      createTime
      updateTime
      author {
        id
        username
      }
      tags {
        id
        name
      }
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($createArticleInput: CreateArticleInput!) {
    createArticle(createArticleInput: $createArticleInput) {
      title
      slug
      content
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle(
    $articleId: Int!
    $updateArticleInput: UpdateArticleInput!
  ) {
    updateArticle(
      articleId: $articleId
      updateArticleInput: $updateArticleInput
    ) {
      id
      title
      slug
      content
    }
  }
`;
