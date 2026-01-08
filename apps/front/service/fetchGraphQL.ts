import { getToken } from '@/app/auth/auth';
import { BACKEND_URL } from '@/lib/constants';

export const fetchGraphQL = async (query: string, variables?: {}) => {
  const tokenCookie = await getToken();
  const token = tokenCookie?.value;

  const response = await fetch(`${BACKEND_URL}/graphql`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    console.log('GraphQL errors:', result.errors);
    throw new Error('从GrapQL获取数据失败!');
  } else {
    return result.data;
  }
};
