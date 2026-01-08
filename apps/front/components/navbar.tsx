import NavLinks from './nav-links-client';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { cookies } from 'next/headers';
import PublishArticlePage from '@/app/article/publish';
import SignInButton from '@/app/auth/signIn-button';
import SignOutButton from '@/app/auth/signOut-button';

export default async function Navbar() {
  const cookieStore = await cookies();
  console.log(cookieStore);
  const isLogin = cookieStore.has('access_token');

  return (
    <div className="w-full h-full border-b flex items-center justify-center lg:justify-between px-5">
      <div></div>

      <div className="flex items-center lg:gap-2">
        <NavLinks />
        {isLogin ? <PublishArticlePage /> : ''}
        {isLogin ? <SignOutButton /> : <SignInButton />}
        <AnimatedThemeToggler className="cursor-pointer" />
      </div>
    </div>
  );
}
