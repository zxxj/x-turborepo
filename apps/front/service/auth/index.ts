'use server';

import { print } from 'graphql';
import { fetchGraphQL } from '../fetchGraphQL';
import { SIGN_IN } from './getQueries';

export const SignIn = async (input: { email: string; password: string }) => {
  const data = await fetchGraphQL(print(SIGN_IN), {
    signInInput: input,
  });

  return data.signIn;
};
