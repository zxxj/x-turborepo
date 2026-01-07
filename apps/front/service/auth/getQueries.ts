import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      id
      username
      accessToken
      avatar
    }
  }
`;
