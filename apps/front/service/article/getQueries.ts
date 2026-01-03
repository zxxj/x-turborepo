import gql from 'graphql-tag';

export const getArticles = gql`
  query {
    articles {
      id
      title
      slug
      content
      createTime
      updateTime
    }
  }
`;
