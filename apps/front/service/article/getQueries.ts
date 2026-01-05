import gql from 'graphql-tag';

export const getArticles = gql`
  query ($pageNumber: Float, $pageSize: Float) {
    articles(pageNumber: $pageNumber, pageSize: $pageSize) {
      id
      title
      slug
      content
      createTime
      updateTime
    }

    totalCount
  }
`;
