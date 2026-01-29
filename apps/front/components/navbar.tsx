export const dynamic = 'force-dynamic'; // 拒绝静态化(创建文章按钮必须根据登录状态处理)

import NavLinks from './nav-links-client';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { cookies } from 'next/headers';
import PublishAndUpdate from '@/app/article/publishAndUpdate';
import SignInButton from '@/app/auth/signIn-button';
import SignOutButton from '@/app/auth/signOut-button';

export default async function Navbar() {
  const cookieStore = await cookies();
  // console.log(cookieStore);
  const isLogin = cookieStore.has('access_token');

  return (
    <div className="w-full h-full border-b flex items-center justify-center lg:justify-between px-5">
      <div></div>

      <div className="flex items-center lg:gap-2">
        <NavLinks />
        <PublishAndUpdate isLogin={isLogin} btnText="publish" />
        {isLogin ? <SignOutButton /> : <SignInButton />}
        <AnimatedThemeToggler className="cursor-pointer" />
      </div>
    </div>
  );
}
