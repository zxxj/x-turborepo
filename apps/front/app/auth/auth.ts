'use server';

import { cookies } from 'next/headers';
import { UserInfoType } from './type';

export async function setLoginCookie(user: UserInfoType) {
  const cookieStore = await cookies();

  cookieStore.set('access_token', user.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function getToken() {
  const cookieStore = await cookies();

  return cookieStore.get('access_token');
}

export async function signOutAction() {
  const cookieStore = await cookies();

  cookieStore.delete('access_token');
  // cookieStore.delete('refresh_token'); // 如果有

  return { success: true };
}
