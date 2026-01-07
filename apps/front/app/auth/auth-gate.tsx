import { cookies } from 'next/headers';
import SignInButton from './signIn-button';
import SignOutButton from './signOut-button';

export default async function AuthGate() {
  const cookieStore = await cookies();
  const isLogin = cookieStore.has('access_token');

  return isLogin ? <SignOutButton /> : <SignInButton />;
}
