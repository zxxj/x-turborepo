import NavLinks from './nav-links-client';
import AuthGate from '@/app/auth/auth-gate';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

export default async function Navbar() {
  return (
    <div className="w-full h-full border-b flex items-center justify-between px-5">
      <div>logo</div>

      <div className="flex items-center gap-2">
        <NavLinks />
        <AuthGate />
        <AnimatedThemeToggler />
      </div>
    </div>
  );
}
